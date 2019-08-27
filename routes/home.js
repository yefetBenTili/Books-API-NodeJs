const express = require('express');
const router = express.Router() ;

router.get('', (req ,res) => {
    res.render('index.pug' ,{title: "Books app" , message:"Books list"})
    });


module.exports = router ;                   