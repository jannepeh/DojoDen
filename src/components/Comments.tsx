import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useCommentStore} from '../store';
import {useEffect, useRef} from 'react';
import {useComment} from '../hooks/apiHooks';
import {useForm} from '../hooks/FormHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useUserContext();
  const {comments, setComments} = useCommentStore();
  const {postComment, getCommentsByMediaId} = useComment();

  const initValues = {comment_text: ''};

  // Function to handle posting a comment
  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    await postComment(inputs.comment_text, item.media_id, token);
    // Update comments after posting
    getComments();
    // Reset form
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputs(initValues);
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  // Function to fetch comments for the media item
  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-4/5 flex-col">
            <label htmlFor="comment_text">Post a comment</label>
            <input
              className="my-2.5 rounded-md border p-2.5"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              autoComplete="off"
              ref={inputRef}
            />
          </div>
          <button
            disabled={!inputs.comment_text}
            className="mb-1 block w-full rounded-xl bg-yellow-200 p-4 text-center text-black transition-all duration-500 ease-in-out hover:bg-slate-900 hover:text-white"
            type="submit"
          >
            Post
          </button>
        </form>
      )}
      {comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              {comment.username} (
              {new Date(comment.created_at || '').toLocaleString('fi-FI')}):
              {comment.comment_text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
