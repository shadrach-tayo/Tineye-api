var express = require("express");
var router = express.Router();
const multer = require("multer");
const TinEye = require("tineye-api");

const upload = multer();

var api = new TinEye(
  "https://api.tineye.com/rest/",
  "iOElj,zy=byZo=K*qJEi",
  "RdjIfK8gbJsJwbJsfHAukIchIecYrgs+1sn0CshF"
);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Search image Url. */
router.get("/image-search", async function(req, res, next) {
  const { image_url } = req.query;

  if (!image_url) return res.status(400).send({ message: "Invalid image url" });
  console.log("url ", image_url);

  var params = {
    offset: 0,
    limit: 10,
    sort: "size",
    order: "asc"
  };

  return api
    .searchUrl(image_url, params)
    .then(response => {
      console.log("response");
      res.status(200).send(response);
    })
    .catch(error => {
      console.log("error ", error.status, error.message);
      res.status(400).send(error);
    });

  // res.send({ message: "Image search received" });
});

/* Search image Url. */
router.post("/image-data", [upload.none()], async function(req, res, next) {
  const { image_data } = req.body;

  if (!image_data)
    return res.status(400).send({ message: "Image Data not sent" });

  console.log("url ", image_data);
  var params = {
    offset: 0,
    limit: 10,
    sort: "size",
    order: "asc"
  };

  return api
    .searchData(image_data, params)
    .then(response => {
      console.log("response");
      res.status(200).send(response);
    })
    .catch(error => {
      console.log("error ", error.status, error.message);
      res.status(400).send(error);
    });

  // res.send({ message: "Image search received" });
});

module.exports = router;
