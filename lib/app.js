const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/blogs', require('./routes/blog'));
app.use('/api/v1/comments', require('./routes/comment'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
