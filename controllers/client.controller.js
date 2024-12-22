const { createClient, updateClient, getAllClients, getCount, getPaginatedData } = require('../models/client.model');

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

// update and Save a new Client
exports.update = async (req, res) => {
  try {
    const clietId = req.params.id;
    const { vUserName, vEmailAddress } = req.body;
    // Validate request
    if (!vUserName) {
      return res.status(400).json({ message: "Company name is required." });
    }
    // Create new client object
    const client = { vUserName, vEmailAddress };
    // Save client to the database
    const data = await updateClient(clietId, client);
    res.status(201).json(data); // Return created client
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "An error occurred while creating the client.", error: error.message });
  }
};

// Retrieve all Clients
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const offset = (page - 1) * limit;


  try {
    const countItem = await getCount();
    console.log('countItem',countItem)
    const data = await getPaginatedData(offset, limit);

    const totalPages = Math.ceil(countItem / limit);

    res.send({
      data,
      currentPage: page,
      totalItems: countItem,
      totalPages: totalPages,
      limit
    })

  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving scoop items." });
  }
};

// exports.findAll__2 = async (req, res) => {
//   try {
//     const data = await getAllClients(); // Retrieve all clients from database
//     res.status(200).json(data); // Return the list of clients
//   } catch (error) {
//     console.error("Error retrieving clients:", error);
//     res.status(500).json({ message: "An error occurred while retrieving clients.", error: error.message });
//   }
// };
