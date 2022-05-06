import { createUser } from 'lib/auth/user';
import { internalError, ok } from 'lib/response';
import { NextApiRequest, NextApiResponse } from 'next';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.username || !req.body.password) {
    return internalError(res, { error: 'Missing fields' });
  }

  try {
    await createUser(req.body);
    ok(res, { done: true });
  } catch (err: any) {
    internalError(res, { error: err.message });
  }
};

export default signup;
