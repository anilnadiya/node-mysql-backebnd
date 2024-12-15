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

module.exports = {
  createClient,
  getAllClients,
};
