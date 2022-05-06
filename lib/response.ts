import { NextApiResponse } from 'next';

export const ok = (res: NextApiResponse, data = {}) => {
  return res.status(200).json(data);
};

export const badRequest = (res: NextApiResponse, data = { error: 'Missing required fields' }) => {
  return res.status(400).json(data);
};

export const unauthorized = (
  res: NextApiResponse,
  data = { error: 'You are not allowed to view this, are you logged in?' },
) => {
  return res.status(401).json(data);
};

export const notFound = (
  res: NextApiResponse,
  data = { error: 'Could not find your requested item' },
) => {
  return res.status(404).json(data);
};

export const methodNotAllowed = (res: NextApiResponse, data = { error: 'Method not allowed' }) => {
  return res.status(405).json(data);
};

export const internalError = (res: NextApiResponse, data = {}) => {
  return res.status(500).json(data);
};
