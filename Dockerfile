FROM node

WORKDIR /enterprise

# 在移动整个项目
COPY . .

# RUN npm install -g yarn
RUN yarn install --registry https://registry.npm.taobao.org

# build
RUN yarn build

# 启动服务
CMD ["yarn", "workspace", "@xiaokyo/enterprise-message-server", "run", "start"]

# 暴漏端口 3000
EXPOSE 3000