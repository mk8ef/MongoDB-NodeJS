const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



before((done) => {
    mongoose.connect('mongodb://localhost/users_test')
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});



beforeEach((done) => {
    // Use all lowercase
    const {users, comments, blogposts} = mongoose.connection.collections;
    // Place call back function once all users are actually dropped
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    })
});