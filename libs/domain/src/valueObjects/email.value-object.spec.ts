import { BadRequestException } from '@nestjs/common';
import { Email } from './email.value-object';

it('should create a valid email', () => {
  const email = 'test@test.com';
  expect(new Email(email).address).toEqual(email);
});

it('lowercases emails', () => {
  expect(new Email('Test@test.com').address).toEqual('test@test.com');
});

it('should fail to create the email', async () => {
  expect(() => new Email('this is not an email')).toThrowError(
    BadRequestException,
  );
});
