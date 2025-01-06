import { Stack, Container } from "@mui/material";
import React from "react";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { useSettingsContext } from "src/components/settings";
import ProjectDetails from "./project-details";

function NewProject() {
  const settings = useSettingsContext();
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

      <ProjectDetails />
    </Container>
  );
}

export default NewProject;
