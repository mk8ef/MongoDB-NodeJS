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
   // postCount: Number,

   // leaving posts just to have subdocument association
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});



UserSchema.virtual('postCount').get(function(){

    // Instead of referencing joe.posts, use "this"
    return this.posts.length;
});


// Middleware --> this gets executed before any user gets removed
// Pass next --> like done, ensures it's finished
UserSchema.pre('remove', function(next) {
    // this === joe
    const BlogPost = mongoose.model('blogPost');

    // Use in operator to delete everything inside blogposts
    BlogPost.remove({_id: {$in: this.blogPosts}})
        .then(() => next());
    
});




// Creating a collection called User
const User = mongoose.model('user', UserSchema);


// Give access to other files that need to use this schema
module.exports = User;