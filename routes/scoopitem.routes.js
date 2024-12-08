module.exports = app => {
    const scoopitem = require('../controllers/scoopitem.controller');
  
    // Create a new User
    //app.post("/clients", scoopitem.create);
  
    // Retrieve all clients
    app.get("/scoopitem", scoopitem.findAll);
  };
  