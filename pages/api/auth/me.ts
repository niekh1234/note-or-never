import { getLoginSession } from 'lib/auth/auth';
import { findUser } from 'lib/auth/user';
import { internalError, ok } from 'lib/response';
import { NextApiRequest, NextApiResponse } from 'next';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);

    if (!session) {
      throw new Error();
    }

    const user = await findUser(session);

    if (!user) {
      throw new Error();
    }

    const { password, ...publicUser } = user;

    return ok(res, { user: publicUser });
  } catch (err) {
    return internalError(res, { error: 'Authentication token is invalid, please log in.' });
  }
};

export default me;
