const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class RunningProcesses {
    constructor() {
        this.processes = {};
        /*
        codeId :  {
            child,
            output: [],
            error: [],
            dir
        } */
    }
    isRunning(codeId) {
        return !!(this.processes[codeId])
    }
    getOutputErrorAndDestruct(codeId) {
        if (!codeId) throw new Error("codeId is required");
        const { output, child, error, dir } = this.processes[codeId];
        delete this.processes[codeId];
        try {
            fs.readdirSync(dir).forEach(fileName => fs.rmSync(path.join(dir, fileName)));
            fs.rmdirSync(dir);
        }
        catch (err) {
            // console.log(err);
        }
        return { output: output.join(""), error: error.join(""), child };
    }
    killAndGetResults(codeId) {
        if (!codeId) throw new Error("codeId is required");
        // console.log()
        console.log(codeId)
        // console.log()
        // // console.log(this.processes)
        // console.log()
        // console.log(this.processes[codeId])
        // console.log()
        const { child } = this.processes[codeId];
        child.kill();
        return this.getOutputErrorAndDestruct(codeId);
    }
    addProcess(codeId, child, dir) {
        this.processes[codeId] = {
            child,
            output: [],
            error: [],
            dir
        };
    }
    appendOutput(codeId, data) {
        this.processes[codeId]?.output?.push(data?.toString());
    }
    appendError(codeId, data) {
        this.processes[codeId]?.error?.push(data?.toString());
    }
}
const runningProcesses = new RunningProcesses();



const getSpawnArgs = (file, lang) => {
    const ret = [];
    switch (lang) {
        case "python3":
            ret.push("python3");
            break;
        case "node":
            ret.push("node");
            break;
        case "java":
            ret.push("java");
            break;
        default: throw Error('Language Unavailable for now : ' + lang);
    }
    ret.push([file]);

    return ret;
}


exports.generateCodeId = (req, res) => {
    console.log("gen");
    const codeId = uuidv4();
    console.log('codeId', codeId);
    res.status(200).send({ codeId });
}

exports.run = (req, res) => {

    let {
        codeId = null,
        code = '',
        input = '',
        output = '',
        selectedLanguage = 'node',
        fileName
    } = req.body;

    console.log("req.body", req.body);

    if (!fileName || !selectedLanguage) {
        return res.status(400).send({
            error: "Missing fileName or selectedLanguage"
        });
    }


    // check and create folders

    let dir = path.join(__dirname, "../codes");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    dir = path.join(__dirname, "../codes", codeId);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // create file
    const file = path.join(dir, fileName);
    fs.writeFileSync(file, code);

    // create process
    const spawnArgs = getSpawnArgs(file, selectedLanguage);
    const child = spawn(...spawnArgs);

    // piping input to this process
    if (input) {
        child.stdin.write(input);
        child.stdin.end();
    }

    // assign process to processes object
    runningProcesses.addProcess(codeId, child, dir);

    child.stdout.on('data', data => {
        runningProcesses.appendOutput(codeId, data);
    });

    child.stderr.on('data', data => {
        runningProcesses.appendError(codeId, data);
    });

    child.on('error', data => {
        try {
            runningProcesses.appendError(codeId, data);
            const { output, error, child } = runningProcesses.getOutputErrorAndDestruct(codeId);
            res.status(200).json({ ...req.body, output: output, error });
        } catch (err) {
            // console.log(err);
        }
    });

    child.on('exit', (code, signal) => {
        try {
            const { output, child, error } = runningProcesses.getOutputErrorAndDestruct(codeId);
            res.status(200).json({ ...req.body, output: output, error });
        } catch (err) {
            // console.log(err);
        }
    });

    const EXPIRATION_TIME = 20000; // in miliseconds
    // programs terminates after EXPIRATION_TIME miliseconds if the code takes up too much time to be executed
    setTimeout(function () {
        req.params.codeId = codeId;
        if (runningProcesses.isRunning(codeId))
            stop(req, res);
        else if (!res.headersSent)
            res.json({ stopped: true });
    }, EXPIRATION_TIME);

}

const stop = (req, res) => {
    try {
        const { codeId } = req.params;
        console.log();
        console.log("stop controller codeId", codeId);
        console.log();

        if (!codeId) return res.status(400).send({ message: "Invalid Request" });
        const { output, child, error } = runningProcesses.killAndGetResults(codeId);
        res.status(200).json({ error: "Program was stopped manually or it was taking too long to exit." });
    }
    catch (e) {
        // console.log(e);
    }
};
exports.stop = stop;