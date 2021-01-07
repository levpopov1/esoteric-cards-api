const Vendor = require('../models/vendor');

function getAllVendors(req, res){
    res.status(200).json(req.items);
}

function getOneVendor(req, res){
    res.status(200).json(req.item);
}

function getAllDecks(req, res){
    res.status(200).json(req.item.decks);
}


async function post(req, res, next){
    try {
        const newVendor = await Vendor.create(req.body);
        return res.status(200).json(newVendor);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllVendors,
    getOneVendor,
    getAllDecks,
    post
}