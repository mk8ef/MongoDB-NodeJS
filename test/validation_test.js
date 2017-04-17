const assert = require('assert');
const User   = require('../src/user');



describe('Validating Recrods', () => {
    it('Requires a User Name', () => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')

        
    });



    it('requires a name longer than 2 characters', () => {
        const user = new User({name: 'Al' });
        const validationResult = user.validateSync();
    })



    it('disallows invalid records from being saved', () => {
        const user = new User({ name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.')
            })
    })

});