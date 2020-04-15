const express = require("express");
const knex = require("../connection");

const router = express.Router();

// Create New Cluck Page
router.get("/", (request, response) => {
  knex("Clucks")
    .orderBy("created_at", "desc")
    .then((clucks) => {
      response.render("cluck", { clucks });
    });
});

router.get("/sign_in", (request, response) => {
  response.render("sign_in");
});

router.get("/new", (request, response) => {
  response.render("new");
});

router.post("/", (request, response) => {
  const { content, image_url } = request.body;
  const username = request.cookies.username;

  knex("Clucks")
    .insert({
      username: username,
      content: content,
      image_url: image_url,
    })
    .returning("*")
    .then(response.redirect("/cluck"));
});

router.post("/sign_in", (request, response) => {
  console.log();
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 4;
  const params = request.body;

  response.cookie("username", params.username, { maxAge: COOKIE_MAX_AGE });

  response.redirect("/cluck");
});

router.post("/sign_out", (request, response) => {
  response.clearCookie("username");
  response.render("sign_in");
});

module.exports = router;
