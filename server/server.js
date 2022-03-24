const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
// const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routers');

app.use(cors());


app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist/')))

app.use('/server', router);


//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
    });
  
module.exports = app;