import { HashedPassword } from './hashed-password.value-object';

describe('HashedPassword', () => {
  it('should create a hashed password', async () => {
    const password = 'password123';
    const actual = await HashedPassword.hash(password);
    expect(actual.hash).not.toEqual(password);
  });

  it('should match the hash with the password', async () => {
    const password = 'password123';
    const actual = await HashedPassword.hash(password);
    await expect(actual.matches(password)).resolves.not.toThrow();
  });

  it('should not match the hash with the wrong password', async () => {
    const password = 'password123';
    const actual = await HashedPassword.hash(password);
    await expect(actual.matches('wrong')).rejects.toThrow();
  });
});
