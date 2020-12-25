###
 # @Author: zhimin
 # @Date: 2020-12-25 15:56:45
 # @LastEditors: zhimin
 # @LastEditTime: 2020-12-25 16:34:14
 # @FilePath: \happy-fe\pub.sh
### 
#!/bin/sh
# 
# 使用方法：front-deploy.sh mmall-fe
#
GIT_HOME=/developer/happy-fe
DEST_PATH=/product/fe/

if [ ! -n "$1" ];
    then
    echo -e "请输入要发布的项目"
    exit
fi

if [ $1 = "mmall-fe" ];
    then
    echo -e "======Enter happaymmal-fe======"
    cd $GIT_HOME
else 
    echo -e "输入的项目名不对"
    exit
fi

# clear dist
echo -e "=====Clear happy-fe dist======"
rm -rf ./dist

# git 操作
echo -e "=======git checkout master==========="
git checkout master
# 从git服务器拉取代码
git pull

# npm install
echo -e "=========npm install==============="
npm install --registry=https://registry.npm.taobao.org

# 打包
echo -e "=========npm run build==============="
npm run build

if [ -d "./dist"];
    then 
    mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

    #copy
    cp -R ./dist $DEST_PATH$1

    # echo result
    echo -e "==========Desploy Success========"
else
    echo -e "==========Desploy Fail========"
fi
