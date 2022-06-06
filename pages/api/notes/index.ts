import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { getLoginSession } from 'lib/auth/auth';
import { internalError, ok, unauthorized } from 'lib/response';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const take = 500 || parseInt(req.query.take as string);
    const session = await getLoginSession(req);

    if (!session) {
      return unauthorized(res);
    }

    let skip = parseInt(req.query.cursor as string) || 0;

    const [items, total] = await prisma.$transaction([
      prisma.note.findMany({
        take,
        skip,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.note.count(),
    ]);

    return ok(res, {
      items,
      total,
    });
  } catch (err) {
    return internalError(res);
  }
};

export default handler;
