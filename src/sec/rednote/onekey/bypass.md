# Bypass

1. **编码方式的区别**

    码方式          | 示例                | 典型用途                     |
|-------------------|---------------------|-----------------------------|
| **八进制转义序列** | `\262\273` → "不"   | 命令行工具保护非 ASCII 字符  |
| **十六进制编码**   | `0xBA 0xBB` → "不"  | 编程语言、二进制数据处理    |
| **Unicode 转义**   | `\u4E0D` → "不"     | Java/JavaScript 等语言       |
| **Base64**         | `5piv` → "不"       | 网络传输、邮件编码          |

### **如何还原原始中文？**

1. **手动转换（GBK 编码）**
    - 将八进制转义序列 `\xxx` 转换为 **十六进制**，再查 GBK 码表：

```Python
# 示例：\262\273 → "不"
oct_to_hex = lambda x: hex(int(x, 8))  # 八进制 → 十六进制
print(oct_to_hex('262'))  # 0xBA
print(oct_to_hex('273'))  # 0xBB
# 查 GBK 码表：0xBABB → "不"
```
2. **使用工具自动解码**
    - **Linux/Mac:**

```Bash
echo -e "\262\273\326\252\265\300" | iconv -f GBK
# 输出：不知道
```
    - **Python:**

```Python
s = r"\262\273\326\252\265\300"
bytes_obj = bytes(int(x, 8) for x in s.split('\\')[1:])
print(bytes_obj.decode('gbk'))  # 输出：不知道
```

## XFF绕过

让应用认为，内网127访问，绕过权限验证。

```YAML
http_x_forwarded_for:127.0.0.1
```

