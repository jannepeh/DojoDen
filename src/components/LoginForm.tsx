import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';
import {useNavigate} from 'react-router-dom'; // Import useNavigate

type Props = {
  toggleRegister: () => void;
};

const LoginForm = (props: Props) => {
  const toggleRegister = props.toggleRegister;
  const {handleLogin} = useUserContext();
  const navigate = useNavigate(); // Initialize useNavigate
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs as Credentials);
      navigate('/Home'); // Redirect to home page after successful login
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div className="mt-5 flex justify-center">
        <video
          src="https://users.metropolia.fi/~jannepeh/images/vid.mp4"
          controls
          width="1080"
          height="500"
          className="rounded-xl"
        ></video>
      </div>
      <h1 className="mt-5 flex justify-center">Login</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col">
          <label htmlFor="loginusername">Username</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div className="flex w-[80%] flex-col">
          <label htmlFor="loginpassword">Password</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button
          className="m-[5px] cursor-pointer rounded-sm bg-yellow-200 p-[10px] text-black transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white"
          type="submit"
        >
          Login
        </button>
        <button
          className="m-[5px] cursor-pointer rounded-sm bg-yellow-200 p-[10px] text-black transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white"
          onClick={toggleRegister}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default LoginForm;
