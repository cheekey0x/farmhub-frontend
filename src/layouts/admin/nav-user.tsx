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

export default function NavUser() {
    const router = useRouter();

    // const { user } = useMockedUser();
    const user = {
        id: '8864c717-587d-472a-929a-8e5f298024da-0',
        displayName: '李小宝',
        email: 'lixiaobao@163.com',
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

    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
            >
                <IconButton
                    component={m.button}
                    whileTap="tap"
                    whileHover="hover"
                    variants={varHover(1.05)}
                    onClick={popover.onOpen}
                    sx={{
                        width: 40,
                        height: 40,
                        background: (theme) => alpha(theme.palette.grey[500], 0.08),
                        ...(popover.open && {
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                        }),
                    }}
                >
                    <Avatar
                        src={user?.photoURL}
                        alt={user?.displayName}
                        sx={{
                            width: 36,
                            height: 36,
                            border: (theme) => `solid 2px ${theme.palette.background.default}`,
                        }}
                    >
                        {user?.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
                <Typography
                    onClick={popover.onOpen}
                    variant="caption"
                    color="initial"
                    lineHeight={1}
                    align="center"
                    ml={0.2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        cursor: "pointer"
                    }}
                >{user?.displayName}</Typography>
            </Stack>
        </>
    );
}
