import {
  Stack,
  Button,
  Select,
  MenuItem,
  useTheme,
  Typography,
  SelectChangeEvent
} from "@mui/material";
import { useState } from "react";

const navOptionLists = [
  {
    title: "NFTs",
    value: "nft"
  },
  {
    title: "Tokens",
    value: "token"
  },
  {
    title: "Sales",
    value: "sale"
  }
];

export default function NavOptionList() {
  const [selected, setSelected] = useState("nft");
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Button
        sx={{ background: theme.palette.background.main, color: "white" }}
      >
        <Typography variant="body2">Deploy</Typography>
      </Button>
      <Select
        value={selected}
        defaultValue=""
        onChange={handleChange}
        placeholder="Please select option"
        sx={{ width: 120, height: 40 }}
      >
        {navOptionLists.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            <Typography variant="caption">{item.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
