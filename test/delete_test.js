const assert = require('assert');
const User   = require('../src/user');


describe('Deleting a user', () => {
    let joe;

    beforeEach((done)=> {
        joe = new User({name: 'Joe'});
        joe.save()
           .then(() => done());
    });


    it('model instance remove', (done) => {
        // joe instance
        joe.remove()
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               assert(user === null);
               done();
           });
    });

    it('class method remove', (done) => {
        // Class User remove --> Remove many records with a given criteria
        // 
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
           });
    });

    it('class method findAndRemove', (done) => {
        // Again, class method, so pass in User model
        User.findOneAndRemove({ name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
           });

    });

    it('class method findByIDAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
           });
    });
});