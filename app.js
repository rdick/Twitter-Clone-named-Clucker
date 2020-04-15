const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

console.log("__dirname: ", __dirname);

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((request, response, next) => {
  console.log("cookies", request.cookies);

  const username = request.cookies.username;

  response.locals.loggedInUserName = username || "";

  next();
});

// A week in milliseconds
// app.use((request, response, next) => {
//   if (query != undefined) {
//     if (query.teamCount == "number") {
//       console.log("buddy");
//     }
//   }
//   next();
// });

app.use(
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      return method;
    }
  })
);

const cluckRouter = require("./routes/cluckRouter");
app.use("/cluck", cluckRouter);

const PORT = 3000;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}/cluck/sign_in`);
});
