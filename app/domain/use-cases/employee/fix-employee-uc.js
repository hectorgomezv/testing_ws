'use strict';

const Joi = require('@hapi/joi');
const { EmployeeRepository } = require('../../repositories');

/**
 * Fixes an employee by changing the email and increasing the salary.
 * @param {String} id employee id.
 * @returns {Employee} employee fixed.
 * @throws Error if the operation fails.
 */
async function fixEmployee (id) {
  await Joi.validate(id, Joi.string().required().label('id'));

  const employee = await EmployeeRepository.findById(id);
  if (!employee) {
    throw new Error('Employee not found');
  }

  const {
    email,
    salary,
  } = employee;

  const fixedEmail = email.replace('accenture', 'mobgen');
  const fixedSalary = salary * 2;

  return EmployeeRepository.updateEmailAndSalary(
    id,
    fixedEmail,
    fixedSalary,
  );
}

module.exports = fixEmployee;
