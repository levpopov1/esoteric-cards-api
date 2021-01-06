const Category = require('../models/category');

function getAllCategories(req, res){
    res.status(200).json(req.items);
}

function getOneCategory(req, res){
    res.status(200).json(req.item);
}

function getAllVendors(req, res){
    res.status(200).json(req.items.vendors);
}

function getAllDecks(req, res){
    res.status(200).json(req.items.decks);
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