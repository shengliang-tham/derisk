const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const dns = require("dns");
const port = 4200;

const urls = {
  "curve.fi": "76.76.21.21",
};

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.post("/ping", (req, res) => {
  const domain = req.body["domain"];
  dns.resolve4(domain, (err, addresses) => {
    if (err) {
      console.log(err);
      return;
    }

    if (urls[domain] && urls[domain] === addresses[0]) {
      res.json({
        ipAddress: addresses[0],
        valid: true,
      });
    } else {
      res.json({
        ipAddress: addresses[0],
        valid: false,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
