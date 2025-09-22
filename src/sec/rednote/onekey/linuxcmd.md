# Linux  CMD


挑战最长度：

```Bash
coproc builtin command eval  exec setsid echo 123456 > /tmp/ls.txt
```

以下是 Bash 中用于执行命令或程序的相关方法列表，按类别和功能分类整理：

---

### **Bash 命令/程序执行方式列表**

|**类别**|**命令/语法**|**作用**|**示例**|
|-|-|-|-|
|**直接执行**|`command`  |直接运行命令（默认行为，受别名/函数影响）|`ls`|
|**绕过干扰**|`\command`|忽略别名（同`command command`）|`\ls`|
||`command command`|绕过别名和函数，直接调用原始命令或外部命令|`command ls`|
||`builtin command`|强制调用内置命令（忽略同名函数/外部命令）|`builtin echo "Hello"`|
|**进程控制**|`exec command`|用`command` 替换当前 Shell 进程（执行后退出 Shell）|`exec bash`|
|**动态执行**|`eval "string"`|将字符串作为命令执行（可解析变量/转义符）|`eval "echo \$USER"`|
|**子 Shell**|`(commands)`|在子 Shell 中执行命令组（不改变当前环境）|`(cd /tmp && ls)`|
||`$(commands)`|在子 Shell 执行命令并捕获输出|`files=$(ls)`|
|**协程/后台**|`coproc`|创建协程（异步后台进程，可双向通信）|`coproc myproc { sleep 10; }`|
|**脱离终端**|`setsid command`|在新会话中运行命令（脱离终端控制）|`setsid long_running_task`|
||`nohup command`|忽略挂断信号（SSH 断开后仍运行）|`nohup ./script.sh &`|
|**条件执行**|`cmd1 && cmd2`|`cmd1`成功时执行`cmd2`|`mkdir dir && cd dir`|
||`cmd1 | cmd2`|`cmd1`失败时执行`cmd2`|`rm file|
|**外部工具**|`xargs`|将输入转换为命令参数|`echo "1 2" | xargs rm`|
||`find -exec`|对查找结果执行命令|`find . -name "*.txt" -exec rm {} \;`|


---



以下是 Bash 历史扩展（`!`命令）的 **常用变体** 及其用途的完整总结，涵盖高效操作和历史命令复用的技巧：

---

## **1. 基础历史命令调用**

|变体|作用|示例（假设上条命令是`ls /tmp/file.txt`）|
|-|-|-|
|`!!`|**执行上一条命令**|`sudo !!`→`sudo ls /tmp/file.txt`|
|`!-n`|执行前第`n` 条命令（从当前倒数）|`!-2` → 执行倒数第二条命令  |
|`!n`|执行历史记录中编号为`n` 的命令|`!100` → 执行编号 100 的命令|
|`!string`|执行最近以`string` 开头的命令|`!ls`→ 执行最近的`ls ...`|


---

## **2. 参数引用（避免重复输入路径/参数）**

|变体|作用|示例（上条命令：`cat /var/log/syslog`）|
|-|-|-|
|`!$`|**上条命令的最后一个参数**|`vim !$`→`vim /var/log/syslog`|
|`!^`|上条命令的第一个参数|`cp !^ ~/backup`→`cp /var/log ~/backup`|
|`!*`|上条命令的所有参数（除命令名）|`grep "error" !*`→`grep "error" /var/log/syslog`|
|`!:n`|上条命令的第`n` 个参数（从 0 开始）|`echo !:1`→`echo /var/log`|


---

## **3. 快速修改历史命令**

|变体|作用|示例（上条命令：`echo hello world`）|
|-|-|-|
|`!!:s/old/new`|替换上条命令中的第一个`old`为`new`|`!!:s/hello/Hi`→`echo Hi world`|
|`!!:gs/old/new`|替换上条命令中所有`old`为`new`|`!!:gs/o/O`→`echO hellO wOrld`|
|`!!:p`|**仅打印上条命令，不执行**|`!!:p`→ 显示`echo hello world`|


---

|**场景**|**变体**|**示例**|
|-|-|-|
|重复上条命令|`!!`|`sudo !!`|
|最后一个参数|`!$`|`vim !$`|
|第一个参数|`!^`|`chmod +x !^`|
|所有参数|`!*`|`grep "error" !*`|
|替换命令中的字符串|`!!:s/old/new`|`!!:s/cat/less`|
|仅打印不执行|`!!:p`|`!!:p` → 显示命令|
|搜索历史命令|`!?keyword`|`!?nginx`|


掌握这些变体能极大提升命令行效率，但需谨慎操作历史中的敏感命令！

