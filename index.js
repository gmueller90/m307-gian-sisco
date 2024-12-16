import { createApp, upload } from "./config.js";

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

/* app.get("/register", async function (req, res) {
  res.render("register", {});
});

app.get("/login", async function (req, res) {
  res.render("login", {});
}); */

app.get("/overview", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  const result = await app.locals.pool.query(
    "SELECT bild.datum, bild.image, moodpost.title, users.loginname, moodpost.id FROM bild INNER JOIN moodpost ON moodpost.bild_id = bild.id INNER JOIN users ON moodpost.user_id = users.id"
  );
  for (const r of result.rows) {
    const c = await app.locals.pool.query(
      "SELECT * FROM kommentar WHERE moodpost_id = $1",
      [r.id]
    );
    r.comments = c.rows;
  }
  res.render("overview", { overview: result.rows });
});

app.get("/singlepost/:id", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  const result = await app.locals.pool.query(
    "SELECT bild.datum, bild.image, moodpost.title, users.loginname, moodpost.id FROM bild INNER JOIN moodpost ON moodpost.bild_id = bild.id INNER JOIN users ON moodpost.user_id = users.id WHERE moodpost.id = $1",
    [req.params.id]
  );
  for (const r of result.rows) {
    const c = await app.locals.pool.query(
      "SELECT * FROM kommentar WHERE moodpost_id = $1",
      [r.id]
    );
    r.comments = c.rows;
  }
  res.render("overview", { overview: result.rows });
});

app.post("/comment/:id", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  await app.locals.pool.query(
    "INSERT INTO kommentar (date, text, user_id, moodpost_id) VALUES (current_timestamp, $1,$2,$3)",
    [req.body.text, req.session.userid, req.params.id]
  );
  res.redirect("/");
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/post", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("post", {});
});

app.get("/newpost", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("newpost", {});
});

app.post("/createpost", upload.single("moodimg"), async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  const image = await app.locals.pool.query(
    "INSERT INTO bild (image, datum) VALUES ($1, current_timestamp) RETURNING id",
    [req.file.filename]
  );

  await app.locals.pool.query(
    /* userid vs users_id überprüfen inkl. $9 */
    "INSERT INTO moodpost (user_id, title, text, bild_id, vacation, sport, shopping, dating, creativity, work, date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, current_timestamp)",
    [
      req.session.userid,
      req.body.moodtitle,
      req.body.moodtext,
      image.rows[0].id,
      req.body.vacation,
      req.body.sport,
      req.body.shopping,
      req.body.dating,
      req.body.creativity,
      req.body.work,
    ]
  );

  res.redirect("/overview");
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
