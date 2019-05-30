'use strict';

const { fixEmployeeCommand } = require('../../../../app/domain/use-cases/employee');
const { EmployeeRepository } = require('../../../../app/domain/repositories');

const EMPLOYEE = {
  id: 'id',
  email: 'employee@accenture.com',
  salary: 1000000,
};

const FIXED_EMPLOYEE = {
  id: 'id',
  email: 'employee@mobgen.com',
  salary: 2000000,
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
      EmployeeRepository.updateEmailAndSalary = jest.fn(() => FIXED_EMPLOYEE);
    });

    afterEach(() => {
      EmployeeRepository.findById.mockClear();
      EmployeeRepository.updateEmailAndSalary.mockClear();
    });

    it("should fail if the repository can't find the employee", async (done) => {
      EmployeeRepository.findById = jest.fn(() => null);
      try {
        await fixEmployeeCommand('someId');
        done.fail();
      } catch (err) {
        expect(err).toMatchObject({
          name: 'Error',
          message: 'Employee not found',
        });
        expect(EmployeeRepository.findById).toHaveBeenCalledTimes(1);
        expect(EmployeeRepository.findById).toHaveBeenCalledWith('someId');
        done();
      }
    });

    it('should call repository with the fixed employee and return it', async () => {
      const employee = await fixEmployeeCommand('someId');
      expect(employee).toEqual(FIXED_EMPLOYEE);
      expect(EmployeeRepository.findById).toHaveBeenCalledTimes(1);
      expect(EmployeeRepository.findById).toHaveBeenCalledWith('someId');
      expect(EmployeeRepository.updateEmailAndSalary).toHaveBeenCalledTimes(1);
      expect(EmployeeRepository.updateEmailAndSalary)
        .toHaveBeenCalledWith('someId', FIXED_EMPLOYEE.email, FIXED_EMPLOYEE.salary);
    });
  });
});
