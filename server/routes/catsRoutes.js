const router = require('express').Router();
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  
   users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});

  // const cats = ['Chester', 'Rosey', 'Puma', 'Mr Buttons', 'Aya'];//
  // res.json(cats);

  })
});
  

module.exports = router;