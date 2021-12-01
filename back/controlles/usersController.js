const { userService } = require('../services/userService');
class UsersController {

    constructor() {}

    users(req, res) {
        userService.users((err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }
    deleteUser(req, res) {
        userService.deleteUser(req.body.email, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(200, data);
        });
    }
    newUser(req, res) {
        console.log('req.body new user: ',req.body);
        userService.newUser(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }
    updateUser(req, res) {
        // console.log('req.body update:',req.body);
        userService.updateUser(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }

}

module.exports = {
    usersController: new UsersController()
}