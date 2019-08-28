const fs = require('fs');
module.exports = () => {
    return new Promise((resolve, reject) => {
        fs.appendFile('message.txt', '追加的数据\n', (err) => {
            console.log('数据已追加到文件');
            err ? reject() : resolve();
        });
    })
}
