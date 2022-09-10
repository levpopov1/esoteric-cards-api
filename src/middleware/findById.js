module.exports = function (Model) {
  return async function (req, res, next) {
    try {
      req.item = await Model.findById(req.params.id);
      next();
    } catch (error) {
      next(error);
    }
  };
};
