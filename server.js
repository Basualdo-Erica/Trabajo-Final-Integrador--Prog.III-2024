const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/db'); 
const complaintRoutes = require('./routes/complaintRoutes'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); 

app.use('/', complaintRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
