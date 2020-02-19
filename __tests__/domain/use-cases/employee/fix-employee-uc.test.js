'use strict';

const { fixEmployeeCommand } = require('../../../../app/domain/use-cases/employee');

describe('[use-cases-tests] [fix-employee]', () => {
  describe('[input validation]', () => {
    it('should fail if no id is passed', async () => {
      await expect(fixEmployeeCommand())
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" is required',
        });
    });

    it('should fail if id is not a string', async (done) => {
      await expect(fixEmployeeCommand({ id: 'id' }))
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" must be a string',
        });
    });
  });
});
