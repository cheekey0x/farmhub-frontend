"use client";

import {
  Card,
  Grid,
  Stack,
  Button,
  useTheme,
  Container,
  Typography
} from "@mui/material";
import Iconify from "src/components/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//-----------------------------------------------------------------------------
import Image from "src/components/image";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";
import { useState, useEffect } from "react";
import { projectApiService } from "src/utils/service";
import {
  EINVITATION_STATUS,
  IActiveProject
} from "src/utils/service/api/project.type";
import { useRouter } from "next/navigation";
import { usePersistStore } from "src/store/persist";
// ...................................

export default function ProjectList() {
  // ...................................
  const [activeList, setActiveList] = useState<IActiveProject[]>([]);

  const theme = useTheme();
  const initNewPageProject = usePersistStore(
    (store) => store.actions.initNewProject
  );
  const initPageProject = usePersistStore(
    (store) => store.actions.initPageProject
  );
  const modal = useModal();
  // ...................................

  const fetchActiveList = async () => {
    try {
      const resActiveList = await projectApiService.getActiveProjetByMe();
      if (resActiveList.length > 0) setActiveList(resActiveList);
    } catch {
      setActiveList([]);
    }
  };

  useEffect(() => {
    fetchActiveList();
    initPageProject();
    initNewPageProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={4}
        alignItems="center"
      >
        <CustomBreadcrumbs
          heading="Project List"
          links={[{ name: "Project", href: "/project" }, { name: "List" }]}
          sx={{ mb: 2 }}
        />
        <Button
          onClick={() => {
            modal.open(ModalType.PROJECT_NEW);
          }}
          variant="contained"
          color="primary"
          sx={{
            bgcolor: theme.palette.background.main,
            "&:hover": {
              bgcolor: theme.palette.background.main
            }
          }}
          startIcon={<Iconify icon="fluent:document-queue-add-24-filled" />}
        >
          <Typography variant="body2">Create&nbsp;Project</Typography>
        </Button>
      </Stack>
      <Grid container spacing={2} mt={4}>
        {activeList.length > 0 &&
          activeList?.map(
            (item, index) =>
              item.invitation?.status !== EINVITATION_STATUS.REJECTED && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  pl={8}
                  pt={9}
                >
                  <ProjectOverview data={item} />
                </Grid>
              )
          )}
      </Grid>
    </Container>
  );
}

const ProjectOverview = ({ data }: { data: IActiveProject }) => {
  const router = useRouter();
  const theme = useTheme();
  const handleClickItem = async () => {
    if (data.invitation?.status === EINVITATION_STATUS.PENDING) {
      router.push(`/project-invitation/${data?._id}`);
    } else {
      router.push(`/project/${data.projectId}`);
    }
  };
  return (
    <Stack
      onClick={handleClickItem}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: "2px",
        borderRadius: 1,
        zIndex: "-1",
        contain: "content",
        overflow: "hidden",
        transition: "all 0.3s ease 0s",
        cursor: "pointer",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
        "&:hover::before": {
          backgroundImage: `conic-gradient(transparent,${theme.palette.background.main}, transparent 30%)`,
          animation:
            "5s linear 0s infinite normal none running animation-pasb1o"
        },
        "&::before": {
          content: `""`,
          position: "absolute",
          width: "400%",
          height: "400%",
          zIndex: "-1"
        },
        "&:hover": {
          transform: "translateY(-10px)"
        }
      }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
          borderRadius: 1,
          height: "100%",
          width: "100%"
        }}
      >
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-evenly"
          alignItems="center"
          width="100%"
        >
          <Image
            alt={data._id}
            src={
              data.projectUrl !== ""
                ? data.projectUrl
                : "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18"
            }
            width={100}
            height={100}
            borderRadius={1}
            sx={{
              cursor: "pointer",
              filter: "drop-shadow(1px 1px 1px rgba(89, 87, 197, .4))"
            }}
          />
          <Stack alignItems="flex-start" justifyContent="center">
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.main
              }}
            >
              {data.projectName}
            </Typography>
            <Typography variant="caption" mt={0.5}>
              Role: {data.role}
            </Typography>
            <Typography variant="caption" mt={0.5}>
              Status:{" "}
              {data.invitation?.status === EINVITATION_STATUS.PENDING
                ? "Invite pending"
                : "Active"}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};
