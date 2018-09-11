const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

/*
 * @route /api/items
 * @desc Get all items
 * @access Public 
 */
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({date: -1})
        res.status(200).json(items);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * @route /api/items
 * @desc Create an Item
 * @access Public 
 */
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name
        });
    
        const saved = await newItem.save();
        res.status(200).json(saved);

    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * @route /api/items/:id
 * @desc Delete an Item
 * @access Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        const response = item.remove();

        if (response) {
            res.status(200).send({success: true});
        }
    } catch (error) {
        res.status(404).send({success: false});
    }
});


module.exports = router;