import { useUser } from 'hooks/useUser';
import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserDetailsForm from 'components/UserDetailsForm';

const Login: NextPage = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (username: string, password: string) => {
    if (errorMsg) {
      setErrorMsg('');
    }

    if (!username || !password) {
      return setErrorMsg('Please provide a username and password');
    }

    const body = {
      username,
      password,
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (err: any) {
      const msg = JSON.parse(err.message);
      setErrorMsg(msg.error);
    }
  };

  return (
    <main className='flex flex-col items-center w-screen h-screen bg-gray-800'>
      <header className='pb-16 pt-36'>
        <h1 className='text-5xl font-bold text-center text-gray-200'>
          It&apos;s <span className='text-fuchsia-600'>note</span> or <br></br>never
        </h1>
        <h2 className='mt-10 text-xl font-semibold text-center text-gray-400'>
          Let&apos;s log you in real quick.
        </h2>
      </header>
      <section className='w-full max-w-lg px-12 py-8 min-h-[16rem] rounded-lg bg-gray-900'>
        <p className='w-full mb-4 text-center text-gray-400'>
          First time here?{' '}
          <Link href='/signup'>
            <a className='font-semibold hover:underline text-fuchsia-500'>Create an account</a>
          </Link>
        </p>

        <UserDetailsForm onSubmit={onSubmit} errorMsg={errorMsg}></UserDetailsForm>
      </section>
    </main>
  );
};

export default Login;
