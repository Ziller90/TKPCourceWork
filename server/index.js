require ('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5000;

const app = express();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // Указываете используемую версию OpenAPI
      info: {
        title: 'My Express API', // Заголовок API
        version: '1.0.0', // Версия API
        description: 'TKP', // Краткое описание
      },
      servers: [
        {
          url: 'http://localhost:5000', // URL, на котором запущен ваш сервер
          description: 'Development server', // Описание сервера
        },
      ],
      components: {
        securitySchemes: {
            Authorization: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "<JWT token here>"
            }
        }
    }
    },
    apis: ['server/routes/*.js'], // Пути к вашим файлам с маршрутами
  };

const swaggerUiOptions = {
  explorer: true
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.use(errorHandler);


const start = async () => {
    try{
        console.log(process.env.DB_NAME)
        console.log(process.env.DB_USER)
        console.log(process.env.DB_PASSWORD)

        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server started on port', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()




