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
    }});
    router.post('/addQuantity/:itemName', async (req, res) => {
        const { itemName } = req.params;
        const { newQuantity } = req.body;
    
        try {
            // Find the item by name
            const item = await Item.findOne({ name: itemName });
    
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
    
            // Update item quantity using $inc to increment the quantity
            const updatedItem = await Item.findOneAndUpdate(
                { name: itemName },
                { $inc: { quantity: newQuantity } },
                { new: true } // Return the updated item
            );
    
            if (!updatedItem) {
                return res.status(404).json({ message: 'Failed to update item quantity' });
            }
    
            res.status(200).json({ message: 'Item quantity updated successfully', item: updatedItem });
        } catch (error) {
            console.error('Error updating item quantity:', error);
            res.status(500).json({ message: 'Failed to update item quantity' });
        }
    });
    router.post('/pickQuantity/:itemName', async (req, res) => {
        const { itemName } = req.params;
        const { pickedQuantity } = req.body;
    
        try {
            // Find the item by name
            const item = await Item.findOne({ name: itemName });
    
            if (!item) {
                return res.status(404).json({ message: 'No item found with this name' });
            }
    
            // Check if there's enough quantity to pick
            if (item.quantity < pickedQuantity) {
                return res.status(400).json({ message: 'Not enough quantity available for picking' });
            }
    
            // Update item quantity using $inc to decrement the quantity
            const updatedItem = await Item.findOneAndUpdate(
                { name: itemName },
                { $inc: { quantity: -pickedQuantity } }, // Decrement quantity by pickedQuantity
                { new: true } // Return the updated item
            );
    
            if (!updatedItem) {
                return res.status(404).json({ message: 'Failed to update item quantity' });
            }
    
            res.status(200).json({ message: 'Item quantity updated successfully', item: updatedItem });
        } catch (error) {
            console.error('Error updating item quantity:', error);
            res.status(500).json({ message: 'Failed to update item quantity' });
        }
    });
    router.get('/searchByName/:itemName', async (req, res) => {
        const { itemName } = req.params;
        
        try {
            // Find the item by name and update its quantity
            const item = await Item.findOne({ name: itemName });
            if (!item) {
                return res.status(404).json({ message: 'No Item found' });
            }
            
            res.status(200).json({ message: 'Item Found successfully', item });
        } catch (error) {
            console.error('Error in searching:', error);
            res.status(500).json({ message: 'server error' });
        }
    });
    router.post('/deleteByName/:itemName', async (req, res) => {
        const { itemName } = req.params;
        
        try {
            // Find the item by name and update its quantity
            const item = await Item.deleteOne({ name: itemName });
            if (!item) {
                return res.status(404).json({ message: 'Nothing to delete' });
            }
            
            res.status(200).json({ message: 'Entry deleted successfully', item });
        } catch (error) {
            console.error('Error in deleting:', error);
            res.status(500).json({ message: 'server error' });
        }
    });
    router.get('/getAll',async(req,res)=>{
        try{
        const result=await Item.find();
        if(result.length==0)
        {
        res.status(404).json({message:"got nothing"},result);
        }
        else
        res.status(200).json(result)
    }
        catch(error){
         console.error("Error Fetching Items",error);
         res.status(500).json({ message: 'server error' });
        }
    });
    router.get('/needReplen', async (req, res) => {
        try {
            const itemsToReplenish = await Item.find({ quantity: { $lte: 10 } });
    
            if (itemsToReplenish.length === 0) {
                res.status(200).json({ message: "All inventory is present in appropriate amounts" });
            } else {
                res.status(200).json(itemsToReplenish);
            }
        } catch (error) {
            console.error("Replenishment report failed:", error);
            res.status(500).json({ message: 'Server error', error: error });
        }
    });

module.exports = router;
