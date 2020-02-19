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
    it('should fail if no id is passed', async () => {
      await expect(fixEmployeeCommand())
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" is required',
        });
    });

    it('should fail if id is not a string', async () => {
      await expect(fixEmployeeCommand({ id: 'id' }))
        .rejects
        .toMatchObject({
          name: 'ValidationError',
          message: '"id" must be a string',
        });
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

    it("should fail if the repository can't find the employee", async () => {
      EmployeeRepository.findById = jest.fn(() => null);
      await expect(fixEmployeeCommand('someId'))
        .rejects
        .toMatchObject({ message: 'Employee not found' });

      // DON'T:
      // expect(EmployeeRepository.findById).toHaveBeenCalledTimes(1);
      // expect(EmployeeRepository.findById).toHaveBeenCalledWith('someId');
    });

    it('should call repository with the fixed employee and return it', async () => {
      const employee = await fixEmployeeCommand('someId');
      expect(employee).toEqual(FIXED_EMPLOYEE);

      // DON'T:
      // expect(EmployeeRepository.findById).toHaveBeenCalledTimes(1);
      // expect(EmployeeRepository.findById).toHaveBeenCalledWith('someId');

      expect(EmployeeRepository.updateEmailAndSalary).toHaveBeenCalledTimes(1);
      expect(EmployeeRepository.updateEmailAndSalary)
        .toHaveBeenCalledWith('someId', FIXED_EMPLOYEE.email, FIXED_EMPLOYEE.salary);
    });
  });
});
