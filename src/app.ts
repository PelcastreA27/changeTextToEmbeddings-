import express from 'express'
import Routes from './api/routes/index'
import cors from 'cors'
import errorHandler from './middlewares/error-handler';




const app = express()

app.use(cors());

app.use(express.json())

app.use(Routes);

app.use(errorHandler)

export default app;