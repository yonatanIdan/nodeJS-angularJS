
create web application "Company Chat"

using :

nodeJs Express as Server
MongoDB or MySql as Database
Angular as Client
Socket.Io + HTTPS az transport protocols
JWT as security token


Client Application - responsive Web Application consists of 3 main blocks

Authentication - Login page , Routing and Guard depends of user role
User management - New User + possibility of user image, Update User, Delete User (delete means cascade delete all users messages)
Messaging - broadcast and per user. Per user message provide users list and mark who is online right now. Provide all message history also mark unreadable messages.
Server Application - endpoints (routes) for client functionality depends of token roles

Deployment - server rtfs0620.xyz ports 3000-3100 using pm2 and HTTPS

Date of delivery - 20 /06/21