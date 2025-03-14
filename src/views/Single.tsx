import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2>Single</h2>
      <h3>{item.title}</h3>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item.media_type.includes('image') ? (
        <img className="max-w-full" src={item.filename} alt={item.title} />
      ) : (
        <video className="max-w-full" src={item.filename} controls />
      )}
      <Likes item={item} />
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>
      <p>Type: {item.media_type}</p>
      <p>Size: {Math.round(item.filesize / 1024)} kB</p>
      <Comments item={item} />
      <button
        className="mb-1 rounded-xl block p-4 text-center transition-all duration-500 ease-in-out bg-yellow-200 hover:bg-slate-900 text-black hover:text-white w-full"
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
    </>
  );
};

export default Single;
