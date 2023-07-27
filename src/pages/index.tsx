import LoadingSpinner from '@/components/LoadingSpinner';
import Posts from '@/components/Posts';
import UserSelect from '@/components/UserSelect';
import { IPost } from '@/interfaces/IPost';
import { IUser } from '@/interfaces/IUser';
import { Container, SelectChangeEvent } from '@mui/material';
import { GetStaticProps } from 'next';
import { useCallback, useMemo, useState } from 'react';

type HomeProps = {
  users: IUser[];
  posts: IPost[];
};

const Home = ({ users, posts }: HomeProps) => {
  const [user, setUser] = useState<IUser | 'all'>('all');

  const handleUserChange = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      if (value === 'all') {
        setUser('all');
        return;
      }

      const selectedUser = users.find((user) => user.username === value);
      if (selectedUser) {
        setUser(selectedUser);
      }
    },
    [users]
  );

  const userNames: string[] = useMemo(
    () => users?.map((user) => user.username),
    [users]
  );

  if (!users || !posts) return <LoadingSpinner />;

  return (
    <>
      <Container maxWidth='xl'>
        <UserSelect
          user={user}
          handleChange={handleUserChange}
          userNames={userNames}
        />
        <Posts user={user} posts={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resUser: Response = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const resPosts: Response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const users: IUser[] = await resUser.json();
  const posts: IPost[] = await resPosts.json();

  return {
    props: {
      users,
      posts,
    },
  };
};

export default Home;
