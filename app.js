require('dotenv').config();
require('express-async-errors');

const helmet=require('helmet');
const xss =require('xss-clean');
const cors=require('cors');
const rateLimiter=require('express-rate-limit')

const connectDb=require('./db/connect')
const express = require('express');
const app = express();

//*Routers 
const authRouter=require('./routes/auth')
const boardAndTasksRouter=require('./routes/boardAndTasks')

const authenticateUser=require('./middleware/authentication')
const notFoundMiddleware =require('./middleware/not-found')
const errorHandlerMiddleware =require('./middleware/error-handler')


app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



//*Routes 

app.get('/', (req, res) =>{
    res.send('running backend');
})

app.use('/auth',authRouter)
app.use('/board',authenticateUser,boardAndTasksRouter)

//*Globals middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port =process.env.PORT || 3000;
const start=async()=>{

    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log(`Server started ${port}`));
    } catch (error) {
        console.log(error);
    }


}

start();



