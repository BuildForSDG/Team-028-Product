const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  }
});

const upload = multer({storage});

module.exports = (app) => {
  const fundApplication = require("../controller/fundApplication.controller");

  app.post("/fund/apply", upload.single("proposals"), fundApplication.create);

  app.get("/fund/applications/all", fundApplication.findAll);

  app.get("/fund/application/id", fundApplication.findOne);

 //app.put("/fund/update", fundApplication.updateOne);
  
};
