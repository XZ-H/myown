# Flask+Echarts

## 项目介绍

本项目使用了Flask框架搭建，简单做了一个数据的交互，最后使用Echarts进行数据大屏可视化。当然项目较为简单，可以继续改进。以下为可以改进的点：

1. 项目启动首页为登录页，登录未使用flask登录模块，也未连接数据库。
2. 大屏分为7个小图，点击小图可以放大成整页，原先是直接修改url地址然后再重新写了一个页面再加载图进去，较为臃肿。可以改进成使用Echarts参数，点击直接满屏。（未知）

## 数据源

1. 湖北省统计局；http://tjj.hubei.gov.cn/tjsj/sjkscx/tjnj/qstjnj/
2. CSDN：https://download.csdn.net/download/one_a_xiaobai/12322724
   数据经过适当的处理

## 目录结构

1. static  -- 静态资源。存放js，font， css以及数据文件
2. templates  -- 页面文件。存放h5
3. pachong.py  -- 数据采集
4. wash.py  -- 数据清洗
5. analytic.py  -- 数据挖掘
6. app.py  -- 启动文件。flask框架



