import {
  Stack,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary
} from "@mui/material";
import { useState, ReactNode } from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

export default function Collapse({
  title,
  children,
  open
}: {
  title: string;
  children: ReactNode;
  open: boolean;
}) {
  const [isOpen, setOpen] = useState(open);

  return (
    <Accordion
      expanded={isOpen}
      onChange={() => setOpen(!isOpen)}
      sx={{ "& div": { p: 0, margin: "0px!important" } }}
    >
      <AccordionSummary>
        <Stack
          width="100%"
          bgcolor="primary.main"
          color="white"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="2px"
          onClick={() => setOpen(!isOpen)}
        >
          <Typography variant="h6">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}
          </Typography>
          <Stack direction="row">
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "10px 35px!important",
          "& > div": { marginBottom: "5px!important" }
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
