# Sử dụng image Node.js chính thức
FROM node:18 AS build

# Set thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn của ReactJS vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng NGINX làm web server
FROM nginx:stable-alpine

# Copy file build vào thư mục NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình nginx tùy chỉnh (nếu có)
COPY frontnginx.conf /etc/nginx/conf.d/defaultnginx.conf

# Expose cổng 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
# # Use an official Node.js runtime as a parent image
# FROM node:18

# # Set the working directory
# WORKDIR /usr/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port the app runs on
# EXPOSE 1702

# # Define the command to run the app
# CMD ["npm", "start"]