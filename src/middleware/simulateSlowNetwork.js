module.exports = function(timeDelay){
  return function(req, res, next){
    console.log(`Simulating network delay of ${timeDelay/1000} seconds`);
    setTimeout(() => {
      next();
    }, timeDelay);
  };
};
