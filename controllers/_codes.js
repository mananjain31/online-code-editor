const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const processes = {};

function IdsMiddleware(req, res, next) {

    // codeId and uid

    if (!req.body.codeId) {
        let codeId = Math.random().toString(16).substring(2);
        while (processes.codeId) {
            codeId = Math.random().toString(16).substring(2);
        }
        req.body.codeId = codeId;
    }

    if (!req.body.uid) {
        req.body.uid = Math.random().toString(16).substring(2);
    }

    next();
}

const getFileExtensionByLanguage = lang => {
    switch (lang) {
        case "python": return '.py';
        case "node": return '.js';
    }
    throw 'Language Unavailable for now : ' + lang;
}
const getExecCommand = (codeFilePath, lang) => {
    const ret = [];
    switch (lang) {
        case "python":
            ret.push('python');
            break;
        case "node":
            ret.push('node');
            break;
        default: throw 'Language Unavailable for now : ' + lang;
    }
    ret.push([codeFilePath]);

    return ret;
}

exports.abort(IdsMiddleware, (req, res) => {
    const { child, output } = processes[req.params.codeId];
    child.kill();
    res.json({ output });
});

exports.run('/run', IdsMiddleware, (req, res) => {
    try {

        // directory and file creation    

        const uid = req.body.uid;
        const codeId = req.body.codeId;
        const fileName = req.body.fileName;
        const language = req.body.language;
        const code = req.body.code;

        const codeDirPath = path.join(__dirname, 'codes', req.body.uid);
        const codeFilePath = path.join(__dirname, 'codes', req.body.uid, fileName + getFileExtensionByLanguage(language));
        console.log(codeDirPath);
        console.log(codeFilePath);
        const [spawnStr, spawnOptions] = getExecCommand(codeFilePath, language);

        if (!fs.existsSync(codeDirPath))
            fs.mkdirSync(codeDirPath);

        fs.writeFileSync(codeFilePath, code);

        const output = [];

        const child = spawn(spawnStr, spawnOptions);
        processes[codeId] = { child, output };

        child.stdout.on('data', data => {
            output.push(data.toString());
        });

        child.stderr.on('data', data => {
            output.push(data.toString());
        });

        child.on('error', data => {
            output.push(data.toString());

            res.json({ ...req.body, output: output.join('') });
            delete processes[codeId].code;
            delete processes[codeId].output;
            delete processes[codeId];
        });

        child.on('exit', (code, signal) => {
            console.log('------------------exited-------------');
            console.log(`${code}, ${signal}`);

            res.json({ ...req.body, output: output.join('') });
            delete processes[codeId].code;
            delete processes[codeId].output;
            delete processes[codeId];
        });
    }
    catch (err) {
        console.log(err);
    }
})
