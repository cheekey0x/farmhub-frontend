import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../admin/common/account-popover';
// import LanguagePopover from '../admin/common/language-popover';
import NotificationsPopover from '../admin/common/notifications-popover';
import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function Footer() {
    const theme = useTheme();
    const { t } = useTranslate()

    const settings = useSettingsContext();

    const isNavHorizontal = settings.themeLayout === 'horizontal';

    const isNavMini = settings.themeLayout === 'mini';

    const lgUp = useResponsive('up', 'lg');

    const offset = useOffSetTop(HEADER.H_DESKTOP);

    const offsetTop = offset && !isNavHorizontal;

    return (
        <Stack
            px={2}
            py={1}
            sx={{
                backgroundColor: settings.themeMode === "light" ? theme.palette.background.main : "#12181f",
                width: NAV.W_VERTICAL,

            }}
        >
            <Stack justifyContent="center" alignItems="center">
                <Typography
                    variant="caption"
                    fontSize={9}
                    textAlign="center"
                    sx={{
                        color: theme.palette.text.disabled
                    }}
                >
                    © {t('Copyright')} {new Date().getFullYear()} Farmhub. All Rights Reserved.
                </Typography>
            </Stack>
        </Stack>
    );
}
