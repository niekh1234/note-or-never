export type Filler = {
  type: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  view?: string;
};

export type Notes = {
  items: readonly Note[];
  total: number;
};

export type User = {
  jwt: string;
  username: string;
};
