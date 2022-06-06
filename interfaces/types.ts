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

export type Notebook = {
  id: string;
  title: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
};

export type Notes = {
  items: readonly Note[];
  total: number;
};

export type Notebooks = {
  items: readonly Notebook[];
  total: number;
};

export type User = {
  jwt: string;
  username: string;
};
