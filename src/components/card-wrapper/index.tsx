import { memo, forwardRef } from "react";

import { Stack } from "@mui/material";

import { CardWrapperProps } from "./types";
// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const CardWrapper = forwardRef<HTMLDivElement, CardWrapperProps>(
    ({ children, sx, ...other }, ref) => {
        return (
            <Stack
                overflow="auto"
                borderRadius={0.7}
                m={1}
                sx={{
                    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 8px 0px",
                    flexGrow: 1,
                    ...{ sx }
                }}
                {...other}
            >
                {children}
            </Stack>
        );
    }
);

export default memo(CardWrapper);
