require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
//const apiRoutes = require('./routes/api');
//const fileUpload = require('express-fileupload');
const connection = require('./config/database');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');



const app = express();// app express
const port = process.env.PORT || 8888; //port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

//config file upload
//app.use(fileUpload());


//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);
// app.use('/v1/api/', apiRoutes);


(async () => {
    try {
        //using mongoose
        await connection();

        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
