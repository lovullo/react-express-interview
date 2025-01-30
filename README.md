# Simple React App

There is a client and a server that communicate to make up this app.

Both are configured with hot reloading so when a file is saved, they should
automatically recompile and load the newest version.

## Client

Install dependencies with:
```
npm i
```

Run the React client with:
```sh
npm run dev
```

The client should be accessible here:
http://localhost:3000/

Tests can be run with:
```sh
npm run test
```

## Server

Install dependencies with:
```
npm i
```

Run the Express server with:
```sh
npm run dev
```

Tests can be run with:
```sh
npm run test
```

The server is running internally (in the docker container) on port 8080 but that
will not be forwarded to the browser in your host machine.

Run this VSCode command (Ctrl + Shift + P) to see what port 8080 was forwarded
to:
```
View: Toggle Ports
```