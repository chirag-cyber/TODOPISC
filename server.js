const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./models/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
