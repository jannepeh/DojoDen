import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin()
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <>
      <h1 className="mb-5">Media Sharing App</h1>
      <div className="flex">
        <nav className="fixed left-0 top-0 h-full bg-yellow-200 p-4">
          <ul className="m-0 flex flex-col list-none">
            {user ? (
              <>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="rounded-xl block p-4 text-center transition-all duration-500 ease-in-out hover:bg-slate-900 text-black hover:text-white"
                  to="/"
                >
                  Login
                </Link>
              </li>
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
