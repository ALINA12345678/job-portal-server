const mongoose = require('mongoose');

const connection_string = process.env.connection_string;

mongoose.connect(connection_string).then(() => {
    console.log("job-portal server successfully connected to MongoDB");
}).catch((err) => {
    console.log("mongodb connection failed...", err);
});
