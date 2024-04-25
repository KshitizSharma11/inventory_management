// itemRoutes.js

const express = require('express');
const router = express.Router();
const Item = require('../model/item');

// Route to create a new item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new Item(data);
        console.log(newItem);
        const savedItem = await newItem.save();
        console.log('New item saved:', savedItem);
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json({ message: 'Failed to save item' });
    }
});

module.exports = router;
