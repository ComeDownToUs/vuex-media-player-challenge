const Joi = require('joi');
const sharp = require('sharp');
const Guid = require('guid');
const multer = require('multer');
const router = require('express').Router;

const initialData = require('../data/tracks');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const tracksApi = router();

// Create some initial tracks
const inMemoryTracks = initialData;


// Get all tracks
tracksApi.get('/', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: inMemoryTracks })
});

// Get one track
tracksApi.get('/:tracksId', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: inMemoryTracks[req.params.tracksId] });
});

// Create track
tracksApi.post('/', (req, res) => {
  const validationSchema = {
    artist: Joi.string().min(3).max(32).required(),
    artwork_url: Joi.string().min(3).max(96),
    duration: Joi.number().integer().positive().required(),
    track_path: Joi.string().min(3).max(96).required(),
    title: Joi.string().min(3).max(96).required(),
    genre: Joi.string().min(3).max(24).required(),
    rating: Joi.boolean().required()
  };

  const data = {
    artist: req.body.artist,
    artwork_url: req.body.artwork_url,
    duration: req.body.duration,
    track_path: req.body.track_path,
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating
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

    const newTracks = Object.assign({
      id: Guid.raw(),
    }, validatedData);

    inMemoryTracks[newTracks.id] = newTracks;

    res.status(201); // 201 Created
    res.json({
      data: newTracks,
    });
  });
});

// Update tracks
tracksApi.put('/:tracksId', (req, res) => {
  const validationSchema = {
    id: Joi.string().guid().required(),
    artist: Joi.string().min(3).max(32).required(),
    artwork_url: Joi.string().min(3).max(512).required(),
    duration: Joi.number().integer().positive().required(),
    track_path: Joi.string().min(3).max(96).required(),
    title: Joi.string().min(3).max(96).required(),
    genre: Joi.string().min(3).max(24).required(),
    rating: Joi.boolean().required(),
  };

  const data = {
    id: req.params.tracksId,
    artist: req.body.artist,
    artwork_url: req.body.artwork_url,
    duration: req.body.duration,
    track_path: req.body.track_path,
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating
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
      console.log(res);
      return;
    }

    if (!inMemoryTracks[validatedData.id]) {
      res.status(404); // 404 Not found;
      res.json({
        errors: [{
          error: 'Tracks not found',
          status: 404,
        }],
      });
      return;
    }

    inMemoryTracks[validatedData.id] = Object.assign(
      inMemoryTracks[validatedData.id],
      validatedData
    );

    res.status(201); // 201 Created
    res.json({ data: inMemoryTracks[validatedData.id] });
  });
});

// Delete tracks
tracksApi.delete('/:tracksId', (req, res) => {
  const tracksId = req.params.tracksId;

  if (!inMemoryTracks[tracksId]) {
    res.status(404); // 404 Not found;
    res.json({
      errors: [{
        error: 'Tracks not found',
        status: 404,
      }],
    });
    return;
  }

  delete inMemoryTracks[tracksId];

  res.status(204); // 204 No Content
  res.send();
});

module.exports = tracksApi;
