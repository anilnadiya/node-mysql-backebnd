module.exports = app => {
    const clients = require('../controllers/client.controller');
  
    // Create a new User
    app.post("/clients", clients.create);
    // update User
    app.put("/clients/:id", clients.update);
  
    // Retrieve all clients
    app.get("/clients", clients.findAll);
  };
  