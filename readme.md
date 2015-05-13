## User scenario

See https://docs.google.com/document/d/1MKLW7L0pn-7JRdGMm6QXIUtK-KzJmvdIuXIuR71i5z4/edit

### Run the server.
`node restifyApp.js`

Then go to `http://localhost:2222`, there is nothing to be done there, you need to use POSTMAN to send requests to `http://localhost:2222/api/experimental/vlans`.

### Run tests

Move to the `lib` folder: `cd lib` and run `mocha --recursive`. You need to have the server running for them to pass.

`cd lib && mocha --recursive`