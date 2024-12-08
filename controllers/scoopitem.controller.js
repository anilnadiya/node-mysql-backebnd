const scoopitem = require('../models/scoopitem.model');

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new Client({
    name: req.body.name,
    email: req.body.email,
  });

  Client.create(user, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    else res.send(data);
  });
};

// Retrieve all scoopitem
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const offset = (page - 1) * limit;


  try {
    const countItem = await scoopitem.getCount();
    const data = await scoopitem.getPaginatedData(offset, limit);

    const totalPages = Math.ceil(countItem / limit);

    res.send({
      data,
      currentPage: page,
      totalItems: countItem,
      totalPages: totalPages,
      limit
    })

  } catch (error) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving scoop items." });
  }

  // scoopitem.getCount((err, count) => {

  //   scoopitem.getPaginatedData(offset, limit, (err, data) => {
  //     if (err)
  //       res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });

  //     const totalPages = Math.ceil(count / limit)

  //     res.send(
  //       {
  //         data,
  //         currentPage: page,
  //         totalItems: count,
  //         totalPages: totalPages,
  //         limit
  //       }
  //     )
  //     //else res.send(data);

  //   });

  // })

};
