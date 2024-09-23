import { createApp } from "./config.js";

const app = createApp({
  user: "dawn_haze_3386",
  host: "bbz.cloud",
  database: "dawn_haze_3386",
  password: "b460a2f7191fbf7397b3295c00c8a4f0",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/register", async function (req, res) {
  res.render("register", {});
});

app.get("/login", async function (req, res) {
  res.render("login", {});
});

app.get("/overview", async function (req, res) {
  res.render("overview", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
