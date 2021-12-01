const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

class UserService {

    constructor() {
        this.UsersSchema = new Schema({
            name: {
                type: String,
                required: 'Require Name'
            },
            lname: {
                type: String,
                required: 'Require Last Name'
            },
            role: {
                type: String,
                default: 'student',
                enum: ['student', 'teacher', 'admin']
            },
            phone: String,
            email: {
                type: String,
                required: 'Require E-mail',
                unique: true,
            },
            password: String,
            photo: String,
            hash: String,
        });

        // this.TeacherSchema = new Schema({
        //     companyName: {
        //         type: String,
        //         required: true,
        //     },
        //     department: String,
        //     user: {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Users1',
        //     }
        // });

        this.MessageSchema = new Schema({
            Message: {
                type: String,
            },
            date: {
                type: Date,
            },
            toUser: {
                type: [String],
            },
            fromUser: {
                type: String,
                required: true,
            },
            fromUserName: {
                type: String,
            },
            read: {
                type: Boolean,
            },
        });
        //connect shema to DB in mongo
        mongoose.model('Users1', this.UsersSchema);
        this.Users = mongoose.model('Users1');
        // mongoose.model('Companies', this.TeacherSchema);
        // this.Teachers = mongoose.model('Companies');
        mongoose.model('Message', this.MessageSchema);
        this.AllMessages = mongoose.model('Message');
    }

    messageUser(message, callback) {
        const messageUser = new this.AllMessages({
            'Message': message.message,
            'date': message.date,
            'fromUser': message.emailSend,
            'fromUserName': message.nameSend,
            'toUser': message.get,
            'read': message.read,
        });
        messageUser.save()
        .then(() =>{callback()})
        .catch((err) => {
            console.log('error', err);
            callback(err, null)
        });
    }

    messageUpdate(messages, callback) {
        this.AllMessages.updateMany({
            'toUser': [messages.toUser],
            'fromUser': messages.fromUser,
            'read': false,
        },{
            'read': true,
        })
        .then(() =>{callback()})
        .catch((err) => {
            console.log('error', err);
            callback(err, null)
        });
    }

    messages(callback) {
        this.AllMessages.find({toUser: ['public']},(err, usr) => {
            if (err) {
                console.log('error', err);
                callback(err, null);
            } else {
                callback(null, usr);
            }
        });
    }

    privateMessages(user, callback) {
        this.AllMessages.find({
                $or: [
                    {toUser: [user.toUser], fromUser: user.fromUser},
                    {toUser: [user.fromUser], fromUser: user.toUser}
                ]
            })
            .then(data => callback(null, data))
            .catch(err => {
                console.log('error', err);
                callback(err, null)
            });
            // ▓▓▓▓▓▓▓ dont do it like this ▓▓▓▓▓▓▓
            // (err, usr) => {
            //     if (err) {
            //         console.log('error', err);
            //         callback(err, null);
            //     } else {
            //         console.log('AllMessages.find', usr);
            //         callback(null, usr);
            //     }
            // }
            //▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    }

    messageDelete = (user, callback) => {
        this.AllMessages.deleteMany({
                'fromUser': user.emailSend,
            },
        )            
        .then(data => callback(null, data))
        .catch(err => {
            console.log('error', err);
            callback(err, null)
        });
    }

    users(callback) {
        this.Users.find({},{_id: 0, password: 0 , hash: 0}, (err, usr) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, usr);
            }
        })
    }

    deleteUser = (emailUser, callback) => {
        this.Users.deleteOne({
                'email': emailUser
            },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, usr);
            }
        );
    }

    newUser(user, callback) {
        let hash = bcrypt.hashSync(user.password, 10);
        const finalUser = new this.Users({
            'name': user.name,
            'lname': user.lname,
            'role': user.role,
            'phone': user.phone,
            'email': user.email,
            // 'password': user.password,
            'photo': user.photo,
            'hash': hash
        });
        finalUser.save()
        // .then((usr) => {
        //     if (user.company) {
        //         const Teacher = new this.Teachers({
        //             companyName: user.company,
        //             department: user.department,
        //             user: usr._id,
        //         });
        //         Teacher.save();
        //         callback(null, usr);
        //         console.log('New User:', user);
        //     } else callback(null, usr);
        // })
        .catch((err) => {
            callback(err, null)
        });
    }

    updateUser = (user, callback) => {
        let hash = bcrypt.hashSync(user.password, 10);
        this.Users.updateOne({
                'email': user.email,
            }, {
                'name': user.name,
                'lname': user.lname,
                'role': user.role,
                'phone': user.phone,
                'password': user.password,
                'photo': user.photo,
                'hash': hash,
            },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, usr);
            }
        );
    }

    loginUser(username, callback){
        this.Users.findOne({ email : username },{_id: 0}, (err, usr) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, usr);
            }
        })
    }

}

module.exports = {
    userService: new UserService()
}