import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // Địa chỉ frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Cho phép gửi cookie
};

export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
