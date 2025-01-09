import { m } from 'framer-motion';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { varHover } from 'src/components/animate';
import { SignIn } from 'src/sections/auth';


// ----------------------------------------------------------------------

export default function LoginPopover() {
  const drawer = useBoolean();

  return (
    <>
      <Button
        sx={{
          py: 0.7,
          px: 4,
          display: { xs: "none", sm: "flex" },
          fontWeight: "600",
          lineHeight: "18.23px",
          // background: "linear-gradient(90deg, #1A61ED 0%, #9747FF 100%)"
          background: "linear-gradient(90deg,rgb(30, 156, 76) 0%,rgb(103, 186, 132) 100%)"
          // background: "linear-gradient(90deg,rgb(253, 217, 37) 0%,rgb(255, 230, 108) 100%)",
        }}
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={drawer.onTrue}
      >
        <Typography
          className="font-clash"
          variant="body1"
          letterSpacing={1}
          fontWeight={700}
          color="white"
        >
          Sign In
        </Typography>
      </Button>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        <SignIn />
      </Drawer>
    </>
  );
}
