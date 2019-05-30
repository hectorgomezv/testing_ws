'use strict';

const { fixEmployeeCommand } = require('../../../../app/domain/use-cases/employee');

describe('[use-cases-tests] [fix-employee]', () => {
  describe('[input validation]', () => {
    it('should fail if no id is passed', async (done) => {
      try {
        await fixEmployeeCommand();
        done.fail();
      } catch (err) {
        expect(err).toMatchObject({
          name: 'ValidationError',
          message: '"id" is required',
        });
        done();
      }
    });

    it('should fail if id is not a string', async () => {
      expect(async () => fixEmployeeCommand({ id: 'id' }))
        .toThrow('"id" must be a string');
    });
  });
});
