'use strict';

const { fixEmployeeCommand } = require('../../../../app/domain/use-cases/employee');
const { EmployeeRepository } = require('../../../../app/domain/repositories');

const EMPLOYEE = {
  id: 'id',
  email: 'employee@email.com',
  salary: 10000000,
};

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

    it('should fail if id is not a string', async (done) => {
      try {
        await fixEmployeeCommand({ id: 'id' });
        done.fail();
      } catch (err) {
        expect(err).toMatchObject({
          name: 'ValidationError',
          message: '"id" must be a string',
        });
        done();
      }
    });
  });

  describe('[business logic tests]', () => {
    beforeEach(() => {
      EmployeeRepository.findById = jest.fn(() => EMPLOYEE);
    });

    afterEach(() => {
      EmployeeRepository.findById.mockReset();
    });

    it("should fail if the repository can't find the employee", async (done) => {
      EmployeeRepository.findById = jest.fn(() => null);
      try {
        await fixEmployeeCommand('whatever');
        done.fail();
      } catch (err) {
        expect(err).toMatchObject({
          name: 'Error',
          message: 'Employee not found',
        });
        done();
      }
    });
  });
});
