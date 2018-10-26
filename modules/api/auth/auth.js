const authorize = (req, res, next) => {
  console.log(req.session);
    if (!req.session || !req.session.user) {
      res.status(401).send("Unauthorized!");
    } else next();
  };
  
  module.exports = { authorize };