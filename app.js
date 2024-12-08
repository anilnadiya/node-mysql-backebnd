const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Routes
require('./routes/user.routes')(app);
require('./routes/client.routes')(app);
require('./routes/scoopitem.routes')(app);

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
