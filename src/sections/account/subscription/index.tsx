import {
  Grid,
  Stack,
  Button,
  Divider,
  useTheme,
  Container,
  Typography
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, { useState, useEffect } from "react";
import Image from "src/components/image";
import {
  ESubscriptionPlan,
  CSubscriptionPlanDetails
} from "src/constant/project";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";
import { projectApiService } from "src/utils/service";
import { IActiveProject } from "src/utils/service/api/project.type";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { useRootStore } from "src/store/root";
import ProjectOverview from "./project-overview";
import ProjectManage from "./project-manage";

function Subscription() {
  const [activeList, setActiveList] = useState<IActiveProject[]>([]);
  const modal = useModal();
  const router = useRouter();
  const theme = useTheme();
  const setSubscribe = useRootStore((store) => store.setSubscribe);
  const { query } = router;

  const initializeComponent = async () => {
    try {
      const resActiveList = await projectApiService.getActiveProjetByMe();
      if (resActiveList.length > 0) setActiveList(resActiveList);
      router.push({
        query: {
          type: "list"
        }
      });
    } catch {
      setActiveList([]);
    }
  };

  const handleViewSubscriptions = async () => {
    router.push({
      query: {
        type: "subscription"
      }
    });
  };

  const handleBackList = async () => {
    router.push({
      query: {
        type: "list"
      }
    });
  };

  const handleCreateProjectLink = async () => {
    router.push("/project");
  };

  const handleSubscriptionModal = async (subscribeType: ESubscriptionPlan) => {
    if (query?.projectId) {
      modal.open(ModalType.SUBSCRIPITON_START);
      setSubscribe({ type: subscribeType });
    }
  };

  useEffect(() => {
    initializeComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container sx={{ py: "0 !important", px: 3, my: 4 }}>
      <Stack my={2}>
        <Typography variant="body1">Manage Subscriptions</Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack width="100%" alignItems="flex-end" mb={3}>
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
              onClick={handleViewSubscriptions}
            >
              View Subscriptions
            </LoadingButton>
          </Stack>
        </Grid>
        {query.type === "list" &&
          (activeList.length > 0 ? (
            activeList.map((item, index) => (
              <Grid item xs={12} xl={6} key={index}>
                <ProjectOverview data={item} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} my={4}>
              <Stack width="100%" gap={5}>
                <Stack width="100%" alignItems="center">
                  <Typography>{`You don't have any projects now.`}</Typography>
                </Stack>
                <Stack width="100%" alignItems="center">
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
                    onClick={handleCreateProjectLink}
                  >
                    Create Project
                  </LoadingButton>
                </Stack>
              </Stack>
              {/* */}
            </Grid>
          ))}

        {query.type === "subscription" && (
          <Grid item xs={12} my={4}>
            <Stack width="100%" alignItems="center" gap={3}>
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

              <Stack
                gap={4}
                sx={{
                  flexDirection: {
                    xs: "column",
                    md: "row"
                  }
                }}
              >
                {CSubscriptionPlanDetails.map((item, index) => (
                  <Stack
                    key={index}
                    py={5}
                    px={3}
                    maxWidth={300}
                    borderRadius={5}
                    sx={{
                      boxShadow: "inset 4px 4px 5.4px rgba(0, 0, 0, 0.25)",
                      bgcolor:
                        item.title !== "business" ? "#262729" : undefined,
                      backgroundImage:
                        item.title === "business"
                          ? "linear-gradient(to top, #3D3D3E 0%, #A1A1A4 100%)"
                          : undefined
                    }}
                    gap={3}
                  >
                    <Stack flexDirection="row" alignItems="start" spacing={2}>
                      <Stack>
                        <Image
                          src={`assets/images/account/${item.title}.png`}
                          alt="project"
                          width={30}
                          height={30}
                          sx={{
                            width: "35px",
                            height: "40px"
                          }}
                        />
                      </Stack>
                      <Stack flexDirection="column" gap={1}>
                        <Stack
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            fontSize={20}
                            color="white"
                            textTransform="capitalize"
                          >
                            {item.title}
                          </Typography>
                          {item.title === "business" && (
                            <Image
                              src="assets/images/account/star.png"
                              alt="project"
                              width={30}
                              height={30}
                            />
                          )}
                        </Stack>
                        <Typography variant="body2" color="#B5B6BB">
                          Lorem ipsum dolor sit amet consectetur adipiscing
                          lorem.
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider
                      sx={{
                        background: "#FFFFFF33"
                      }}
                    />
                    <Stack
                      flexDirection="column"
                      gap={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        fullWidth
                        sx={{
                          color: "white",
                          backgroundImage:
                            item.title === "business"
                              ? "linear-gradient(to right, #AC50EF 0%, #7059FB 50%, #2ECFF6 100%)"
                              : undefined,
                          backgroundColor:
                            item.title !== "business" ? "#FFFFFF33" : undefined,
                          borderRadius: 4,
                          py: 1
                        }}
                        onClick={() => handleSubscriptionModal(item.title)}
                      >
                        <Typography variant="caption" fontSize={18}>
                          Get Started
                        </Typography>
                      </Button>
                      <Typography variant="body1" color="white" fontSize={18}>
                        ${item.monthly} USD /month
                      </Typography>
                      <Typography variant="body2" color="white">
                        ${item.yearly} USD /year
                      </Typography>
                    </Stack>
                    <Divider
                      sx={{
                        background: "#FFFFFF33"
                      }}
                    />
                    <Stack gap={2}>
                      <Typography variant="body1" color="white" fontSize={18}>
                        What’s included?
                      </Typography>
                      <Stack gap={1}>
                        {item.includes.map((benefitItem, key) => (
                          <Stack flexDirection="row" gap={2} key={key}>
                            <CheckIcon
                              sx={{
                                color: "white"
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="white"
                              fontSize={15}
                            >
                              {benefitItem}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                    <Button
                      fullWidth
                      sx={{
                        color: "white",
                        backgroundImage:
                          item.title === "business"
                            ? "linear-gradient(to right, #AC50EF 0%, #7059FB 50%, #2ECFF6 100%)"
                            : undefined,
                        backgroundColor:
                          item.title !== "business" ? "#FFFFFF33" : undefined,
                        borderRadius: 4,
                        py: 1,
                        mt: item.title === "hobbyist" ? 2.5 : undefined
                      }}
                      onClick={() => handleSubscriptionModal(item.title)}
                    >
                      <Typography variant="caption" fontSize={18}>
                        Get Started
                      </Typography>
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
        )}

        {query.type === "manage" && <ProjectManage />}
      </Grid>
    </Container>
  );
}

export default Subscription;
