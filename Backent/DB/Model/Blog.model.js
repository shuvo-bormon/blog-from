const mongoose = require("mongoose")
const { Schema } = mongoose;

const blogSchema = new Schema({
    tittle:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    admin:{
        type: String,
        require: true
    },
})

module.exports= mongoose.model("blog", blogSchema)