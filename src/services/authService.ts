import { DUMMY_USERS, User } from '../data/users';

// Simulates a network request so the UI can show a loading state.
// When the backend is added, replace the body of logIn with a real API call.
const FAKE_DELAY_MS = 800;

export class AuthError extends Error {}

export async function logIn(email: string, password: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  const record = DUMMY_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!record) {
    throw new AuthError('Wrong email or password.');
  }

  const { password: _password, ...user } = record;
  return user;
}
