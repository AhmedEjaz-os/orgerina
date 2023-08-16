const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.configDotenv();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log("DB is connected..."))
.catch(err => console.error("There was an error connecting DB", err));
const routes = require('./routes/routes.js');
const signIn = require('./routes/createUserRoute.js'); 
app.use('/', routes);
app.use('/signIn', signIn);
app.use(cors())




app.listen(process.env.PORT || 5000, () => console.log(`Connected with port ${process.env.PORT || 5000}.....`))