const express = require('express');
const Joi = require('joi');
const app  = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const booksRoute = require('./routes/books');
const homeRoute = require('./routes/home');

app.set('view engine','pug'); // setting template engine to pug..
app.set('views','./views') ; // setting the views under views folder , this is default setting tho

app.use(express.json())  // enabling to get use req.body in the post..

app.use(express.urlencoded({extended: true}));
app.use(express.static("assets"));
app.use(logger);
app.use(helmet());
if(app.get("env") === "development"){  
 app.use(morgan('tiny'));
 console.log('Morgan is enabled ...')
}

app.use('/api/books' , booksRoute) ;
app.use('/' , homeRoute);




const port = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listenning on port ${port} ...`)) ;