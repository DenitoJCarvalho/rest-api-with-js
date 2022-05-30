const { check, validationResult } = require('express-validator');

let NeDB = require('nedb');
let db = new NeDB({
  filename: 'users.db',
  autoload: true
});

module.exports = (app) => {

  let route = app.route('/users');

  route.get((req, res) => {

    db.find({})
      .sort({ name: 1 })
      .exec((err, users) => {
        if (err) {
          app.utils.sort({ name:1 }).exec((err, req, res));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ users });
        }
      });
  });
  
  route.post([
    check("name", "O nome é obrigatório.").notEmpty(),
    check("email", "Email inválido.").notEmpty().isEmail()
  ], (req, res) => {
   
    const error = validationResult(req);

    db.insert(req.body, (err, user) => {
      if(err) {
        app.utils.sort({ name:1 }).exec((err, req, res));
      } else {
        res.status(200).json(user);
      }
    });
  });
  
  let routeId = app.route('/users/:Id');
  
  routeId.get((req, res) => {
    db.findOne({_id: req.params.Id })
      .exec((err, user) => {
        if(err) {
          app.utils.sort({ name:1 }).exec((err, req, res));
        } else {
          res.status(200).json(user);
        }
    });
  });

  routeId.put([
    check("name", "O nome é obrigatório.").notEmpty(),
    check("email", "Email inválido.").notEmpty().isEmail()
  ], (req, res) => {
    
    const error = validationResult(req);

    db.update({_id: req.params.Id}, req.body, err => {
      if(err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body));
      }
    })
  });
 
  routeId.delete((req, res) => {
    db.remove({_id: req.params.Id}, {}, err => {
      if(err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(req.params);
      }
    });
  });
}