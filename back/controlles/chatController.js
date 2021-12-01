const { userService } = require('../services/userService');

class ChatController {

    constructor() {}

    messageUser(req, res) {
        userService.messageUser(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
            // res.end("ok");
        });
    }

    messages(req, res) {
        userService.messages((err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }

    privateMessages(req, res) {
        userService.privateMessages(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }

    messageUpdate(req, res) {
        userService.messageUpdate(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }

    messageDelete(req, res) {
        userService.messageDelete(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }
}

module.exports = {
    ChatController: new ChatController()
}