const Item = require('../models/item');
const imageKit = require("../util/imageKit");


exports.postItems = async (req, res) => {
    try {
        const imageUpload = await imageKit.upload({
            file: req.file.buffer.toString("base64"),
            fileName: req.file.originalname,
            folder: "posttest",
            useUniqueFileName: false,
        });

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            photoProduct: [
                {
                    fileName: imageUpload.name,
                    filePath: imageUpload.url
                }
            ]
        });

        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
        res.json(item);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Update item
exports.updateItems = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }

        if (req.body.name != null) {
            item.name = req.body.name;
        }
        if (req.body.description != null) {
            item.description = req.body.description;
        }
        if (req.body.price != null) {
            item.price = req.body.price;
        }

        // Handle file upload
        if (req.file) {
            const imageUpload = await imageKit.upload({
                file: req.file.buffer.toString("base64"),
                fileName: req.file.originalname,
                folder: "posttest",
                useUniqueFileName: false,
            });

            item.photoProduct.push({
                fileName: imageUpload.name,
                filePath: imageUpload.url
            });
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }

        await item.remove();
        res.json({ message: 'Deleted Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
