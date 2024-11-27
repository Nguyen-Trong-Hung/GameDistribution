# Sử dụng image Node.js phiên bản 18 làm base
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /backend

# Copy package.json và package-lock.json (nếu có) và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Cài đặt nodemon toàn cục nếu chưa có trong package.json
RUN npm install -g nodemon

# Copy mã nguồn vào container
COPY . .

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 8800

# Lệnh chạy ứng dụng với nodemon
CMD ["nodemon", "index.js"]
