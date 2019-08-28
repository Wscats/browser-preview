const exec = require('child_process').exec;
module.exports = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.log(error);
                reject(stderr);
            }
            else {
                resolve(stdout);
                console.log("成功");
            }
        });
    })
}