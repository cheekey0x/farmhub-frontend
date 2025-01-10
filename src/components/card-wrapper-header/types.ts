import { StackProps } from "@mui/material";

import { Theme, SxProps } from "@mui/material/styles";

// ----------------------------------------------------------------------

export interface CardWrapperHeaderProps extends StackProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    title?: string;
}
