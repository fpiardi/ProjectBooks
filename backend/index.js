const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./routes/swagger');
const bodyparser = require('body-parser');
const sequelize = require('./db/database');
const cors = require('cors');
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
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//test route
app.get('/', (req, res, next) => {
  res.send('Service is running');
});

//TODO: Add JWT Authentication

//book routes
app.use('/', require('./routes/books'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    require('./db/seed');

    app.listen(process.env.NODE_LOCAL_PORT);
  })
  .catch(err => console.log(err));