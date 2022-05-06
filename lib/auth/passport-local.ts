import Local from 'passport-local';
import { findUser, validatePassword } from './user';

export const localStrategy = new Local.Strategy(async (username, password, done) => {
  try {
    const user = await findUser({ username });

    if (user && (await validatePassword(user, password))) {
      done(null, user);
    } else {
      done(new Error('Invalid username or password'));
    }
  } catch (err) {
    done(err);
  }
});
