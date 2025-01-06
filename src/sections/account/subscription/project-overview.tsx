import { Card, Stack, useTheme, Typography } from "@mui/material";
import Image from "src/components/image";
import { IActiveProject } from "src/utils/service/api/project.type";
import { truncateAddress } from "src/utils/truncate";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { CSubscriptionPlanDetails } from "src/constant/project";
import dayjs from "dayjs";
import Iconify from "src/components/iconify";

const ProjectOverview = ({ data }: { data: IActiveProject }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleStartSubscription = async () => {
    router.push({
      query: {
        type: "subscription",
        projectId: data.projectId
      }
    });
  };

  const handleManageSubscription = async () => {
    router.push({
      query: {
        type: "manage",
        projectId: data.projectId
      }
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 4,
        borderRadius: 0.5,
        height: "100%",
        cursor: "pointer",
        bgcolor: theme.palette.background.paper,
        boxShadow:
          "0 0 8px 3px rgb(0 0 0 / 10%), 0 12px 24px -4px rgb(0 0 0 / 22%)"
      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap={3}
        sx={{
          flexDirection: { xs: "column", md: "row" }
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            alt={data._id}
            src={data.projectUrl}
            width={100}
            height={100}
            borderRadius={1}
            sx={{
              cursor: "pointer",
              filter: "drop-shadow(5px 5px 5px rgba(89, 87, 197, .4))"
            }}
          />
        </Stack>

        {data.subscribe ? (
          <Stack spacing={0.5} width="100%" flexDirection="column">
            <Stack
              justifyContent="space-between"
              sx={{
                flexDirection: { xs: "column", md: "row" }
              }}
            >
              <Typography variant="body1">
                {truncateAddress(data.projectName)}
              </Typography>
              <LoadingButton
                size="small"
                sx={{
                  px: 3,
                  color: "white",
                  background: theme.palette.background.main,
                  "&:hover": {
                    background: theme.palette.background.main
                  }
                }}
                onClick={handleManageSubscription}
              >
                Manage Plan
              </LoadingButton>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Image
                  src={`assets/images/account/${data.subscribe.subscribeType}.png`}
                  alt="project"
                  sx={{
                    width: "25px"
                  }}
                />
                <Typography variant="body1" textTransform="capitalize">
                  {data.subscribe.subscribeType} Plan
                </Typography>
              </Stack>

              <Stack gap={0.5} alignItems="flex-end">
                <Typography variant="body2">
                  $
                  {
                    CSubscriptionPlanDetails.filter(
                      (planItem) =>
                        planItem.title === data?.subscribe?.subscribeType
                    )[0][
                      data?.subscribe
                        ?.period as keyof (typeof CSubscriptionPlanDetails)[number]
                    ]
                  }{" "}
                  USD/{data.subscribe.period}
                </Typography>
                <Typography variant="caption">
                  Next Renewal:{" "}
                  {dayjs(data?.subscribe?.subscribePlan?.startDay).format(
                    "MM/DD/YYYY"
                  )}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                boxShadow: "0px 0px 4px 0px #00000040",
                borderRadius: 1,
                p: 2,
                bgcolor: theme.palette.background.paper
              }}
            >
              <Stack direction="row" alignItems="center" gap={3}>
                <Stack>
                  <Iconify icon="mingcute:bank-card-fill" width={40} />
                </Stack>

                <Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.background.main }}
                  >
                    **** **** **** {data.subscribe.stripeCard?.last4}
                  </Typography>
                  <Typography variant="caption">
                    Exp:{" "}
                    {data.subscribe.stripeCard?.exp_month?.padStart(2, "0")}/
                    {data.subscribe.stripeCard?.exp_year?.slice(-2)}
                  </Typography>
                  <Typography variant="caption">
                    {data.subscribe.stripeCard?.brand}
                  </Typography>
                </Stack>
              </Stack>

              <Stack>
                {/* <Button
                  variant="contained"
                  size="small"
                  sx={{
                    px: 3,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.background.main}`,
                    background: theme.palette.background.paper,
                    "&:hover": {
                      border: `1px solid ${theme.palette.background.main}`,
                      background: theme.palette.background.paper,
                    },
                  }}
                >
                  Edit
                </Button> */}
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={0.5} width="100%" flexDirection="column">
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "space-between" },
                alignItems: "center"
              }}
            >
              <Typography variant="body1">
                {truncateAddress(data.projectName)}
              </Typography>
              <LoadingButton
                size="small"
                sx={{
                  px: 3,
                  color: "white",
                  background: theme.palette.background.main,
                  "&:hover": {
                    background: theme.palette.background.main
                  }
                }}
                onClick={handleStartSubscription}
              >
                Start Subscription
              </LoadingButton>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default ProjectOverview;
