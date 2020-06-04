const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()) // permite acesso a api de outros domínios

// Rotas
app.use('/api', require('./src/routes'));

app.listen(3007);