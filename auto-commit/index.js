const cmd = require('./cmd');
; (async () => {
    await cmd('git status');
    await cmd('git add .');
    await cmd('git commit --amend --no-edit --date="Sun, 25 Dec 2016 19:42:09 +0800"');
    await cmd('git push origin master --force');
})();
