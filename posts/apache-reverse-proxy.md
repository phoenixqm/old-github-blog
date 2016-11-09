
<!-- 搭建Apache的反向代理服务器 -->

## 反向代理服务器的目的

反向代理服务器最常用在一下情况：若干个Web轻应用实例使用不同的服务器（比如若干个nodejs服务器），他们可能有不同的ip+端口组合。
但是对外访问的域名只有一个，端口只有一个HTTP默认的80端口。要求让不同应用看上去就像同一个域名下的不同路径。
这样的好处是既提供一个统一的域名，每个项目的具体服务器又毫不相干。增减一个轻应用就是增加一个反向代理服务器的条目。

## 如何配置反向代理服务器

主流的web服务器应该都可以作为方向代理服务器，最常见的是Apache httpd和Nginx。他们的配置文件语法不同，但是实际内涵是很相似的。
本文就Apache httpd为例来说明如何从无到有配置一个反向代理服务器。本文只讨论linux平台，环境为 Ubuntu 16.04 LTS。
注意不同的linux发行版的软件包管理不同，apache httpd的安装配置也有不同。

### 在linux下的apt-get安装配置：

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
# It is split into several files forming the configuration hierarchy outlined
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





