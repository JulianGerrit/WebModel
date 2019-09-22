const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require('body-parser');
const indexRouter = require("./routes/index");
const app = express();
const axios = require("axios")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api", indexRouter);

app.post('/Index', function (req, res) {
  console.log("Starting values:", req.body.startingValues.split(/\r?\n/g))
  console.log("Loop code:", req.body.loopCode.split(/\r?\n/g))
  const request = {
  "requestSend" : Date.now(),
  "contents" : {
    "lines": req.body.loopCode,
    "argLines": req.body.startingValues,
    "syntax": req.body.syntax
  },
  "maxX": 100,
  "minX": -100,
  "timeout": 20000
  }
  axios.post('http://localhost:8080/calculate', request)
  .then(function (response) {
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get("*", (req, res) => {
  res.sendFile("build/index.html", { root: __dirname });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}


module.exports = app;
