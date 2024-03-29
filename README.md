## DevShare

### Description

💻 DevShare is a Realtime Code Editor and a collaboration tool built with React, Node, Express and Socket.io. It uses web sockets for syncing code and setting up connection between client and server.

A user a create a new room, share room ID with other peers, work on code real time. The Editor has syntax highlighting, indentation, autocomplete and brace matching functionality.

Currently the Project only supports Code Editor which was implemented during the build phase of hackathon, in the future compiler can be added, other features like real time chat, video-call, etc can be added.

### Usage

For Setting up the project

> Clone the repository

`git clone <URL>`

> Add environment Variables in the .env file

Add .env file in root directory

```
REACT_APP_BACKEND_URL=http://localhost:5000/
```

> Install all the packages

```
npm install
```

> To start server -

```
npm start
```

Open the App on `http://localhost:5000/`

### Tech Stack / Tools Used :

- Reactjs
- Nodejs
- Expressjs
- Socket.io
