import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useUser } from 'hooks/useUser';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import NotesList from 'components/Notes/List';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Notebook, Notes } from 'interfaces/types';
import useHomepage from 'hooks/useHomepage';

interface HomeProps {
  notes: Notes;
}

const Home: NextPage<HomeProps> = () => {
  useUser({ redirectTo: '/login' });
  const { notes, notebooks, isLoading, error } = useHomepage();

  console.log(notes, notebooks, isLoading, error);

  if (isLoading) {
    return <div>Loading cunt</div>;
  }

  return (
    <>
      <Head>
        <title>Home - Note or never</title>
      </Head>
      <main className='w-screen min-h-screen bg-gray-900'>
        <p>Welcome!</p>
        <section className='max-w-5xl mx-auto'>
          <NotesList notes={notes}></NotesList>
        </section>
      </main>
    </>
  );
};

export default Home;
