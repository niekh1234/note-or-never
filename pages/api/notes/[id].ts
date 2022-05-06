import { getLoginSession } from 'lib/auth/auth';
import {
  ok,
  badRequest,
  unauthorized,
  notFound,
  methodNotAllowed,
  internalError,
} from 'lib/response';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { Note } from '@prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // make sure the user is logged in
  const session = await getLoginSession(req);
  if (!session) {
    return unauthorized(res);
  }

  const id = req.query.id as string;

  if (req.method === 'DELETE') {
    try {
      await prisma.note.delete({ where: { id } });

      return ok(res, { success: true });
    } catch (err: any) {
      // prisma code for "record not found"
      if (err.code === 'P2025') {
        return notFound(res);
      }

      return internalError(res, { error: err.message });
    }
  }

  if (req.method === 'PUT') {
    const note: Note = req.body.note;

    // check if the note is provided in the request body
    if (!note) {
      return badRequest(res);
    }

    const updatedNoteFields = {
      title: note.title,
      content: note.content,
    };

    try {
      const updatedNote = await prisma.note.update({ where: { id }, data: updatedNoteFields });

      return ok(res, { note: updatedNote });
    } catch (err: any) {
      // prisma code for "record not found"
      if (err.code === 'P2025') {
        return notFound(res);
      }

      return internalError(res, { error: err.message });
    }
  }

  return methodNotAllowed(res);
};

export default handler;
