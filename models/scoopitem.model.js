const db = require('../config/db.config');

// User Model
const Scoopitem = function(user) {
  this.name = user.name;
  this.email = user.email;
};

// Create a new User
Scoopitem.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Get All Scoopitem count
Scoopitem.getCount = async () => {
  try {
    const [rows] = await db.promise().query("SELECT count(*) as total FROM tms_items");
    return rows[0].total;
  } catch (err) {
    throw new Error(err);
  }

  // return new Promise( (resolve, reject)=>{

  //   db.query("SELECT count(*) as total FROM tms_items", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       //result(err, null);
  //       reject(err)
  //       return;
  //     }
  //     //result(null, res[0].total);
  //     resolve(res[0].total)
  //   });
  

  // })
};

// Get All Scoopitem
Scoopitem.getPaginatedData = async (offset, limit) => {
  try {
    const [rows] = await db.promise().query( "SELECT * FROM tms_items LIMIT ? OFFSET ?", [limit, offset] );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
  //return new Promise( (resolve, reject)=> {
  //   db.query("SELECT * FROM tms_items LIMIT ? OFFSET ?", [limit, offset], (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       reject(err)
  //       //result(err, null);
  //       return;
  //     }
  //     resolve(res)
  //     //result(null, res);
  //   });
  // })
};


Scoopitem.getAll = (result) => {
  db.query("SELECT * FROM tms_items", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};


module.exports = Scoopitem;
