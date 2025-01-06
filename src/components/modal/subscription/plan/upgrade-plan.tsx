import { Stack, Button, useTheme, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";

export default function UpgradePlan() {
  const modal = useModal();
  const theme = useTheme();

  const handleClickUpgrade = async () => {
    modal.open(ModalType.SUBSCRIPITON_CYCLE);
  };
  return (
    <Stack
      sx={{
        boxShadow: "0px 0px 1px 0px #00000040",
        mt: 1,
        borderRadius: "3px",
        height: "100%",
        justifyContent: "space-between"
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        sx={{
          background: `linear-gradient(180deg, ${theme.palette.background.main}  -12.22%, ${theme.palette.background.main} 116.67%)`,
          px: 1.5,
          py: 1.5,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3
        }}
      >
        <Typography variant="body1" sx={{ color: "white" }} fontWeight="800">
          Supscription Tier
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
          mt={1}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: theme.palette.text.main,
              width: "15px",
              height: "15px"
            }}
          />
          <Typography variant="body2" sx={{ maxWidth: "180px" }}>
            Tier Details: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: theme.palette.text.main,
              width: "15px",
              height: "15px"
            }}
          />
          <Typography variant="body2" sx={{ maxWidth: "180px" }}>
            Tier Details: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: theme.palette.text.main,
              width: "15px",
              height: "15px"
            }}
          />
          <Typography variant="body2" sx={{ maxWidth: "180px" }}>
            Tier Details: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
          pb={2}
          sx={{ borderBottom: "1px solid #EBEBEB" }}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: theme.palette.text.main,
              width: "15px",
              height: "15px"
            }}
          />
          <Typography variant="body2" sx={{ maxWidth: "180px" }}>
            Tier Details: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Typography>
        </Stack>
        <Stack
          direction="column"
          gap={1}
          fontWeight={800}
          sx={{
            color: theme.palette.text.main
          }}
        >
          <Typography variant="body2">$0/Annual (% Discount)</Typography>
          <Typography variant="body2">$0.00/Month</Typography>
        </Stack>
        <Button
          size="large"
          sx={{
            color: theme.palette.text.primary,
            bgcolor: theme.palette.background.main,
            px: 5,
            mb: 1,
            ":hover": { color: "#5957C5" }
          }}
          onClick={handleClickUpgrade}
        >
          Upgrade Plan
        </Button>
      </Stack>
    </Stack>
  );
}
