'use strict';

const { fixEmployee } = require('../../../../../app/domain/use-cases/employee');

describe('[use-cases-tests] [fix-employee]', () => {
  describe('[input validation]', () => {
    it('should fail if no id is passed', async () => {
      await expect(fixEmployee())
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" is required',
        });
    });

    it('should fail if id is not a string', async () => {
      await expect(fixEmployee({ id: 'id' }))
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" must be a string',
        });
    });
  });
});
