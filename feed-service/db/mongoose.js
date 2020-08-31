var mongoose = require('mongoose');
const USER_MONGO_ATLAS = 'mongodb+srv://admin:admin@collaborato-ffezi.mongodb.net/collaborato?retryWrites=true&w=majority';
const FEED_MONGO_ATLAS = 'mongodb+srv://admin:admin@cluster0.qkr07.mongodb.net/collaborato?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/collaborato');

// mongoose.connect(FEED_MONGO_ATLAS);

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  poolSize: 50,
  useNewUrlParser: true,
  autoIndex: false
};

const connFeed = mongoose.createConnection(FEED_MONGO_ATLAS, clientOption);

const connUser = mongoose.createConnection(USER_MONGO_ATLAS, clientOption);

module.exports = {connFeed, connUser};
