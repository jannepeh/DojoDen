import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // Get user and handleAutoLogin from context
  const {user, handleAutoLogin} = useUserContext();

  // Auto-login if user is not logged in
  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <>
      <h1 className="mb-5">Media Sharing App</h1>
      <div className="flex">
        <nav className="fixed top-0 left-0 h-full bg-yellow-200 p-4">
          <ul className="m-0 flex list-none flex-col">
            {user ? (
              <>
                {/* Display user-specific navigation */}
                <img
                  src="https://users.metropolia.fi/~jannepeh/images/judo.png"
                  alt="Judo Icon"
                  className="mb-10 ml-[20px] inline-block h-[45px] w-[45px]"
                />
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Display guest-specific navigation */}
                <img
                  src="https://users.metropolia.fi/~jannepeh/images/judo.png"
                  alt="Judo Icon"
                  className="mb-10 ml-[20px] inline-block h-[45px] w-[45px]"
                />
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="mb-1 block rounded-xl p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <footer></footer>
    </>
  );
};

export default Layout;
