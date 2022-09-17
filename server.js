const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const dns = require("dns");
const port = 4200;

const urls = {
  "curve.fi": "76.76.21.21",
  "faucet.metamask.io": "143.198.245.6",
};

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.post("/ping", (req, res) => {
  const url = req.body["url"];
  dns.resolve4(url, (err, addresses) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(addresses[0]);

    const isValid = addresses[0] === urls[url];

    // if (urls[url] && urls[url] === addresses[0]) {

    // } else {
    //   res.json({
    //     ipAddress: addresses[0],
    //     valid: false,
    //   });
    // }

    res.json({
      detectedIpAddress: addresses[0],
      correctIpAddress: urls[url],
      valid: isValid,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
