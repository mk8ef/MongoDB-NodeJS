const mongoose   = require('mongoose');
const PostSchema = require('./post')
const Schema     = mongoose.Schema;


const UserSchema = new Schema ({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.'],
    },
    postCount: Number,
    posts: [PostSchema]

});



// Create posts schema --> posts will have a schema, but not it's own model, since it's a part of the User Model




// Creating a collection called User
const User = mongoose.model('user', UserSchema);


// Give access to other files that need to use this schema
module.exports = User;