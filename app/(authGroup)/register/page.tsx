import React from 'react';
import LoginForm from '../_components/LoginForm';
import Link from 'next/link';
import RegisterForm from '../_components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-4 shadow-lg">
        <div className="space-y-2 text-center ">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-500">Create a new acction and takes less then a minute</p>
        </div>
        <RegisterForm />
        <div className='text-center -mt-5'>
          <p>Already have an accoutn?
            <Link href={"/login"} className='font-semibold text-decoration-line: underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default RegisterPage;