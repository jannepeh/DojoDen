import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };
  return (
    <>
      {displayRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
      <div className="mt-3 flex justify-center">
        <button
          className="m-[5px] cursor-pointer rounded-sm bg-yellow-200 p-[10px] text-black hover:text-white hover:bg-slate-900 transition duration-300 ease-in-out"
          onClick={toggleRegister}
        >
          {displayRegister ? 'Login?' : 'Register?'}
        </button>
      </div>
    </>
  );
};

export default Login;
