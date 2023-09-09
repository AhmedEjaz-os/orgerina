const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const {
  signInOwner,
  createUser,
  signInUser,
  ResendVerificationEmail,
  VerifyStatusUpdateModule,
  ForgetPasswordModule,
} = require("../controller/createUserController.js");

var jsonParser = bodyParser.json();

router.post("/", jsonParser, signInUser);
router.get("/createUser", signInOwner);
router.post("/createUser", jsonParser, createUser);
router.post("/resend-verification-email", jsonParser, ResendVerificationEmail);
router.get(
  "/email-verification/:token/:email/:accessToken",
  VerifyStatusUpdateModule
);
router.post("/forget-password", jsonParser, ForgetPasswordModule);

module.exports = router;
