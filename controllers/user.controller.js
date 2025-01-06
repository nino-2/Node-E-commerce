const userModel = require("../models/user.model");
const displaySignup = (req, res) => {
  res.render("signup", { message });
  message = "";
};
const displayBiodata = (req, res) => {
  console.log(req.body);
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log("it has saved");
      message = "registration  successfull";
      res.redirect("/prod/product");
    })
    .catch((err) => {
      console.log(err, "it didnt save");
      message = "Please fill in all fields";
      res.redirect("/user/signup");
    });
};

module.exports = {
  displaySignup,
  displayBiodata,
};
