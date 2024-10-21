import PropTypes from "prop-types";

function AuthPage({ children }) {
  return (
    <div className="absolute inset-0 z-10">
      <div className=" w-screen h-screen flex justify-center items-center bg-[rgba(17,19,36,0.52)]">
        <section className="flex flex-col justify-center items-center pb-4 pr-4 pl-4 bg-[rgba(255,249,249,0.09)] backdrop-blur-sm border border-white rounded-lg shadow-custom relative overflow-hidden">
          {children}
        </section>
      </div>
    </div>
  );
}

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPage;
