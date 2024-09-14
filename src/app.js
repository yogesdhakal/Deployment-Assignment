const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const methodOverride = require("method-override");
const { basicAuthMiddleware } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { syncTablesToDb } = require('./config/syncdb');
const { seedDefaultAdmin } = require('./services/adminService');

const app = express();
const port = process.env.PORT || 3000;

app.get("/",(req,res) =>{
  return res.redirect("/participants")
})

// Middleware to parse JSON bodies
app.use(express.json());
app.use(methodOverride("_method"));

// sync tables to DB
(async () => {
  await syncTablesToDb();
})();

// load initial table values
new Promise((resolve) => {
  setTimeout(() => {
    seedDefaultAdmin()
    resolve();
  }, 2000);
});



// Apply Basic Auth to all routes
app.use(basicAuthMiddleware);

app.use("/participants", require("./routes"))

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
