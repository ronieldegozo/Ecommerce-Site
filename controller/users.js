
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');


exports.userHome = (req, res) => 
    res.render('welcome', {
    pageTitle: 'Home Page',
    path: '/'
})

//About us
exports.aboutUs = (req, res) => 
    res.render('./aboutcontact/about', {
    pageTitle: 'About us',
    path: '/about'
})
//Contact us
exports.contactUs = (req, res) => 
    res.render('./aboutcontact/contact', {
    pageTitle: 'Contact us',
    path: '/contact'
})





exports.getUserRegister = (req, res) => 
    res.render('register', {
    pageTitle: 'Register'
})

exports.getUserLogin = (req, res) => 
    res.render('login', {
    pageTitle: 'Login'
})

exports.userDashboard =  (req, res) =>
    res.render('dashboard', {
    user: req.user,
    pageTitle: 'Dashboard'
})


exports.userRegister = (req,res)=>{
  const {name ,email, password, password2} = req.body;
  let errors = [];
  

  //check required fileds
  if(!name || !email || !password, !password2 ){
      errors.push({ msg: 'Please fill in all fields'});
  }
  
  //check password match
  if(password != password2 ){
      errors.push({ msg: 'Passwords do not match'});
  }

  //check pass length

  if(password.length <6){
      errors.push({ msg: 'Password should be atleast 6 character'});
  }

  if(errors.length >0){
      res.render('register', {
          errors, name, email, password, password2, pageTitle: 'Register'
      });
  }else{
      //validation pass
      User.findOne({email: email})
          .then(user =>{
              if(user){
                  //user exist
                  errors.push({ msg: 'Email is already Taken'});
                  res.render('register', {
                      errors, name, email, password, password2,  pageTitle: 'Register'
                  });
              }else{
                  const newUser = new User({
                      name,
                      email,
                      password
                  });
                  //hashpassword
                  bcrypt.genSalt(10, (err, salt)=>{
                      bcrypt.hash(newUser.password, salt, (err,hash) => {
                          if(err) throw err;

                          //setpassword to hash
                          newUser.password = hash;
                          //save the user
                          newUser.save()
                              .then(user => {
                                  req.flash('success_msg','You are now Registered and can Log in'); //flash message for success user registation
                                  res.redirect('/users/login');
                              })
                              .catch(err => console.log(err));
                      })
                  })
              }
          })
          .catch((err)=>{
              console.log(err);
          });
  }
}, 

exports.userLogin = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true,

    })(req, res, next);
  }

exports.userLogout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }