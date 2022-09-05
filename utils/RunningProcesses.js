const fs = require("fs");
const path = require("path");
class RunningProcesses {
    static instance;
    static getInstance() {
        if (!RunningProcesses.instance)
            RunningProcesses.instance = new RunningProcesses();
        return RunningProcesses.instance;
    }

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
    static getInstance() {
        return new RunningProcesses();
    }
    isRunning(codeId) {
        return !!this.processes[codeId];
    }
    getOutputErrorAndDestruct(codeId) {
        if (!codeId) throw new Error("codeId is required");
        const { output, child, error, dir } = this.processes[codeId];
        delete this.processes[codeId];
        try {
            fs.readdirSync(dir).forEach(fileName =>
                fs.rmSync(path.join(dir, fileName))
            );
            fs.rmdirSync(dir);
        } catch (err) {
            console.log(err);
        }
        return { output: output.join(""), error: error.join(""), child };
    }
    killAndGetResults(codeId) {
        if (!codeId) throw new Error("codeId is required");
        // console.log()
        console.log(codeId);
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
            dir,
        };
    }
    appendOutput(codeId, data) {
        this.processes[codeId]?.output?.push(data?.toString());
    }
    appendError(codeId, data) {
        this.processes[codeId]?.error?.push(data?.toString());
    }
}

module.exports = RunningProcesses.getInstance();
