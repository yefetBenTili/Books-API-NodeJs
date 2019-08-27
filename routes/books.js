const express = require('express');
const router = express.Router() ;
const Joi = require('Joi');

  
books = [{id:1 , name: 'Allen' , Age: 26},{id:2, name:"jhon", age: 26}]


    router.get('/' ,(req,res) => {
        res.send(books);
    })
    
    
    router.get('/:id' , (req,res) => {
        const book = books.find(c => c.id === parseInt(req.params.id))
        console.log(book)
        if(!book) {
           return res.status(400).send('the couse is not avaible') ;}
        else{
            res.send(book) ;
        }
    })
    
    
    router.post('/' , (req,res) => {
    const {error} = ValidateBook(req.body) ;
    if (error){
     return res.status(400).send(result.error.details[0].message);
       }
    const book = {id: books.length + 1 , name: req.body.name } ;
    books.push(book);
    res.send(books);
    }) ;
    
    
    router.put('/:id', (req, res)  => {
    const book = books.find(c => c.id === parseInt(req.params.id))
    console.log(book)
    if(!book) {
      return res.status(400).send('the couse is not avaible') ; 
    }
    
    const {error} = ValidateBook(req.body) ;
     if (error){
        return res.status(400).send(error.details[0].message);    
    }
    
    book.name = req.body.name;
    res.send(book);
    
    }) ;
    
    
    router.delete('/:id', (req,res) => {
        // check if the book exist
        const book = books.find(c => c.id === parseInt(req.params.id))
        console.log(book)
        if(!book) {
           return res.status(400).send('the couse is not avaible') ;}
      // get index and delete 
      const index = books.indexOf(book) ;
      books.splice(index ,1);
      res.send(book);
    
    })
    
    
    function ValidateBook(book){
    const schema = {name: Joi.string().min(3).required() , age: Joi.any()  };
     return Joi.validate(book , schema);
    }


    module.exports = router;