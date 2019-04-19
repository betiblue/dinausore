const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const Dinausore = require('../models/dinausore');



// test global
router.get('/ping', (req, res) => {
	res.status(200).json({ msg: 'cool', date: new Date()});
});

router.get('/dinausore', (req, res) => {
	// to see if req.user exists right after registration or login
	console.log('req.user',req.user);
	Dinausore.find()
		.sort({ 'createdOn': -1 })
		.exec()
		.then(dinausore => res.status(200).json(dinausore))
		.catch(err => res.status(500).json({
			message: 'dinausore not found - :(',
			error: err
		}));
});


/* RECHERCHE D'UN DINAUSORE */

router.get('/dinausore/:id', (req, res) => {
	const id = req.params.id;
	Dinausore.findById(id)
		.then(dinausore => res.status(200).json(dinausore))
		.catch(err => res.status(500).json({
			message: `Dinausore with id ${id} not found`,
			error: err
		}));
});

/* AJOUT D'UN DINAUSORE */

router.post('/dinausore', (req, res) => {
    console.log('req.body', req.body);
    const dinausore = new Dinausore (req.body)
		dinausore.save((err, dinausore) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(dinausore);
	});
});

router.delete('/dinausore/:id', (req, res) => {
	// return res.status(500).json({ msg: `TESTING ERROR HANDLING on ${req.params.id} delete`});
	console.log('req.isAuthenticated()', req.isAuthenticated());
	if(!req.isAuthenticated()) {
		return res.status(401).json({ result: 'KO', msg: 'NOT authorized to delete a dinausore' });
	}
	console.log('router.delete / req.user >>>', req.user);
	const id = req.params.id;
	console.log('delete by id', id);
	Dinausore.findByIdAndDelete(id, (err, dinausore) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(202).json({ msg: `dinausore with id ${dinausore._id} deleted`});
	});
});

router.delete('/dinausore', (req, res) => {
	// retrieves the query parameter: http://localhost:3000/api/v1/
	const ids = req.query.ids;
	console.log('query allIds', ids);
	const allIds = ids.split(',').map(id => {
		// casting as a mongoose ObjectId	
		if (id.match(/^[0-9a-fA-F]{24}$/)) {
			return mongoose.Types.ObjectId((id));		 
		}else {
			console.log('id is not valid', id);
			return -1;
		}
	});
	const condition = { _id: { $in: allIds} };
	Dinausore.deleteMany(condition, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(202).json(result);
	});
});


// file upload configuration

/*
router.put('/dinausore/:id', upload.single('image'), (req, res) => {
	const id = req.params.id;
	const conditions = { _id: id};
	const dinausore = {...req.body, image: lastUploadedImageName};
	const update = { $set: dinausore };
	const options = {
		upsert: true,
		new: true
	};
	Dinausore.findOneAndUpdate(conditions, update, options, (err, response) => {
		if(err) return res.status(500).json({ msg: 'update failed', error: err });
		res.status(200).json({ msg: `dinausore with id ${id} updated`, response: response });
	});
}); */

module.exports = router;