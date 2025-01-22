# sftp、scp、rsync、netcat工具特点及使用场景说明
- https://help.aliyun.com/zh/ecs/user-guide/use-sftp-to-upload-files-to-a-linux-instance

### 特点及使用场景说明

- sftp 使用交互式文件管理的传输方式，传输前需先与远程FTP服务器建立连接，连接后可以使用ls查看远程文件目录结构等操作。
- scp 用于快速传输单个文件或整个目录。如果事先了解远端文件目录结构，可以使用scp工具。
- rsync 主要用于文件同步、备份等场景，并支持增量拷贝。在需要传输大文件或网络环境较差的情况下，可以考虑使用rsync工具。
- netcat 是一款功能较为完善的网络工具，不仅支持文件传输，还具备端口扫描和端口连通性测试等功能。然而，在默认情况下，netcat在传输文件时并不进行加密。因此，如果您的数据传输涉及公网环境，建议您不要直接使用netcat进行数据传输。

 ### 通过sftp工具传输文件

sftp命令会基于ssh协议对所传输的文件进行加密处理，支持SSH的完整安全性和身份验证功能。不仅具备FTP协议的所有功能，还提供了更高的安全性和可靠性。

使用示例

  登录远程FTP服务器
  sftp <user-name>@<remote-ftp-server-ip>
  
  上传或下载文件/文件夹。
  
  运行以下命令，将local_folder_or_file复制到远程服务器。
  put -r local_folder_or_file remote_folder_or_file
  
  运行以下命令，将远程服务器的remote_folder_or_file复制到本地。 
  get -r remote_folder_or_file local_folder_or_file

### 通过scp工具传输文件

大部分Linux和Windows已经内置了scp工具，您无需进行安装即可使用，SCP命令使用SSH来传输数据，并使用与SSH相同的认证模式，在需要进行验证时会要求您输入密码或口令。

SCP的常用示例如下：

  从本地复制目录到远程服务器
  执行以下命令，将local_file复制至remote_ip的remote_folder中。
  scp -r local_file remote_username@remote_ip:remote_folder
  
  从远程服务器复制目录到本地
  执行以下命令，将remote_ip中的remote_folder复制至local_file中。
  scp -r remote_username@remote_ip:remote_folder local_file

### 通过rsync工具传输文件

参见原文

- https://help.aliyun.com/zh/ecs/user-guide/use-sftp-to-upload-files-to-a-linux-instance
