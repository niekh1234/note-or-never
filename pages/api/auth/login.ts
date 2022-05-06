import { User } from 'interfaces/types';
import { setLoginSession } from 'lib/auth/auth';
import { localStrategy } from 'lib/auth/passport-local';
import { ok, unauthorized } from 'lib/response';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport, { Strategy } from 'passport';

const authenticate = (
  method: Strategy,
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
};

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await authenticate('local' as unknown as Strategy, req, res);

      if (!user) {
        throw new Error('Not found');
      }

      const session = { ...user };

      await setLoginSession(res, session);

      return ok(res, { done: true });
    } catch (err: any) {
      return unauthorized(res, { error: err.message });
    }
  });
