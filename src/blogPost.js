const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;


const BlogPostSchema = new Schema({
    title: String,
    content: String,
    // Referencing a collection is different than
    // reference to an sub-documents
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'comment'
     }]


});



const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;

