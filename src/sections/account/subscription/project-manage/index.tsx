import { LoadingButton } from "@mui/lab";
import {
  Card,
  Stack,
  Avatar,
  Button,
  Divider,
  useTheme,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "src/components/image";
import { CSubscriptionPlanDetails } from "src/constant/project";
import { IProjectWithPayment } from "src/utils/service/api/project.type";
import { useSession } from "next-auth/react";
import { truncateAddress } from "src/utils/truncate";
import Iconify from "src/components/iconify";
import { projectApiService } from "src/utils/service";
import InvoiceTable from "./invoice-table";

export default function ProjectManage() {
  const [activeData, setActiveData] = useState<IProjectWithPayment | null>(
    null
  );
  const theme = useTheme();
  const router = useRouter();
  const session = useSession();
  const { query } = router;

  const handleBackList = async () => {
    router.push({
      query: {
        type: "list"
      }
    });
  };

  const handleViewSubscriptions = async () => {
    router.push({
      query: {
        type: "subscription"
      }
    });
  };

  const initializeComponent = async () => {
    if (!query.projectId) {
      router.back();
      return;
    }
    try {
      const resActive = await projectApiService.getProjetByIdWithPayment(
        query.projectId as string
      );
      if (resActive._id) setActiveData(resActive);
    } catch {
      setActiveData(null);
      router.back();
    }
  };

  useEffect(() => {
    initializeComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack spacing={2} width="100%" flexDirection="column">
      <Stack width="100%" alignItems="flex-end">
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
          onClick={handleBackList}
        >
          Back
        </LoadingButton>
      </Stack>

      <Stack>{activeData && <ProjectManageOverview data={activeData} />}</Stack>

      <Stack spacing={1} mt={3}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography variant="body1">Subscription Overview</Typography>

          <Button
            variant="contained"
            size="small"
            sx={{
              px: 3,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.background.main}`,
              background: theme.palette.background.paper,
              "&:hover": {
                border: `1px solid ${theme.palette.background.main}`,
                background: theme.palette.background.paper
              }
            }}
            onClick={handleViewSubscriptions}
          >
            Explore Plans
          </Button>
        </Stack>

        <Stack direction="row" spacing={10}>
          <Stack
            py={2}
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
          >
            <Avatar
              src={session.data?.user.avatar}
              sx={{
                width: 36,
                height: 36,
                border: (themeAvatar) =>
                  `solid 2px ${themeAvatar.palette.background.default}`
              }}
            />
            <Typography>
              {session.data?.user.name ??
                truncateAddress(session.data?.user.wallet ?? "")}
            </Typography>
          </Stack>

          <Stack
            py={2}
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
          >
            <Iconify
              icon="mdi-light:email"
              sx={{
                width: 36,
                height: 36
              }}
            />
            <Typography>{session.data?.user?.email ?? ""}</Typography>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="body2">Billing Info</Typography>
          <Stack spacing={1}>
            <Typography variant="caption">
              {activeData?.subscribe?.stripeCard?.holder}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap={2} mt={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1">Billing History</Typography>
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
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Iconify icon="bi:cloud-download" sx={{ width: 15 }} />
              <Typography variant="body2">Download All</Typography>
            </Stack>
          </LoadingButton>
        </Stack>

        <Stack>
          <InvoiceTable />
        </Stack>
      </Stack>
    </Stack>
  );
}

const ProjectManageOverview = ({ data }: { data: IProjectWithPayment }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleStartSubscription = async () => {
    router.push({
      query: {
        type: "subscription",
        id: data._id
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
            src={data.logoUrl}
            width={100}
            height={100}
            borderRadius={1}
            sx={{
              cursor: "pointer",
              filter: "drop-shadow(5px 5px 5px rgba(89, 87, 197, .4))"
            }}
          />
        </Stack>

        {data.subscribe?._id ? (
          <Stack spacing={0.5} width="100%" flexDirection="column">
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography variant="body1">
                {truncateAddress(data.name)}
              </Typography>
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
                  {dayjs(data.subscribe?.subscribePlan?.startDay).format(
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
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography variant="body1">
                {truncateAddress(data.name)}
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
