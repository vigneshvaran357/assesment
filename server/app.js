const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");

// Import Doctor Router
const doctorauthRouter = require("./server/Router/Doctorauth");
const patientauthRouter = require("./server/Router/Userauth");
const bookingauthRouter = require("./server/Router/Booking");
const consulationauthRouter = require("./server/Router/Consultation");
//Db Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

//middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("server/Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//doctor Routes
app.use("/api/doctor", doctorauthRouter);
app.use("/api/patient", patientauthRouter);
app.use("/api/booking", bookingauthRouter);
app.use("/api/consultation", consulationauthRouter);

// Run Server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
