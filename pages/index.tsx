import React from 'react';
import Comment from '../components/comment';

const Home: React.FC<{ comments: CommentData[]; avatars: { [key: number]: string } }> = ({ comments, avatars }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [commentsState, setComments] = React.useState<CommentData[]>(comments);

  const filteredComments = commentsState.filter(comment =>
    comment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index: number) => {
    const updatedComments = [...commentsState];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  console.log('filteredComments', filteredComments)
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredComments.map((comment, index) => (
        <Comment
          key={comment.id}
          name={comment.name}
          picture={comment.picture || "/default-avatar.jpg"}
          comment={comment.body}
          onDelete={() => handleDelete(index)}
          isOdd={index % 2 === 0}
        />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch comment data from the API
  const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
  const comments: CommentData[] = await commentsResponse.json();

  // Fetch user avatars from the API
  const avatarsResponse = await fetch('https://randomuser.me/api/?results=5000');
  const avatarsData = await avatarsResponse.json();
  const avatars = {};

  const avatarURLs = avatarsData?.results?.map((user: any) => {
    if (user.picture && user.picture.thumbnail) {
      return user?.picture?.thumbnail;
    }
    return null;
  });

  // Combine comment data and avatars, and limit to 50 comments
  const commentsWithAvatars = comments.slice(0, 50).map((comment, index) => ({
    ...comment,
    picture: avatarURLs[index] || null,
  }));

  return {
    props: { comments: commentsWithAvatars, avatars },
  };
}

interface CommentData {
  id: number;
  name: string;
  email: string;
  body: string;
  picture?: string | null;
}

export default Home;
