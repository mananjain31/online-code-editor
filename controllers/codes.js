const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const SavedCode = require("../models/SavedCode");
const { assert } = require("console");
const User = require("../models/User");
const runningProcesses = require("../utils/RunningProcesses");

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

// creates or updates
exports.save = async (req, res) => {
    try {
        let { user } = req;
        if (!user) return res.send(401).json({ success: false, message: "Unauthorized" })
        const { code, fileName, selectedLanguage } = req.body;
        const updatedAt = Date.now();
        const codeObj = { code, fileName, selectedLanguage, user };
        try {
            let error = await SavedCode.validate(codeObj)
            assert(!error, error)
            const result = await SavedCode.updateOne({ fileName, user, updatedAt }, codeObj, { runValidators: true, upsert: true })
            const savedCode = await SavedCode.findOne({ fileName, user });
            return res.status(201).json({
                success: true,
                message: "Code Saved",
                savedCode,
                result
            })
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message })
        }

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Intenal Server Error" });
    }
}

exports.getCodes = async (req, res) => {
    try {
        let { user } = req;
        if (!user) return res.send(401).json({ success: false, message: "Unauthorized" })
        // select with "-" deselects those entries ("-user" means user will not be fetched into this array)
        const savedCodes = await SavedCode.find({ user }).sort("-updatedAt").select("-code -user -__v");
        console.log(savedCodes)
        return res.status(200).json({ success: true, savedCodes })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Intenal Server Error" });
    }
}

exports.getCodeById = async (req, res) => {
    try {
        let { user } = req;
        if (!user) return res.send(401).json({ success: false, message: "Unauthorized" })
        const savedCode = await SavedCode.findById(req.params.id).select("-__v");
        if (!savedCode) throw Error("No Code of id " + req.params.id + " found");
        return res.status(200).json({
            success: true,
            savedCode
        })
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

exports.deleteCode = async (req, res) => {
    try {
        let { user } = req;
        if (!user) return res.send(401).json({ success: false, message: "Unauthorized" })
        const deletedCode = await SavedCode.findByIdAndDelete(req.params.id)
        if (!deletedCode) throw Error("No Code of id " + req.params.id + " found");
        return res.status(200).json({
            success: true,
            message: "Code Deleted Succesfully"
        })
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}