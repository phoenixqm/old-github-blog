
<!-- 搭建Apache2反向代理服务器 -->

## 反向代理服务器的目的

反向代理服务器最常用在这种情况：若干个web轻应用实例使用各自的服务器（比如若干个nodejs
服务器），他们可能有不同的ip+端口组合。但是对外访问的域名只有一个，端口只有一个HTTP
默认的80端口。要求让不同web应用看上去就像同一个域名下的不同路径。
这样的好处是既提供一个统一的域名，每个项目的具体服务器又毫不相干。增减一个轻应用就是增加
一个反向代理服务器的代理条目。

主流的web服务器应该都可以作为反向代理服务器，最常见的是Apache和Nginx。
他们的配置文件语法不同，但是实际原理是很相似的。
本文就Apache2为例来说明如何从无到有配置一个反向代理服务器。本文只讨论linux平台，环境为
Ubuntu 16.04 LTS。
注意不同的linux发行版的软件包管理不同，apache的安装路径和配置文件也有不同。

## 在linux下的apt-get安装：

源码安装应该是可以的，但我先试用的偷懒方法：

```sh
$ sudo apt-get install apache2
```

然后启动，打开页面测试，如果不成功检查iptable配置：
```sh
$ sudo /etc/init.d/apache2 start
```
注意apache的配置文件分为不同的.conf文件：
```
# It is split into several files forming the configuration hierarchy
# below, all located in the /etc/apache2/ directory:
#
#   /etc/apache2/
#   |-- apache2.conf
#   |   `--  ports.conf
#   |-- mods-enabled
#   |   |-- *.load
#   |   `-- *.conf
#   |-- conf-enabled
#   |   `-- *.conf
#   `-- sites-enabled
#       `-- *.conf
```


## apache2反向代理的配置文件


因为apache2的proxy_html等模块默认没有启用，启动的方法就是把相应的配置文件从mods-available
链接到mods-enabled：

```sh
$ cd /etc/apache2/mods-enabled
$ sudo ln -s ../mods-available/proxy.load .
$ sudo ln -s ../mods-available/proxy_http.load .
$ sudo ln -s ../mods-available/proxy_html.load .
$ sudo ln -s ../mods-available/proxy_html.conf .
```

下面自己编写一个.conf文件加入到上面目录结构中。
```sh
$ cd /etc/apache2/sites-enabled
$ sudo vim ../sites-available/webapp1.conf
$ sudo ln -s ../sites-available/webapp1.conf .
```
webapp1.conf文件内容如下：
```
<Location /WebApp1>
  # ProxyPass/ProxyPassReverse
  ProxyPass        http://localhost:3003
  ProxyPassReverse http://localhost:3003
  # ProxyHTMLURLMap pass Links in HTML/JavaScript Source
  ProxyHTMLURLMap /              /WebApp1/
  ProxyHTMLURLMap /WebApp1/      /WebApp1/
  AuthType Basic
  AuthName "WebApp1 User"
  AuthUserFile /etc/apache2/passwd/WebApp1User.txt
  Require valid-user
  Order   deny,allow
  Allow   from all
</Location>
```
关键内容有三点：
 - 将 ```/WebApp1``` 代理到具体的服务器，这里是```http://localhost:3003```
 - 设置代理的ProxyHTMLURLMap。
 - 设置访问的用户和密码文件。

配置文件中指定了密码文件，但是现在这个文件还没有创建，下一步就是创建密码文件。

## 生成用户名和密码文件

```sh
$ cd /etc/apache2/
$ sudo mkdir passwd
$ sudo vim passwd/WebApp1User.txt
```

假设提供两个用户名访问，一个为tempuser，密码为TeMpUserPaSSwd，
另一个为admin，密码为 OuG2c$3ml。

WebApp1User.txt文件的格式是每行一个用户的username:密文密码。
首先运行命令得到两个密码的密文：
```sh
$ openssl passwd -apr1 TeMpUserPaSSwd
$ openssl passwd -apr1 OuG2c$3ml
```
控制台分别输出：
```sh
$apr1$O.JsfNBW$Jf1Scc/1L4rR41LVKXuDR.
$apr1$geCT6Swf$56.8NGH7e46WPu1ySfGMm/
```

WebApp1User.txt文件就是：
```sh
tempuser:$apr1$O.JsfNBW$Jf1Scc/1L4rR41LVKXuDR.
admin:$apr1$geCT6Swf$56.8NGH7e46WPu1ySfGMm/
```

## 测试代理连接状态

