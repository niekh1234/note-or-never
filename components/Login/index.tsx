import { ExclamationCircleIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { FormEvent, FormEventHandler, useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  errorMsg?: string;
}

const LoginForm = ({ onSubmit, errorMsg }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(username, password);
  };

  return (
    <form onSubmit={submitHandler}>
      {errorMsg && (
        <div className='flex py-4 space-x-2'>
          <ExclamationCircleIcon className='w-6 h-6 text-red-400'></ExclamationCircleIcon>
          <div className='mb-4 text-gray-200'>{errorMsg}</div>
        </div>
      )}

      <div className='flex flex-col'>
        <label className='text-sm font-semibold text-gray-400'>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mt-1 input-primary'
          type='text'
          placeholder='Johndoe'
        ></input>
      </div>

      <div className='flex flex-col mt-6'>
        <label className='text-sm font-semibold text-gray-400'>Password</label>
        <div className='relative w-full h-10 mt-1'>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='absolute inset-0 w-full h-full input-primary'
            type={showPassword ? 'text' : 'password'}
          ></input>
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute flex items-center justify-center w-8 h-full right-6'
          >
            {showPassword ? (
              <EyeOffIcon className='w-5 h-5 text-gray-100'></EyeOffIcon>
            ) : (
              <EyeIcon className='w-5 h-5 text-gray-100'></EyeIcon>
            )}
          </button>
        </div>

        <button type='submit' className='mt-12 btn-primary'>
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
