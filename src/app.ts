// Import the 'express' module
import express from 'express';
import path from 'path';
import uploadRouter from './routes/uploadRoute';


// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define the directory where your HTML files (views) are located
app.set('views', path.join(__dirname, '../views'));
app.use('/api/v1/uploads', uploadRouter);



export default app