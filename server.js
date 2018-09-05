//Install express server
const express = require('express');
const path = require('path');

const app = express();

console.log('serve static files');
// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/quickplan'));

app.get('/*', function(req,res) {
    console.log('send files');
    res.sendFile(path.join(__dirname+'/dist/quickplan/index.html'));
});

console.log('start the app');
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);