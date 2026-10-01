// dummy users used until the backend exists
export type User = {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
};

type UserRecord = User & { password: string };

export const DUMMY_USERS: UserRecord[] = [
  { id: 'u1', name: 'Test User', email: 'test@carrental.dk', password: 'test1234', isGuest: false },
  { id: 'u2', name: 'Demo Driver', email: 'demo@carrental.dk', password: 'demo1234', isGuest: false },
];

export const GUEST_USER: User = { id: 'guest', name: 'Guest', email: '', isGuest: true };
