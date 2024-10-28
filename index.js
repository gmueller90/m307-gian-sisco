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

app.get("/post", async function (req, res) {
  res.render("post", {});
});

app.get("/newpost", async function (req, res) {
  res.render("newpost", {});
});

app.post("/createpost", async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO moodposts (moodtitle, moodtext, moodimg, moodactivity1, moodactivity2, moodactivity3, moodactivity4, moodactivity5) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      req.body.moodtitle,
      req.body.moodtext,
      req.body.moodimg,
      req.body.moodactivity1,
      req.body.moodactivity2,
      req.body.moodactivity3,
      req.body.moodactivity4,
      req.body.moodactivity5,
    ]
  );
  res.redirect("/overview");
});
/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
