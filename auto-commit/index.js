const cmd = require('./cmd');
const file = require('./file');
const commit = async () => {
    let day = 1;
    const today = new Date();
    console.log(day);
    today.setTime(today.getTime() - day * 24 * 60 * 60 * 1000);
    let commitTime = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
    console.log(commitTime);
    await file();
    await cmd('git status');
    await cmd('git add .');
    // await cmd(`git commit --amend --no-edit --date="Sun, 25 Dec 2016 19:42:09 +0800"`);
    // await cmd(`git commit --amend --no-edit --date="${Date()}"`);
    await cmd(`git commit -m "${commitTime}" --no-edit --date="${commitTime}"`);
    if (day > 10) {
        await cmd('git push origin master');
    } else {
        day += 1;
        commit();
    }
}
commit();