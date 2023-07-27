import { IPost } from '@/interfaces/IPost';
import { IUser } from '@/interfaces/IUser';
import { shufflePost } from '@/utils/shufflePost';
import { Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type PostsProps = {
  user: IUser | 'all';
  posts: IPost[];
};

const Posts = ({ user, posts }: PostsProps) => {
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (user === 'all') {
      setFilteredPosts(shufflePost(posts));
    } else {
      setFilteredPosts(posts.filter((post) => post.userId === user.id));
    }
  }, [user, posts]);

  return (
    <>
      <Typography variant='h4' gutterBottom textAlign='center'>
        {user === 'all' ? 'Random 10 Posts' : `Posts of ${user.username}`}
      </Typography>
      <Grid container spacing={2} sx={{ mb: '2.4rem' }}>
        {filteredPosts.map((post) => (
          <Grid
            key={post.id}
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ minHeight: 150 }}
          >
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Paper sx={{ p: 1 }}>
                <Typography variant='h5'>{post.title}</Typography>
                <Typography variant='body1'>{post.body}</Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
