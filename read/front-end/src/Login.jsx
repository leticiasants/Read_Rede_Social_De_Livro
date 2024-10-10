import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
    return (
        <body className='absolute inset-0 z-10'>
            <div className=' w-screen h-screen flex justify-center items-center bg-[rgba(17,19,36,0.52)]'>
                <section className='flex flex-col justify-center items-center w-[23rem] p-0 bg-[rgba(255,249,249,0.09)] backdrop-blur-sm border border-white rounded-lg shadow-custom relative overflow-hidden'>
                    <h1 className='mb-4 flex flex-col items-center text-4xl font-bold text-slate-100'>Login</h1>
                    <form action='/users/login' method='POST' className='w-92 flex flex-col items-center'>
                        <label htmlFor="email" className='w-72 text-left text-slate-100 text-sm mb-1'>email</label>
                        <input id="email" type="text" name="text" placeholder='email' className='w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10'/>
                        <label htmlFor="password" className='w-72 text-left text-slate-100 text-sm mb-1'>Password</label>
                        <input id="password" type="password" name="password" placeholder='password' className='w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10'/>
                        <button type="submit" className='w-72 h-10 mt-6 border-none rounded-sm p-2 text-base font-semibold bg-[rgba(251,251,251,0.59)] text-[rgba(0,0,0,0.92)] hover:bg-[rgba(251,251,251,0.95)]'>Entrar</button>
                    </form>
                    <span className='mt-4 mb-6 text-slate-100' >
                    <Link to="/register" className='text-blue-500 hover:underline'>Cadastrar</Link>   
                    </span>
                </section>
            </div>
        </body>
      
    );
  }
  
  export default Login;