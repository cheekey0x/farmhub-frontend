import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// import { useMockedUser } from 'src/hooks/use-mocked-user';

// import { useAuthContext } from 'src/auth/hooks';

import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/hooks/use-snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { logOut } from 'src/utils/service/api/auth.api';
import { useTheme } from '@mui/material/styles';



// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/app',
  },
  {
    label: 'Profile',
    linkTo: '/app',
  },
  {
    label: 'Settings',
    linkTo: '/app',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const theme = useTheme()

  // const { user } = useMockedUser();
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: '李小宝',
    email: 'lixiaobao@mail.uteamwork.com',
    password: 'demo1234',
    photoURL: '/assets/images/avatar/user-default.jpg',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  // const { logout } = useAuthContext();

  const snackbar = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logOut();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      snackbar.snackbarError('Unable to logout!');
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        // sx={{
        //   background: (theme) => alpha(theme.palette.grey[500], 0.08),
        //   ...(popover.open && {
        //     background: (theme) =>
        //       `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        //   }),
        //   padding: 0
        // }}
        sx={{
          backgroundColor: "#22614A",
          borderRadius: "24px",
          padding: 0.5,
          height: 40
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 32,
            height: 32,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.displayName.charAt(0).toUpperCase()}
        </Avatar>
        <Stack
          mx={1}
          justifyContent="center"
        >
          <Typography
            variant="caption"
            color="white"
            lineHeight={1}
            align="center"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              my: 0.5
            }}
          >{user?.displayName}</Typography>
          <Typography
            variant="caption"
            lineHeight={1}
            align="center"
            sx={{
              fontSize: 10,
              color: theme.palette.text.light
            }}
          >{user?.email}</Typography>
        </Stack>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
