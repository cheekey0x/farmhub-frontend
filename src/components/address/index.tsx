import { ContentPaste, Done } from "@mui/icons-material";
import { Box, Stack, Typography, TypographyProps } from "@mui/material";
import { truncateAddress } from "src/utils/truncate";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";

type Props = TypographyProps & {
  address: string;
};

const Address = ({ address, ...rest }: Props) => {
  const [copying, setCopying] = useState(false);

  const onCopy = () => {
    copy(address);
    setCopying(true);
  };

  useEffect(() => {
    if (copying) {
      const timer = setTimeout(() => setCopying(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copying]);

  return (
    <Stack direction="row">
      <Typography {...rest}>{truncateAddress(address, 10, 6)}</Typography>
      <Box sx={{ ml: 1, cursor: "pointer" }} onClick={onCopy}>
        {copying ? <Done /> : <ContentPaste />}
      </Box>
    </Stack>
  );
};

export default Address;
