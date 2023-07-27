'use client';

import { IUser } from '@/interfaces/IUser';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

type UserSelectProps = {
  user: IUser | string;
  handleChange: (event: SelectChangeEvent) => void;
  userNames: string[];
};

const UserSelect = ({ user, handleChange, userNames }: UserSelectProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <FormControl sx={{ width: '12rem', mb: '2.4rem' }}>
        <InputLabel id='user-select-label'>User</InputLabel>
        <Select
          labelId='user-select-label'
          id='user-select'
          value={typeof user === 'string' ? user : user.username}
          label='User'
          onChange={handleChange}
        >
          <MenuItem key={-1} value='all'>
            All users
          </MenuItem>
          {userNames.map((name, i) => (
            <MenuItem key={i} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserSelect;
