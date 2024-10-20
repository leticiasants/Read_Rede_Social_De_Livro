export default function Register() {
  return (
    <>
      <h1 className="mb-4 flex flex-col items-center text-4xl font-bold text-slate-100">
        Registrar
      </h1>
      <form action="" className="w-92 grid grid-cols-2 gap-4 items-center">
        <div>
          <label
            htmlFor="username"
            className=" text-left text-slate-100 text-sm mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="text"
            placeholder="username"
            className=" h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className=" text-left text-slate-100 text-sm mb-1"
          >
            email
          </label>
          <input
            id="email"
            type="text"
            name="text"
            placeholder="exemplo@email.com"
            className=" h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className=" text-left text-slate-100 text-sm mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="*******"
            className=" h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
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
            name="password"
            placeholder="*******"
            className="h-8 border-none rounded-sm pl-2 bg-[rgba(251,251,251,0.59)] outline-none placeholder:text-sm placeholder-[rgba(0,0,0,0.92)] flex items-center text-left leading-10"
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
