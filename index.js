import 'dotenv/config';
import express from 'express';
import { loggerMiddleware } from './middlewares/logger.js';
import bookRouter from './routes/books.routes.js';
import authorRouter from './routes/authors.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));
