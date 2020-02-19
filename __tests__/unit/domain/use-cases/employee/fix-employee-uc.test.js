'use strict';

const faker = require('faker');

const { fixEmployee } = require('../../../../../app/domain/use-cases/employee');
const { EmployeeRepository } = require('../../../../../app/domain/repositories');

const EMPLOYEE = {
  id: faker.random.uuid(),
  email: 'employee@accenture.com',
  salary: faker.random.number(),
};

const FIXED_EMPLOYEE = {
  ...EMPLOYEE,
  email: 'employee@mobgen.com',
  salary: EMPLOYEE.salary * 2,
};


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
      await expect(fixEmployee('someId'))
        .rejects
        .toMatchObject({ message: 'Employee not found' });

      // DON'T:
      // expect(EmployeeRepository.findById).toHaveBeenCalledTimes(1);
      // expect(EmployeeRepository.findById).toHaveBeenCalledWith('someId');
    });

    it('should call repository with the fixed employee and return it', async () => {
      const employee = await fixEmployee('someId');
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
