const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose.connect(
  "mongodb+srv://himanshu:himanshu@cluster0.ufqdett.mongodb.net/?retryWrites=true&w=majority",
  function (err) {
    console.log("connection successfully");
  }
);

const PORT = process.env.PORT || 5000;
const personalSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  age: String,
  mno: String,
  email: String,
});

const Personal = new mongoose.model("Person", personalSchema);

const bussinessSchema = new mongoose.Schema({
  bname: String,
  gstno: String,
  noOfEmp: String,
  turnOver: String,
  address: String,
});

const Bussiness = new mongoose.model("bussiness", bussinessSchema);

const loanSchema = new mongoose.Schema({
  id: String,
  amt: String,
  rate: String,
  tenure: String,
});

const Loan = new mongoose.model("loan", loanSchema);

app.post("/", (req, res) => {
  res.send("hello");
});

app.post("/personal", (req, res) => {
  const { fname, lname, age, mno, email } = req.body;
  console.log(fname);
  Personal.findOne({ email: email }, (err, person) => {
    if (person) {
      res.send({ message: "user already exits" });
    } else {
      const person = new Personal({
        fname,
        lname,
        age,
        mno,
        email,
      });
      person.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully inserted.." });
        }
      });
    }
  });
});

app.post("/bussiness", (req, res) => {
  const { bname, gstno, noOfEmp, turnOver, address } = req.body;
  console.log(bname);
  Bussiness.findOne({ gstno: gstno }, (err, bussiness) => {
    if (bussiness) {
      res.send({ message: "Data already exits" });
    } else {
      const bussiness = new Bussiness({
        bname,
        gstno,
        noOfEmp,
        turnOver,
        address,
      });
      bussiness.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully inserted.." });
        }
      });
    }
  });
});

app.post("/loan", (req, res) => {
  const { id, amt, rate, tenure } = req.body;
  console.log(amt);
  Loan.findOne({ id: id }, (err, loan) => {
    if (loan) {
      res.send({ message: "Data already exits" });
    } else {
      const loan = new Loan({
        id,
        amt,
        rate,
        tenure,
      });
      loan.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully inserted.." });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("Started at port", PORT);
});
