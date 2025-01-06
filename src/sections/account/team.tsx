import {
  Grid,
  Stack,
  Avatar,
  Select,
  Button,
  MenuItem,
  useTheme,
  Container,
  TextField,
  Typography
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useResponsive } from "src/hooks/use-responsive";
import {
  projectApiService,
  projectUserApiType,
  projectUserApiService
} from "src/utils/service";
import { TTeamMember } from "src/utils/service/api/project-user.type";
import { IActiveProject } from "src/utils/service/api/project.type";
import { isEmail, truncateAddress } from "src/utils/truncate";
import { useSnackbar } from "src/hooks/use-snackbar";

function TeamTab() {
  const smUp = useResponsive("up", 500);
  const theme = useTheme();
  const snackbar = useSnackbar();

  const [projectList, setProjectList] = useState<IActiveProject[]>([]);
  const [activeProject, setActiveProject] = useState<string>("none");
  const [teamMembers, setTeamMembers] = useState<Array<TTeamMember>>([]);
  const [receiver, setReceiver] = useState("");

  const handleInviteTeam = async () => {
    try {
      if (receiver === "") {
        snackbar.snackbarWarnning("Email is required");
        return;
      }
      if (!isEmail(receiver)) {
        snackbar.snackbarWarnning("Please type valid Email");
        return;
      }
      const resInvite = await projectUserApiService.inviteUserToProject({
        receiver,
        role: projectUserApiType.PROJECT_ROLE.MEMBER,
        projectId: activeProject
      });
      if (resInvite._id) {
        snackbar.snackbarSuccess("Invitation Success!");
        setReceiver("");
        return;
      }
      snackbar.snackbarWarnning("Invalid Email or Duplicate Invite");
    } catch (error) {
      snackbar.snackbarError("Invalid Email or Duplicate Invite");
    }
  };

  const fetchActiveList = async () => {
    try {
      const resActiveList = await projectApiService.getActiveProjetByMe();
      if (resActiveList.length > 0) setProjectList(resActiveList);
    } catch {
      setProjectList([]);
    }
  };

  const fetchTeamList = async () => {
    try {
      const resTeam =
        await projectUserApiService.getTeamByProject(activeProject);
      if (resTeam.length > 0) {
        setTeamMembers(resTeam);
      } else {
        setTeamMembers([]);
      }
    } catch {
      setTeamMembers([]);
    }
  };

  useEffect(() => {
    if (activeProject !== "") {
      fetchTeamList();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  useEffect(() => {
    fetchActiveList();
  }, []);
  return (
    <Container sx={{ p: "0 !important", my: 4 }}>
      <Stack my={2} gap={1}>
        <Typography variant="body2">Select Project</Typography>
        <Select
          labelId="team-select-id"
          id="team-select-id"
          size="small"
          value={activeProject}
          onChange={(e) => setActiveProject(e.target.value)}
        >
          <MenuItem disabled value="none">
            Please Select the Project
          </MenuItem>
          {projectList.map((item) => (
            <MenuItem value={item._id} key={item._id}>
              {item.projectName}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} mt={3} mb={5}>
            <Typography variant="body2" textAlign="start">
              Members
            </Typography>
            {activeProject !== "none" && (
              <Stack
                direction={smUp ? "row" : "column"}
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <TextField
                  size="small"
                  placeholder="Please enter email"
                  sx={{ width: smUp ? "70%" : "100%" }}
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
                <Button
                  size="small"
                  sx={{
                    background: theme.palette.background.main,
                    color: theme.palette.text.primary,
                    py: 1.8,
                    width: smUp ? "30%" : "100%"
                  }}
                  onClick={handleInviteTeam}
                >
                  <Typography variant="body1">Invite</Typography>
                </Button>
              </Stack>
            )}
            {teamMembers.map((item, index) => (
              <Stack
                key={item.email || index}
                gap={2}
                direction={smUp ? "row" : "column"}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  border: "1px solid #212b361a",
                  px: 2,
                  py: 2,
                  borderRadius: "3px"
                }}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Avatar sx={{ width: "24px", height: "24px" }} />
                  <Stack>
                    <Typography variant="body2" fontWeight={800}>
                      {item.name
                        ? item.name
                        : truncateAddress(item?.wallet?.[0] ?? "")}
                    </Typography>
                    <Typography variant="body2" fontWeight={400}>
                      {item.email && item.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Typography variant="body2">{item.projectRole}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeamTab;
