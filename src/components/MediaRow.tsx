import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  const {user} = useUserContext();

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
            className="mb-1 rounded-xl block p-4 text-center transition-all duration-500 ease-in-out bg-yellow-200 hover:bg-slate-900 text-black hover:text-white"
          >
            Show
          </Link>
          {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => {
                  console.log('Modify clicked!', item.media_id);
                }}
                className="rounded-xl mb-1 block w-full cursor-pointer bg-green-600 p-4 text-center transition-all duration-500 ease-in-out hover:bg-green-800"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  console.log('Delete clicked!', item.media_id);
                }}
                className="rounded-xl block w-full cursor-pointer bg-red-600 p-4 text-center transition-all duration-500 ease-in-out hover:bg-red-800"
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
