const assert = require('assert');
const User   = require('../src/user');




describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
            const joe = new User({name: 'Joe', posts: [{title: 'PostTitle'}]});
            
            joe.save()
               .then(() => User.findOne({name: 'Joe'}))
               .then((user) => {
                   assert(user.posts[0].title === 'PostTitle');
                   done();
               });
    });



    it('can add subdocuments to an existing record', (done) => {
        // Can't save just the post itself since there is no post model
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               user.posts.push({title: 'New Post'});
               return user.save();
           })

           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               assert(user.posts[0].title === 'New Post');
               done();
           });
    });


    it(' can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });

        joe.save()
        .then (() => User.findOne({name: 'Joe'}))
        .then((user) => {
                const post = user.posts[0];
                // This remove method is different from calling remove on a model, ex. joe.remove()
                // This doesn't actually remove the subdocument from the DB. You need to manually save() on the model
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
        
    });
});