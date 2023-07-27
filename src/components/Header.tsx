import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: '2.4rem' }}>
      <AppBar position='static'>
        <Toolbar>
          <Link
            href='/'
            passHref
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Next.js blog
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
