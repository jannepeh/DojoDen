import {Link, NavigateFunction, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const navigate: NavigateFunction = useNavigate();

  const handeDelete = async () => {
    try {
      const token = await localStorage.getItem('token');

      if (!token) {
        console.log('Token not found');
        return;
      }
      const deleteResponse = await deleteMedia(item.media_id, token);
      console.log(deleteResponse);
      navigate(-1);
      alert('Post deleted, please refresh the page');
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <article className="w-full rounded-md bg-stone-600">
      <img
        className="h-72 w-full rounded-t-md object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="text-center">{item.title}</h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-stone-300">
          {item.description}
        </p>
        <div className="my-2">
          <Link
            to="/single"
            state={{item}}
            className="mb-1 block rounded-xl bg-yellow-200 p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
          >
            Show
          </Link>
          {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => {
                  console.log('Modify clicked!', item.media_id);
                }}
                className="mb-1 block w-full cursor-pointer rounded-xl bg-green-600 p-4 text-center transition-all duration-500 ease-in-out hover:bg-green-800"
              >
                Modify
              </button>
              <button
                onClick={handeDelete}
                className="block w-full cursor-pointer rounded-xl bg-red-600 p-4 text-center transition-all duration-500 ease-in-out hover:bg-red-800"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default MediaRow;
