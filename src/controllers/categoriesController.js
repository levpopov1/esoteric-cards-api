const Category = require('../models/category');
const Vendor = require('../models/vendor');

function getAllCategories(req, res){
    res.status(200).json(req.items);
}

function getOneCategory(req, res){
    res.status(200).json(req.item);
}

async function getAllVendors(req, res){
    console.log(req.item)
    if(req.item.length > 0){
        let vendors = await Vendor.find({id: req.item.vendors})
        res.status(200).json(vendors);
    }
    else{
        res.status(404).json({error: 404, message: "invalid category"});
    }

}

function getAllDecks(req, res){
    res.status(200).json(req.item.decks);
}



async function post(req, res, next){
    try {
        const newCategory = await Category.create(req.body);
        return res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCategories,
    getOneCategory,
    getAllVendors,
    getAllDecks,
    post
}