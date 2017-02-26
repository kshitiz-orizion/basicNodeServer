var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var leaders = require('../models/leadership');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function (req, res, next) {
    leaders.find({}, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.post(function (req, res, next) {
    leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('leader created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(function (req, res, next) {
    leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(function (req, res, next) {
    s.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(function (req, res, next) {
    leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err,leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function (req, res, next) {
    leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});
leaderRouter.route('/:leaderId/comments')
.get(function (req, res, next) {
    leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader.comments);
    });
})

.post(function (req, res, next) {
    leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, leader) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(leader);
        });
    });
})

.delete(function (req, res, next) {
    leaders.findById(req.params.leaderId, function (err,leader) {
        if (err) throw err;
        for (var i = (leader.comments.length - 1); i >= 0; i--) {
            leader.comments.id(leader.comments[i]._id).remove();
        }
        leader.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

leaderRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        leader.comments.id(req.params.commentId).remove();
        leader.comments.push(req.body);
        leader.save(function (err, leader) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(leader);
        });
    });
})

.delete(function (req, res, next) {
    leaders.findById(req.params.dishId, function (err, dish) {
        leader.comments.id(req.params.commentId).remove();
        leader.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = leaderRouter;