const   express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        mongoose = require('mongoose'),
        config = require('./DB');
mongoose.set('useFindAndModify', false);
    
const mediaRoute = require('./routes/media.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true})
    .then(  () => console.log('Database is connected'), 
            err => console.log(`Can not connect to the database ${err}`)
    );

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', mediaRoute);
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

let port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`App is listening on port ${port}`));