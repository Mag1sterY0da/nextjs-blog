import LoadingSpinner from '@/components/LoadingSpinner';
import { IComment } from '@/interfaces/IComment';
import { IPost } from '@/interfaces/IPost';
import { Box, Container, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

type PostProps = {
  post: IPost;
  comments: IComment[];
};

const Post = ({ post, comments }: PostProps) => {
  if (!post || !comments) return <LoadingSpinner />;

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Link
        href='/'
        passHref
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Typography variant='button'>Back to home</Typography>
      </Link>
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        {post.title}
      </Typography>
      <Typography variant='body1'>{post.body}</Typography>
      <Box>
        <Typography variant='h6' align='center'>
          Comments for post {post.id}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                p: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <Typography variant='body2'>{comment.body}</Typography>
              <Typography variant='caption'>{comment.email}</Typography>
              <Typography variant='caption'>{comment.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams; // no longer causes error

  if (!id) {
    return {
      notFound: true,
    };
  }

  const resPost: Response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const resComments: Response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const post: IPost = await resPost.json();
  const comments: IComment[] = await resComments.json();

  return {
    props: {
      post,
      comments,
    },
  };
};

type Paths = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res: Response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const posts: IPost[] = await res.json();

  const paths: Paths[] = posts.map((post) => ({
    params: { id: String(post.id) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
