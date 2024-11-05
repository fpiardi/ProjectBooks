
import express from 'express'; 
import swaggerUI from 'swagger-ui-express';
import bodyparser from 'body-parser';
import cors from 'cors';

import swaggerSpec from './routes/swagger';
import sequelize from './db/database';
import errorHandler from "./middlewares/errors";

require('./models/book');

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: [`http://localhost:${process.env.NODE_LOCAL_PORT}`, `http://localhost:${process.env.NODE_DOCKER_PORT}`],
  methods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Serve Swagger documentation
app.use('/docs', swaggerUI.serve);
app.get('/docs', swaggerUI.setup(swaggerSpec));


//test route
app.get('/', (req, res, next) => {
  res.send('Service is running');
});

//TODO: Add JWT Authentication

//book routes
app.use('/', require('./routes/books'));

// Error handling
app.use(errorHandler);

//sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    require('./db/seed');

    app.listen(process.env.NODE_LOCAL_PORT);
  })
  .catch((err: any) => console.log(err));