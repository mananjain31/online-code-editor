const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class RunningProcesses {
    constructor() {
        this.processes = {};
    }
    getOutputErrorAndDestruct(codeId) {
        const { output, child, error, dir } = this.processes[codeId];
        fs.readdirSync(dir).forEach(fileName => fs.rmSync(path.join(dir, fileName)));
        fs.rmdirSync(dir);
        return { output: output.join(""), error: error.join(""), child };
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


exports.run = (req, res) => {

    req.body.codeId = uuidv4();

    let {
        codeId = null,
        code = '',
        input = '',
        output = '',
        selectedLanguage = 'node',
        fileName
    } = req.body;

    console.log(req.body);

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
        runningProcesses.appendError(codeId, data);
        const { output, error, child } = runningProcesses.getOutputErrorAndDestruct(codeId);
        res.json({ ...req.body, output: output, error });
    });

    child.on('exit', (code, signal) => {
        const { output, child, error } = runningProcesses.getOutputErrorAndDestruct(codeId);
        res.json({ ...req.body, output: output, error });
    });
}       