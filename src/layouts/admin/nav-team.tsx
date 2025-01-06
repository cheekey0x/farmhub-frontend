import { Stack, Avatar, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useModal from "src/hooks/use-modal";
import { ModalType } from "src/types/modal";
import { useParams, usePathname } from "next/navigation";
import { TTeamMember } from "src/utils/service/api/project-user.type";
import { projectUserApiService } from "src/utils/service";
import { truncateAddress } from "src/utils/truncate";

function NavTeam() {
  const [activeView, setActiveView] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<TTeamMember>>([]);
  const modal = useModal();
  const params = useParams();
  const pathName = usePathname();

  const handleInviteTeam = () => {
    modal.open(ModalType.TEAM_MANAGE);
  };

  const onChnagePath = async () => {
    try {
      if (
        pathName.indexOf("project") > 0 &&
        params.id &&
        params?.id.length > 0
      ) {
        setActiveView(true);
        const resTeam = await projectUserApiService.getTeamByProject(
          params.id as string
        );
        if (resTeam.length > 0) {
          setTeamMembers(resTeam);
        } else {
          setTeamMembers([]);
        }
      } else {
        setActiveView(false);
      }
    } catch {
      setActiveView(false);
    }
  };

  useEffect(() => {
    onChnagePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <Stack direction="column" gap={2} p={2} width="100%">
      {activeView && <Typography variant="h6">Your Team</Typography>}
      {activeView && (
        <Stack
          gap={1}
          sx={{
            width: "100%"
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            onClick={handleInviteTeam}
            sx={{
              cursor: "pointer"
            }}
          >
            <IconButton
              sx={{
                width: 30,
                height: 30
              }}
            >
              <AddCircleIcon
                sx={{
                  width: 30,
                  height: 30
                }}
              />
            </IconButton>
            <Typography variant="body1">Invite member</Typography>
          </Stack>
          <Stack sx={{ height: "30vh", overflowY: "auto" }}>
            {teamMembers?.map((item, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    border: (theme) =>
                      `solid 2px ${theme.palette.background.default}`
                  }}
                />
                <Typography variant="body1">
                  {item.name
                    ? item.name
                    : truncateAddress(item?.wallet?.[0] ?? "")}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default NavTeam;
