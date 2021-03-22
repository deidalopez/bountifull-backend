const mongoose = require('mongoose');
const ATLAS_USERNAME = process.env.ATLAS_USERNAME;
const ATLAS_PASSWORD = process.env.ATLAS_PASSWORD;

mongoose.connect(`mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@bountifull.21g8e.mongodb.net/bountifull?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
    (err) => {
        if (err) {
            console.log(`Sorry, something went wrong! ${err}`);
        } else {
            console.log("Connected to database");
        }
    }
)

module.exports = mongoose;