import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardWrapperHeaderProps } from "./types";

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
    title,
    sx,
    children,
    ...other
}: CardWrapperHeaderProps) {

    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1.5}
            px={3}
            sx={{
                backgroundColor: "#0B2212"
            }}
        >
            <Typography variant="body2" color="white" align="center">{title}</Typography>
            {children}
        </Stack>
    );
}

// ----------------------------------------------------------------------
