const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object and post to the MongoDB database named "React-Noter"
      if (db) {
        _db = db.db("React-Noter");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
