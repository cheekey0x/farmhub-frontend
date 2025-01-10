import { StackProps } from "@mui/material";

import { Theme, SxProps } from "@mui/material/styles";

// ----------------------------------------------------------------------

export interface CardWrapperProps extends StackProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}