配置文件和密码文件都到位之后就可以启动apache2和webapp服务器并测试。

先启动webapp服务器，测试 http://localhost:3003 可访问。
作者此处是一个nodejs服务器，可以使用node从一个JavaScript脚本启动：
```sh
$ cd ~/WebApps/WebApp1/
$ sudo node server.js 3003
```

如需检查端口号使用：
```sh
netstat –apn | grep 3003
```

现在重新启动apache2，使webapp1.conf配置文件生效:
```sh
$ sudo /etc/init.d/apache2 restart
```

检查http://your-domain-or-ip/WebApp1/index.html页面是否能够正常打开。
浏览器会提示输入用户名和密码，正确之后会显示webapp1的index.html页面。

如果不能正常访问可以检查apache2的两个log：
```sh
$ cat /var/log/apache/access.log
$ cat /var/log/apache/error.log
```
注意，使用ProxyHTMLURLMap有一个问题是webapp中的资源URL或者API
不要使用绝对路径，而要使用相对路径，否则可能不能正确地进行路径映射。

## 保证服务开机启动和崩溃重启

<!--- 如果要添加为开机启动执行的脚本文件，可先将脚本复制或者软连接到/etc/init.d/目录下，
然后用：update-rc.d xxx defaults NN命令(NN为启动顺序)，将脚本添加到初始化执行的队列中去。
注意如果脚本需要用到网络，则NN需设置一个比较大的数字，如99。但是，
这种方式不能达到崩溃重启的效果。目前最推荐的方式是upstart自动重启。 -->


apache2安装之后默认已经是开机自动启动。``` ls /etc/init.d/```可以看见apache2的自动启动脚本。
但是现在```http://localhost:3003```对应的是一个由命令行启动的nodejs服务器。那么问题来了，
如何保证nodejs服务器服务器开机自动运行呢？

自从Ubuntu 15.04, ```systemd```取代```upstart```成为默认的服务管理方式。下面配置并测试systemd
服务（先杀掉原来的nodejs服务进程）。

首先阅读```man systemd```，特别是最后的 ```/etc/systemd/system/httpd.service```。
照猫画虎新建webapp1.service配置文件：

```sh
$ cd /etc/systemd/system
$ sudo vim /lib/systemd/system/webapp1.service
```
注意webapp1.service文件创建的路径，其内容如下：

```sh
[Unit]
Description=WebApp1
After=remote-fs.target
ConditionPathExists=/home/phoenixqm/WebApps/WebApp1/

[Service]
ExecStart=/home/phoenixqm/WebApps/WebApp1/node \
		  /home/phoenixqm/WebApps/WebApp1/server.js 3003 > \
		  /var/log/webapps/webapp1.log
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartPreventExitStatus=255
Type=notify

[Install]
WantedBy=multi-user.target

```

注意一下几点：
 - ```ExecStart```中的路径必须是绝对路径，因为systemd不是以普通用户身份运行的，
 不可以使用```~/```的相对路径。
 - 最后```WantedBy=multi-user.target```是必须的，否则后面```systemctl enable webapp1```不能成功。


然后加载配置文件并启动服务：

```sh
$ sudo systemctl daemon-reload
$ sudo systemctl enable webapp1
$ sudo systemctl start webapp1 &
```
打开页面测试结果，通过systemctl系列命令查看状态，同时测试关闭服务和重启服务：

```sh
$ sudo systemctl restart webapp1 &
$ sudo systemctl stop webapp1
```
systemctl enable webapp1命令会在/etc/systemd/system目录下建立链接，指向
/lib/systemd/system/webapp1.service。通过以下命令检查webapp1.service的enable的状态。

```sh
$ systemctl list-unit-files --all | grep webapp1
```

输出的结果应该是 ```webapp1.service enabled```。如果状态不是enabled，则不能开机自动运行。
这时需要仔细检查阅读```man systemd```并检查前面的配置。其他状态检查命令有：

```sh
$ systemctl status webapp1.service
$ sudo journalctl -u webapp1
```

重启启动Ubuntu，测试开机是否自动运行：```sudo reboot```。 如果开机后apache2或者nodejs服务没有自动运行，说明你遇到了我没有遇到的错误。
如果这样请仔细查看apache2的log，并通过systemd的相关命令查看的服务状态。


## 代理多个webapp

以上顺利完成后，代理多个webapp就很简单了，只需要对每个webapp分别设置URL映射，
可以使用不同或者相同的用户名和密码文件，并分别建立webapp的systemd服务。


