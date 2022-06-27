const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Settings = require('./helpers/settings');
const { dbConnection } = require('./utils/database');
const Router = require('./appRouter');
const userRouter = require('./modules/users/routes');
const { verifyAccessToken } = require("./helpers/jwthelper")
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.route('/', verifyAccessToken).get((req, res) => {
    res.send('server up and running!!!');
});
app.get("/okay", verifyAccessToken,(req, res)=>{
    res.send("Hello world")
})
app.use(Router);


const conn = dbConnection();

conn.then(() => {
    console.log('db connected successfully');
    
    const PORT = Settings.getPort();
    app.listen( PORT, () => {
        console.log(`app started on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})
