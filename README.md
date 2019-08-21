# Chrome CORS

## windows

chrome 桌面快捷键 右键属性 在快捷方式标签下的"目标"框中加入 `--disable-web-security --user-data-dir`，重启浏览器即可

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

如果是跟本地文件通信，AJAX 或者 JSON, 你可以使用`-–allow-file-access-from-files flag`
