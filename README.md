# Chrome CORS

## windows

Chrome 桌面快捷键 右键属性 在快捷方式标签下的"目标"框中加入 `--disable-web-security --user-data-dir`，重启浏览器即可

![捕获](https://user-images.githubusercontent.com/17243165/66918205-66400680-f051-11e9-91c9-b687b1c95e0a.PNG)

## mac

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir
```

如果上面一句的不行就用这句：

```bash
open -a "Google Chrome" --args --disable-web-security --user-data-dir
```
```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

## Linux

```bash
google-chrome --disable-web-security
```

如果是跟本地文件通信，AJAX 或者 JSON，你可以使用`-–allow-file-access-from-files flag`


# Github Commit

|命令|作用|
|-|-|
|git --amend|简单地来说，可以理解成对最后一次提交做修正。|
|git --no-edit||
|git --date||

有时需要修改上次`git commit`的时间，比如之前将代码提交到本地库中，现在想将这次提交推送到远程仓库，但是这次提交的时间显示还是昨天的时间，下面提供一个办法用于修改上次提交的时间：
使用：

```bash
git commit --amend --date="commit_time"
```
`commit_time`的格式比较难记，不过有个小技巧，我们可以先在命令行输入：

```bash
date -R
Sat, 24 Dec 2016 18:12:09 +0800
```

这个命令的输出格式与`git commit –amend –date`命令要填写的日期格式相同，自己再稍加修改一下即可。
如果我们只是想将上次`git commit`的时间 改为当前时间，可以使用以下两个命令：

```bash
git commit --amend --date="$(date -R)"
# 或
git commit --amend --date=`date -R`
```

对于如何修改任意`git commit`的时间，也简单，按照date -R命令的输出格式自己构造`commit_time`即可。

```bash
git commit --amend --date="Sun, 25 Dec 2016 19:42:09 +0800"
git commit --amend --no-edit --date="Sun, 25 Dec 2016 19:42:09 +0800"
git push origin master --force
```