const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
})); // permite acesso a api de outros domínios

// Rotas
app.use('/api', require('./src/routes'));

app.listen(3007);