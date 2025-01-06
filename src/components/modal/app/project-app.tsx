import {
  Box,
  Grid,
  Stack,
  Dialog,
  Button,
  Divider,
  useTheme,
  Typography,
  IconButton
} from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";
import useModal from "src/hooks/use-modal";
import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Image from "src/components/image";
import Scrollbar from "src/components/scrollbar";

const NunStaking = [
  { policy_id: "02jtig87u8t7tu...58turi9rtur", project_name: "Wenmint" },
  { policy_id: "02jtig87u8t7tu...58turi9rtur", project_name: "LilSappys" },
  { policy_id: "02jtig87u8t7tu...58turi9rtur", project_name: "PlatyPals" },
  { policy_id: "02jtig87u8t7tu...58turi9rtur", project_name: "Mallards" }
];

export default function ProjectAppDetail() {
  const [openModal, type] = useRootStore((store) => [
    store.modal.open,
    store.modal?.type
  ]);
  const theme = useTheme();
  const isOpen = openModal && type === ModalType.PROJECT_APP_DETAIL;
  const modal = useModal();
  const smUp = useResponsive("up", 500);
  const handleSubscriptionPlanModal = () => {
    modal.close(ModalType.PROJECT_APP_DETAIL);
  };

  return (
    <Dialog open={isOpen} onClose={handleSubscriptionPlanModal} maxWidth="sm">
      <Box
        alignItems="center"
        gap={{ sm: 4, xs: 2 }}
        height="100%"
        px={4}
        py={5}
        bgcolor={theme.palette.background.neutral}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => {
            modal.close(ModalType.PROJECT_APP_DETAIL);
          }}
        >
          <Close fontSize="large" />
        </IconButton>
        <Stack mt={3}>
          <Stack direction="column" justifyContent="center" gap={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">Non-Fungible Staking</Typography>
              <Stack sx={{ flexDirection: smUp ? "row" : "column" }} gap={1}>
                <Button
                  sx={{
                    backgroundColor: theme.palette.background.main,
                    color: theme.palette.text.primary,
                    px: 4
                  }}
                >
                  Enable
                </Button>
                <Button
                  sx={{
                    backgroundColor: theme.palette.background.main,
                    color: theme.palette.text.primary,
                    px: 4
                  }}
                >
                  Disable
                </Button>
              </Stack>
            </Stack>
            <Stack>
              <Image
                alt=""
                src="/assets/images/app/app-nft.png"
                width={150}
                height={104}
              />
              <Divider sx={{ mt: 2 }} />
            </Stack>
            <Typography variant="body2" fontWeight={350}>
              Description: Non-Fungible staking provides an easy to use
              interface for your registered NFT policy IDs. Policies that you
              wish to enable NFT staking for can be added to the policy list
              below. You can enable or disable at any time, but be aware that
              once you disable that will shutdown access to your unique url for
              your NFT staking page.
            </Typography>
            <Scrollbar sx={{ px: 1, py: 1 }}>
              <Grid container width={450} mb={2}>
                <Grid item xs={5}>
                  <Typography variant="body2" fontWeight={500}>
                    Policy ID
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" fontWeight={500}>
                    Project Name
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" fontWeight={500}>
                    Status
                  </Typography>
                </Grid>
              </Grid>
              {NunStaking.map((item, idx) => (
                <Grid container key={idx} width={450}>
                  <Grid item xs={5}>
                    <Box
                      component="img"
                      src="/assets/icon/navbar/policy.svg"
                      sx={{
                        filter: theme.palette.background.filter
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={500}
                      sx={{ pl: 1 }}
                    >
                      {item.policy_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" fontWeight={500}>
                      {item.project_name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#ABABC5",
                        color: theme.palette.text.primary,
                        px: 3
                      }}
                    >
                      Enable
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#FF6161",
                        color: theme.palette.text.primary,
                        px: 3
                      }}
                    >
                      Disable
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Scrollbar>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                py: 1,
                px: 2,
                backgroundColor: theme.palette.background.main
              }}
            >
              <AddIcon sx={{ color: "white" }} />
              <Typography
                variant="body2"
                fontWeight={800}
                sx={{ color: "white" }}
              >
                Add New Policy ID
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}
