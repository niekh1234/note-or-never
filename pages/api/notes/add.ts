import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { ok } from 'lib/response';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const newNote = {
    title: 'Untitled',
    content: '',
  };

  const note = await prisma.note.create({ data: { ...newNote, notebookId: '11' } });

  return ok(res, note);
};

export default handler;
