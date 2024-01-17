// Gebruik maken van mijn environment variables
require("dotenv").config();

// Core module - Node.js
const path = require("path");

// Third-party modules
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// CORS middleware
const cors = require("cors");

// HELMET Middleware
const helmet = require("helmet");

// Local modules
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const filmsRouter = require("./routes/films");
const voorstellingenRouter = require("./routes/voorstellingen");
const ticketsRouter = require("./routes/tickets");
const zalenRouter = require("./routes/zalen");

// Middlewares
const ipLoggerMiddleware = require("./middlewares/ip_logger");

// Initialiseren van onze Express applicatie
const app = express();

// Middlewares
app.use(ipLoggerMiddleware);

app.use((req, res, next) => {
  const timeStamp = new Date().toISOString();
  req.timeStamp = timeStamp;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS middleware gebruiken
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());

// Routes koppelen aan een pad
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/films", filmsRouter);
app.use("/voorstellingen", voorstellingenRouter);
app.use("/tickets", ticketsRouter);
app.use("/zalen", zalenRouter);

// Fallback route
app.all("*", (req, res) => {
  res.status(404).send("Fallback route vanuit app.js");
});

module.exports = app;
