var express= require('express');
var router = express.Router();
var bodyparser = require('body-parser')
var Dinausore = require('../models/dataSchema');

/* ROUTE CREATION DUN DINAUSORE */

router.post('/create', (req,res,next)=>{
    var newDinausore = new Dinausore({   
        login:req.body.login,
        pwd:req.body.pwd,
        age:req.body.age,
        race:req.body.race,
        famille:req.body.famille,
        nourriture: req.body.nourriture, 
      
    })

    newDinausore.save((err,dinausore) =>{
        if (err)
        res.status(500).json({errmsq: err});
        res.status(200).json({msg: dinausore});
    
    })
    
});

/* ROUTE LOGIN MOT DE PASSE */

router.post('/login', (req,res,next)=>{
    var newDinausore = new Dinausore({   
        login:req.body.login,
        pwd:req.body.pwd,
         
      
    })
    
});



/* ROUTE AFFICHAGE DE TOUTS LES  DINAUSORES */

router.get('/read', (req,res,next)=>{
    Dinausore.find({},(err,dinausores) =>{
        if (err)
        res.status(500).json({errmsq: err});
        res.status(200).json({msg: dinausores});
  
    })
    
});

/* ROUTE MODIFICATION DUN DINAUSORE */

router.put('/update', (req,res,next)=>{

    Dinausore.findById(req.body._id, (err,dinausore) =>{
        if (err)
        res.status(500).json({errmsq: err});
       dinausore.login = req.body.login;
       dinausore.pwd = req.body.pwd;
       dinausore.race = req.body.race;
       dinausore.age = req.body.age;
       dinausore.famille = req.body.famille;
       dinausore.nourriture = req.body.nourriture;
       dinausore.save((err,dinausore)=>{
        if (err)
        res.status(500).json({errmsq: err});
        res.status(200).json({msg: dinausores});
  
    })
    
})

})



/* ROUTE SUPPRESSION DUN DINAUSORE */

router.delete('/delete/:id', (req,res,next)=>{
    Dinausore.finOneAndRemove({_id:req.params._id}, (err, dinausore) =>{
        if (err)
        res.status(500).json({errmsq: err});
        res.status(200).json({msg: dinausores});

    })
    res.status(200).json({msg: 'delete request is working'})
});



module.export = router;