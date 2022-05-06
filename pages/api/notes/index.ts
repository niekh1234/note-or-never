import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { getLoginSession } from 'lib/auth/auth';
import { internalError, ok, unauthorized } from 'lib/response';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const take = 500;

  try {
    const session = await getLoginSession(req);

    if (!session) {
      return unauthorized(res);
    }

    let skip = parseInt(req.query.cursor as string) || 0;

    const [notes, count] = await prisma.$transaction([
      prisma.note.findMany({
        take,
        skip,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.note.count(),
    ]);

    const nextId = skip + take < count ? skip + take : null;

    return ok(res, {
      items: notes,
      nextId,
      total: count,
    });
  } catch (err) {
    return internalError(res);
  }
};

export default handler;
