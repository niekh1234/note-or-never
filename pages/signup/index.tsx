import { useUser } from 'hooks/useUser';
import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import UserDetailsForm from 'components/UserDetailsForm';
import Link from 'next/link';

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
      const res = await fetch('/api/auth/signup', {
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
          Create an account!
        </h2>
      </header>
      <section className='w-full max-w-lg px-12 py-8 min-h-[16rem] rounded-lg bg-gray-900'>
        <p className='w-full mb-4 text-center text-gray-400'>
          Already have an account?{' '}
          <Link href='/login'>
            <a className='font-semibold hover:underline text-fuchsia-500'>Go to login</a>
          </Link>
        </p>
        <UserDetailsForm
          onSubmit={onSubmit}
          errorMsg={errorMsg}
          actionMsg={'Create my account'}
        ></UserDetailsForm>
      </section>
    </main>
  );
};

export default Login;
