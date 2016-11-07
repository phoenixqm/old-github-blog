## 安装和初始配置

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
