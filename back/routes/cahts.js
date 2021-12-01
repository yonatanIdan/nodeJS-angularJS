const express = require('express');
const router = express.Router();
const { ChatController } = require('../controlles/chatController');
const middleware = require('./passport/middleware');

router.post('/messageUser', middleware.checkToken, (req, res) => ChatController.messageUser(req, res));
router.get('/messages', middleware.checkToken, (req, res) => ChatController.messages(req, res));
router.post('/privateMessages', middleware.checkToken, (req, res) => {ChatController.privateMessages(req, res)});
router.post('/messageUpdate', middleware.checkToken, (req, res) => {ChatController.messageUpdate(req, res)});
router.post('/messageDelete', middleware.checkToken, (req, res) => {ChatController.messageDelete(req, res)});

module.exports = router;