module.exports = app => {
    const clients = require('../controllers/client.controller');
  
    // Create a new User
    app.post("/clients", clients.create);
  
    // Retrieve all clients
    app.get("/clients", clients.findAll);
  };
  