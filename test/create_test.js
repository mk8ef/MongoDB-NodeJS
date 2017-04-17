
const assert = require('assert');
const User   = require('../src/user');


describe('Creating Records', () => {
    // Same structure as above
    it('Saves a User', (done) => {
        //assert(1 + 1 === 2);
        const joe = new User({name: 'Joe'});

        // Since it takes some time to save, a save call
        // will return a promise -> when the promise resolves
        // joe has been inserted
        joe.save()
           .then(() => {
               // Has joe been saved
               assert(!joe.isNew);
               done();
           });
    });
});

