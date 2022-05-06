import { removeTokenCookie } from 'lib/auth/auth-cookies';
import { NextApiRequest, NextApiResponse } from 'next';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  removeTokenCookie(res);
  res.writeHead(302, { location: '/login' });
  res.end();
};

export default logout;
