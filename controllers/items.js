const Item = require('../models/item');


exports.postItems  = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getItemById = getItem, (req, res) => {
    res.json(res.item);
}

exports.updateItems = getItem, async (req, res) => {

    
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.price != null) {
        res.item.price = req.body.price;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete an item
exports.deleteItem = getItem, async (req, res) => {
    try {
        const deletedItem = await Item.deleteOne({ _id: res.item._id });
        await deletedItem
        res.json({ message: 'Deleted Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

