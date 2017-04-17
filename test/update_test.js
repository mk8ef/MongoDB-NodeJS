const assert = require('assert');
const User   = require('../src/user');


describe('Updating Records', () => {
    let joe;

    beforeEach((done)=> {
        joe = new User({name: 'Joe', postCount: 0});
        joe.save()
           .then(() => done());
    });


    // joe.save() returns a promise, we hand that promise off to this function
    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex')
                done();
            });
    }


    it('instance type using set and save', (done) => {
        // If  you ever want to update a instance, use SET()
        // This is only done in memory on the model - NOT saved to the db
        joe.set('name', 'Alex')
        console.log(joe);
        // use SAVE to save to the db
        joe.save()
            // Check it by getting entire list of users
            // and assert that only 1 is named Alex
            // pass empty object in find to use no filter criteria
            .then(() => User.find({}))
            .then((users) => {
                // User.find({}) returns a "users" object
                // now check that object
                assert(users.length === 1);
                assert(users[0].name === 'Alex')
                done();
        });
    });



    it('a model instance update', (done) => {
        assertName(joe.update({name: 'Alex'}), done)
    })



    it('A model class can update', (done) => {
       assertName(
        User.update({name: 'Joe'}, {name: 'Alex'}),
        done
       );
    });



    it('A model class can update one record', (done) => {
       assertName( 
        User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
        done
        );


    });



    it('A model class can find a record with an ID and update', (done) => {
        assertName( 
         User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
         done
        );


    });




    it('Increment user point count by 1', () => {
    // Class based update - so working on the entire group
    // Use mongo operators instead of looping through the collection
        User.update({name: 'Joe', }, {$inc: {postCount: 1}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 1)
            })
    })
    






});