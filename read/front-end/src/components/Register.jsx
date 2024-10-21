import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${SERVER_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, password2: confirmPassword }),
    });

    if (response.ok) {
      navigate('/login');
    } else {
      const errorData = await response.json();
      console.log(errorData); 
    }
  };
  return (
    <>
      <h1 className="mb-4 flex flex-col items-center text-4xl font-bold text-slate-100">
        Registrar
      </h1>
      <form onSubmit={handleSubmit} className="w-92 grid grid-cols-2 gap-4 items-center">
        <div>
          <label
            htmlFor="username"
            className="text-left text-slate-100 text-sm mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-left text-slate-100 text-sm mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            className="h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-left text-slate-100 text-sm mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            className="h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
            required
          />
        </div>
        <div>
          <label
            htmlFor="passwordconfirm"
            className="text-left text-slate-100 text-sm mb-1"
          >
            Confirm Password
          </label>
          <input
            id="passwordconfirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="*******"
            className="h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
            required
          />
        </div>
        <button
          type="submit"
          className="col-span-2 mt-4 border-none rounded-sm p-2 text-base font-semibold bg-[rgba(251,251,251,0.59)] text-[rgba(0,0,0,0.92)] hover:bg-[rgba(251,251,251,0.95)]"
        >
          Registrar
        </button>
      </form>
    </>
  );
}