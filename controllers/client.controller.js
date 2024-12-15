const { createClient, getAllClients } = require('../models/client.model');

// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    const { vUserName, vEmailAddress } = req.body;

    // Validate request
    if (!vUserName) {
      return res.status(400).json({ message: "Company name is required." });
    }

    // Create new client object
    const client = { vUserName, vEmailAddress };

    // Save client to the database
    const data = await createClient(client);

    res.status(201).json(data); // Return created client
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "An error occurred while creating the client.", error: error.message });
  }
};

// Retrieve all Clients
exports.findAll = async (req, res) => {
  try {
    const data = await getAllClients(); // Retrieve all clients from database
    res.status(200).json(data); // Return the list of clients
  } catch (error) {
    console.error("Error retrieving clients:", error);
    res.status(500).json({ message: "An error occurred while retrieving clients.", error: error.message });
  }
};
