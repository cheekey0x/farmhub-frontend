import { Stack, Container } from "@mui/material";
import React, { useEffect } from "react";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "src/hooks/use-snackbar";
import { projectApiService } from "src/utils/service";
import { usePersistStore } from "src/store/persist";
import { useSettingsContext } from "src/components/settings";
import ProjectDetails from "./project-details";

function Details() {
  const params = useParams();
  const projectId = Array.isArray(params?.id) ? "" : params?.id || "";
  const router = useRouter();
  const snackbar = useSnackbar();
  const settings = useSettingsContext();
  const setPageProject = usePersistStore(
    (store) => store.actions.setPageProject
  );

  const fetchCurrentProject = async () => {
    try {
      if (!projectId) {
        return;
      }
      const pageProject = (await projectApiService.getProjetById(
        projectId
      )) as any;
      if (pageProject) {
        await setPageProject({
          ...pageProject,
          token: {
            ...pageProject?.token,
            custodial: {
              ...pageProject?.token.custodial
            },
            nonCustodial: {
              ...pageProject.token.nonCustodial
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
      snackbar.snackbarError("Get project Error");
      router.push("/project");
    }
  };

  useEffect(() => {
    fetchCurrentProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
        alignItems="center"
        sx={{
          "& input:-webkit-autofill": {
            WebkitBoxShadow:
              settings.themeMode === "light"
                ? ""
                : "0 0 0 1000px #161d27bd inset"
          }
        }}
      >
        <CustomBreadcrumbs
          heading="Projects"
          links={[{ name: "", href: "/project" }]}
          sx={{ mb: 2 }}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mb={3} gap={2} />

      <ProjectDetails />
    </Container>
  );
}

export default Details;
