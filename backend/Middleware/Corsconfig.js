import cors from 'cors';

const corsOptions = {
  origin: '*', // Specify the allowed origin(s) if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
