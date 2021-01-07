module.exports = function(Model, param){
    return async function(req, res, next){
        try {
            req.item = await Model.find({[param]: req.params[param]});
            next();
        } catch (error) {
            next(error);
        }
    };
};
