const assert = require('assert');
const User   = require('../src/user');


describe('Reading users out of the database', () => {
   // declare variable ahead of time so you can use
   // inside the it block
   let joe;


   // Make sure a joe record is inserted before looking for one
   beforeEach((done) => {
       joe = new User({name: 'Joe'});
       joe.save()
            .then(() => done());

   });


    it('find all users with a name of joe', (done) => {
        User.find({name: 'Joe'})
        .then((users) =>{

            console.log(users[0]._id);
            console.log(joe._id);
            assert(users[0]._id.toString() === joe._id.toString());
            //console.log(users);
            done();
        });
    });


 it('find a user with a particular ID', (done) => {
     User.findOne({_id: joe._id})
     .then((user) => {
         assert(user.name === 'Joe');
         done();
     });
     
 });

})