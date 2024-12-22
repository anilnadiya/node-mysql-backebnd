const db = require('../config/db.config');

function createClient(newClient) {
  const sql = "INSERT INTO tms_client SET ?";
  return new Promise((resolve, reject) => {
    db.query(sql, newClient, (err, result) => {
      if (err) {
        console.error("Error creating client:", err);
        return reject(err);
      }
      resolve({ id: result.insertId, ...newClient });
    });
  });
}

function updateClient(clientId, updateClientData) {
  const sql = " UPDATE tms_client SET ? WHERE iClientId  ? ";
  return new Promise((resolve, reject) => {
    db.query(sql, clientId, updateClient, (err, result) => {
      if (err) {
        console.error("Error creating client:", err);
        return reject(err);
      }
      resolve({ id: result.insertId, ...updateClientData });
    });
  });
}

/**
 * Retrieves all clients from the database.
 * @returns {Promise<Array>} - A promise that resolves with the list of all clients.
 */
function getAllClients() {
  const sql = "SELECT * FROM tms_client ORDER BY iClientId DESC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error retrieving clients:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function getCount(){
  try {
    const [rows] = await db.promise().query(" select COUNT(*) as total from tms_client ");
    return rows[0].total;
  } catch (error) {
    throw new Error(error);
  }
}

async function getPaginatedData(offset, limit){
  try {
    const [rows] = await db.promise().query(" select * from tms_client ORDER BY iClientId DESC LIMIT ? OFFSET ? ", [limit, offset] );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createClient,
  getAllClients,
  getCount,
  getPaginatedData

};
