const jwt = require('jsonwebtoken')

exports.authentication = function (req, res, next) {
    try {
      const token = req.headers["authorization"]; 
  
      let splitToken = token.split(" ");
      
    jwt.verify(splitToken[1], "LOGINASSIGNMENT", function (err, data) {
        if (err) {
            return res.status(400).send({ status: false, message: err.message });
          } else {
            req.userId = data.userId;
            next();
          }
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  