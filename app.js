require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express');

const app = express();

const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute');
const usersRouter = require('./route/usersRoute');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');




app.use(express.json())



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/users', usersRouter)

app.use('*', catchAsync(async (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server`, 404)
}))


app.use(globalErrorHandler)


const PORT = process.env.APP_PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})