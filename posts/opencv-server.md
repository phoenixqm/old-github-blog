


## 安装和配置node-opencv

因为我现有的服务器是nodejs，我首先想到的是在nodejs服务器中，
调用opencv接口的JavaScript接口。这样不加入新的服务器，方便管理。
然而opencv官方没有提供JavaScript接口。

node-opencv是一个开源项目，提供opencv的JavaScript转接口，
自带一些简单如人脸识别的JavaScript实例，类似的需要用起来很方便。
使用node-opencv之前需要安装编译。

### 在linux下的安装配置很简单：
```sh
$ git clone https://github.com/peterbraden/node-opencv
$ cd node-opencv
$ npm install
```
不出意外会顺利安装完成。然后测试：
```sh
$ cd examples
$ node face-detection.js
```
检查结果文件：examples/tmp/face-detection.png

### 在windows下的安装步骤：
首先保证以下几点：
 - 首先安装opencv for windows 64bit
 - 设置环境变量，参考https://github.com/peterbraden/node-opencv
 - 保证Visial Studio 2015或2013在PATH中可用

同样进行执行以下命令安装并测试：

```sh
> git clone https://github.com/peterbraden/node-opencv
> cd node-opencv
> npm install
> npm install opencv
> cd examples
> node face-detection.js
```

经过一些测试作者没有找到需要的JavaScript调用接口。考虑到node-opencv
只是一个发展中项目，我最终舍弃了node-opencv。下面使用一个简单的C++ HTTP服务器直接调用OpenCV的C++接口。

## 下载编译Simple-Web-Server

按照https://github.com/eidheim/Simple-Web-Server中的说明下载使用cmake编译，
无需赘述了。只要注意几点：
 - 安装OpenCV官方最新版，其中包括build好的lib和dll。
 - 我使用的Visual Studio 2015，需要相应的boost prebuild lib和dll。
 - 使用最新版的cmake，可能需要设置BOOST_ROOT等cmake变量。
 - cmake生成的项目后需要手工添加一些include dir和lib dir。
 - OpenCV prebuild 最新的是vc12，但是在VS 2015中可以照样使用。

代码方面无需赘言，可以参考https://github.com/phoenixqm/OpenCV-Server。


