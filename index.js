const express = require('express');
const app = express();
const PORT = 8000;
const auth = require('./routers/auth');
const codes = require('./routers/codes');

app.use(express.json())
app.use('/api/v1/auth', auth);
app.use('/api/v1/codes', codes)

app.listen(PORT, err => console.log(err ? err : `App listening at http://localhost:${PORT}`));
