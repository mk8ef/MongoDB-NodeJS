
const mongoose  = require('mongoose')
const User      = require('../src/user');
const Comment   = require('../src/comment');
const BlogPost  = require('../src/blogPost');
const assert    = require('assert');

describe('Associations', () => {
    let joe, blogPost, comment;
    
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});
        comment = new Comment({content: 'Congrats on great post'});

        // Make a few very direct associations
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        // Comment isn't an array, has only one author
        comment.user = joe;

        // Save all in parallel
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });


    it('saves a relations between a user and a blogpost', (done) =>{
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great');
                console.log(user.blogPosts[0]);
                done();
            });
    });


    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                // Path means looks into user objects, find blogPost property (like populate)
                path: 'blogPosts',
                // Populate here means, inside of the path, looks further and load up comments
                populate: {
                    path: 'comments',
                    model: 'comment',
                    // You can go deeper, now into comments
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                console.log(user.blogPosts[0].comments[0]);

                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            })
    })

});