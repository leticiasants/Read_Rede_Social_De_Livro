import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const handleSubmit = async (event, email, password, confirmPassword, navigate) => {
    event.preventDefault(); // Evita o refresh da página

    console.log({ email, password, confirmPassword });

    const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, password2: confirmPassword }),
    });

    if (response.ok) {
        console.log("usuario registrado")
        navigate('/users/login');
    } else {

        const errorData = await response.json();
        console.log(errorData); 
    }
};


function register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (event) => {
        handleSubmit(event, email, password, confirmPassword, navigate);
    };

    return (
        <body className='absolute inset-0 z-10'>
            <div className=' w-screen h-screen flex justify-center items-center bg-[rgba(17,19,36,0.52)]'>
                <section className='flex flex-col justify-center items-center w-[23rem] p-0 bg-[rgba(255,249,249,0.09)] backdrop-blur-sm border border-white rounded-lg shadow-custom relative overflow-hidden'>
                    <h1 className='mb-4 flex flex-col items-center text-4xl font-bold text-slate-100'>Registrar</h1>
                    <form onSubmit={onSubmit} method='POST' className='w-92 flex flex-col items-center'>
                        <label htmlFor="email" className='w-72 text-left text-slate-100 text-sm mb-1'>Email</label>
                        <input id="email" type="text" name="email" placeholder='Email' className='w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10'
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password" className='w-72 text-left text-slate-100 text-sm mb-1'>Senha</label>
                        <input
                            id="password" type="password" name="password" placeholder='Senha' className='w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10'
                            value={password}  onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="confirmPassword" className='w-72 text-left text-slate-100 text-sm mb-1'>Confirmar Senha</label>
                        <input
                            id="password2" type="password" name="password2" placeholder='ConfirmSenha' className='w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10'
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button type="submit" className='w-72 h-10 mt-6 border-none rounded-sm p-2 text-base font-semibold bg-[rgba(251,251,251,0.59)] text-[rgba(0,0,0,0.92)] hover:bg-[rgba(251,251,251,0.95)]'>Registrar</button>
                    </form>
                    <span className='mt-4 mb-6 text-slate-100'>
                        <Link to="/login" className='text-blue-500 hover:underline'>Já tem uma conta? Faça login</Link>
                    </span>
                </section>
            </div>
        </body>
    );
}

  
  export default register;