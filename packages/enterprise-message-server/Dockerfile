FROM node:alpine

WORKDIR /enterprise

# 先缓存来装依赖 docker特性, 未改动的采用缓存
COPY ["package.json", "./"]

# 安装依赖
RUN yarn --registry https://registry.npm.taobao.org

# 全局安装typescript
RUN yarn global add typescript --registry https://registry.npm.taobao.org

# 在移动整个项目
COPY . .

# # 依赖手动编译和编译当前项目
# RUN yarn build

# 启动服务
CMD yarn build && yarn start

# 暴漏端口 3000
EXPOSE 3000