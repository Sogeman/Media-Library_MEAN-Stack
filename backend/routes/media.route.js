// TODO for later: separate routes for books, movies and games

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const mediaRoutes = express.Router();

let Media = require('../models/Media');


mediaRoutes.get('', (req, res) => {
    Media.find().collation({locale: 'de', strength: 2}).sort({'media_format': 1, 'media_name': 1}).exec()
        .then(media => {
            res.status(200).json({
                status: 'success',
                data: media
            });
        })
        .catch(err => {
            res.status(405).json({
                status: 'error',
                data: err.message
            })
        });
});

mediaRoutes.get('/:id', (req, res) => {
    let id = req.params.id;
    Media.findById(id).exec()
        .then(media => {
            res.status(200).json({
                status: 'success',
                data: media
            });
        })
        .catch(err => {
            res.status(405).json({
                status: 'error',
                data: err.message
            });
        });
});

mediaRoutes.get('/media/filter', (req, res) => {
    let filter = {};
    if (req.query.filter) {
        filter['media_format'] = req.query.filter;
    }
    Media.find(filter).collation({locale: 'de', strength: 2}).sort({'media_name': 1}).exec()
        .then(media => {
            res.status(200).json({
                status: 'success',
                data: media
            });
        })
        .catch(err => {
            res.status(405).json({
                status: 'error',
                data: err.message
            });
        });
});

mediaRoutes.post('/add', (req, res) => {
    let media = new Media(req.body);
    media.save()
        .then(media => {
            res.status(200).json({
                status: 'success',
                data: media
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                data: 'unable to save to database'
            });
        });
});

mediaRoutes.put('/:id', (req, res) => {
    let id = req.params.id;
    let updatedMedia = req.body;
    Media.findByIdAndUpdate(id, updatedMedia, { new: true }).exec()
        .then(media => {
            res.status(200).json({
                status: 'success',
                data: media
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                data: err.message
            });
        });
});

mediaRoutes.delete('/:id', (req, res) => {
    let id = req.params.id;
    Media.findByIdAndRemove(id).exec()
        .then(data => {
            res.status(200).json({
                status: 'success',
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                data: err.message
            });
        });
});

module.exports = mediaRoutes;