import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="rounded-lg bg-white p-3 pb-15 shadow-md">
          <h2 className="mb-4 text-center text-2xl text-black">Profile</h2>
          {user ? (
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://placehold.co/150"
                  alt="User Avatar"
                  className="mx-auto h-32 w-32 rounded-full"
                />
              </div>

              <p className="text-xl font-semibold text-gray-500">
                {user.username}{' '}
                <span className="text-gray-500">({user.email})</span>
              </p>
              <p className="text-lg text-gray-500">
                User level: {user.level_name}
              </p>
              <p className="text-sm text-gray-500">
                Registered: {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500">No user data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
