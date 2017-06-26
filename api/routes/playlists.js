const Joi = require('joi');
const sharp = require('sharp');
const Guid = require('guid');
const multer = require('multer');
const router = require('express').Router;

const initialData = require('../data/playlists');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const playlistsApi = router();

// Create some initial playlists
const inMemoryPlaylists = initialData;


// Get all playlists
playlistsApi.get('/', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: inMemoryPlaylists });
});

// Get one playlist
playlistsApi.get('/:playlistId', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: inMemoryPlaylists[req.params.playlistId] });
});

// Create playlists
playlistsApi.post('/', (req, res) => {
  const validationSchema = {
    name: Joi.string().min(3).max(320).required(),
    description: Joi.string().min(3).max(32),
    tracks: Joi.array(),
  };

  const data = {
    name: req.body.name,
    description: req.body.description,
    tracks: req.body.tracks,
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    const newPlaylist = Object.assign({
      id: Guid.raw()
    }, validatedData);

    inMemoryPlaylists[newPlaylist.id] = newPlaylist;

    res.status(201); // 201 Created
    res.json({
      data: newPlaylist,
    });
  });
});

// Update playlist
playlistsApi.put('/:playlistId', (req, res) => {
  const validationSchema = {
    id: Joi.string().guid().required(),
    name: Joi.string().min(3).max(32).required(),
    tracks: Joi.array()
  };

  const data = {
    id: req.params.playlistId,
    name: req.body.name,
    tracks: req.body.tracks
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    if (!inMemoryPlaylists[validatedData.id]) {
      res.status(404); // 404 Not found;
      res.json({
        errors: [{
          error: 'Playlist not found',
          status: 404,
        }],
      });
      return;
    }

    inMemoryPlaylists[validatedData.id] = Object.assign(
      inMemoryPlaylists[validatedData.id],
      validatedData
    );

    res.status(201); // 201 Created
    res.json({ data: inMemoryPlaylists[validatedData.id] });
  });
});

// Delete playlist
playlistsApi.delete('/:playlistId', (req, res) => {
  const playlistId = req.params.playlistId;

  if (!inMemoryPlaylists[playlistId]) {
    res.status(404); // 404 Not found;
    res.json({
      errors: [{
        error: 'Playlist not found',
        status: 404,
      }],
    });
    return;
  }

  delete inMemoryPlaylists[playlistId];

  res.status(204); // 204 No Content
  res.send();
});

module.exports = playlistsApi;
