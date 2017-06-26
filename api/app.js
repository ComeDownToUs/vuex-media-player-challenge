const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static');
const playlistsApi = require('./routes/playlists');
const tracksApi = require('./routes/tracks');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(serveStatic(`${__dirname}/public`));

app.use('/playlists', playlistsApi);
app.use('/tracks', tracksApi);

app.listen(3000, () => {
  /* eslint no-console: "off" */
  console.log('Api started on port 3000');
});
