const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// Rotas
app.use('/api', require('./src/routes'));

app.listen(process.env.APP_PORT);