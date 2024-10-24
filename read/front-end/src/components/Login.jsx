const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    try {
      const response = await fetch(`${SERVER_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <h1 className="mb-4 flex flex-col items-center text-4xl font-bold text-slate-100">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="w-92 flex flex-col items-center">
        <label
          htmlFor="email"
          className="w-72 text-left text-slate-100 text-sm mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="email"
          className="w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
        />
        <label
          htmlFor="password"
          className="w-72 text-left text-slate-100 text-sm mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="w-72 h-8 mb-3 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
        />
        <button
          type="submit"
          className="w-72 h-10 mt-6 border-none rounded-sm p-2 text-base font-semibold bg-[rgba(251,251,251,0.59)] text-[rgba(0,0,0,0.92)] hover:bg-[rgba(251,251,251,0.95)]"
        >
          Entrar
        </button>
      </form>
    </>
  );
}
