// declarations
require("dotenv").config();
const cors = require("cors");
const { ENVIROMENT, PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// routes import
const tasksRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projects");
const openaiRoutes = require("./routes/openai");
const userRoutes = require("./routes/users");
const catsRoutes = require("./routes/catsRoutes");

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

console.log("Tasks Routes Imported");

// Initialize cookie-session middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["Caroline", "Yuli", "Max"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

console.log("CORS Origin: ", process.env.ORIGIN);

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
  ContentType: "json",
};

app.use(cors(corsOptions));
app.use("/cats", catsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);
app.use("/openai", openaiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.json({ greetings: "hello world" });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
