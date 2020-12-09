var express = require("express");
const { response } = require("../app");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
const userHelpers = require("../helpers/user-helpers");
/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user
  console.log(user);
  productHelpers.getAllProducts().then((products) => {
    res.render("users/view-products", {products, user});
  })
});
router.get("/login", (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
  res.render("users/login",{"loginErr":req.session.loginErr});
    req.session.loginErr = false
}
});
router.get("/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/signup", (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log("NEW USER CREATED",response);
    res.redirect('/login')
  });
});
router.post("/login", (req,res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
     
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
      // console.log(req.session.user)
    } else {
      req.session.loginErr ="Invalid Username Or Password"
      res.redirect("/login");
    }
  });
});
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect("/")
})
module.exports = router;
