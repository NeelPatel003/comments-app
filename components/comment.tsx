// components/Comment.tsx
import React from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image';
interface CommentProps {
  name: string;
  picture: string;
  comment: string;
  onDelete: () => void;
  isOdd: boolean;
}

const Comment: React.FC<CommentProps> = ({ name, picture, comment, onDelete, isOdd }) => {
  const commentStyle = isOdd
    ? { backgroundColor: 'black', color: 'white' }
    : { backgroundColor: 'white', color: 'black', border: '1px solid silver' };

    console.log('picture', picture)
  return (
    <div style={commentStyle} className={styles.comment}>
      <Image src={picture} alt={name} className={styles.avatar} width={100} height={50}/>
      <div className={styles.commentText}>
        <strong>{name}</strong>
        <p>{comment}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Comment;
