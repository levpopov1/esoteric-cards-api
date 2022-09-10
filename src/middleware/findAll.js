module.exports = function (Model) {
  return async function (req, res, next) {
    try {
      req.items = await Model.find({});
      next();
    } catch (error) {
      next(error);
    }
  };
};
