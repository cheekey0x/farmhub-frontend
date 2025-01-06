"use client";

import {
  Tab,
  Card,
  Tabs,
  Stack,
  Avatar,
  useTheme,
  Container,
  Typography,
  tabsClasses
} from "@mui/material";
import { useState, useCallback } from "react";
//-----------------------------------------------------------------------------
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { truncateAddress } from "src/utils/truncate";
import { usePersistStore } from "src/store/persist";
import Profile from "./profile";
import Subscription from "./subscription";
import Team from "./team";
//-----------------------------------------------------------------------------
const TABS = [
  {
    value: "profile",
    label: "Account Profile"
  },
  {
    value: "subscription",
    label: "Subscriptions"
  },
  {
    value: "team",
    label: "Team"
  }
];
// ...................................

type TFilter = {
  startDate: any;
  endDate: any;
  userStatus: string[];
  userKYC: string[];
  search: string;
};

export default function UserView() {
  const session = useSession();
  // const table = useTable();
  const userData = usePersistStore((store) => store.app.user);
  // ...................................
  const [filter, setFilter] = useState<TFilter>({
    startDate: dayjs("2000-01-01"),
    endDate: dayjs(),
    userStatus: [],
    userKYC: [],
    search: ""
  });

  // ...................................

  const [currentTab, setCurrentTab] = useState(TABS[0].value);
  const theme = useTheme();
  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );
  // ...................................
  return (
    <Container maxWidth="xl">
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
          {userData?.name ?? truncateAddress(userData?.wallet?.[0] ?? "")}
        </Typography>
      </Stack>
      <Card sx={{ px: 3, my: 3 }}>
        <Stack>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            scrollButtons={false}
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.background.main
              }
            }}
            sx={{
              width: "100%",
              zIndex: 9,
              borderColor: theme.palette.background.main,
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-start"
                }
              }
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={{ color: theme.palette.background.main }}
              />
            ))}
          </Tabs>
        </Stack>
        {currentTab === TABS[0].value && <Profile />}
        {currentTab === TABS[1].value && <Subscription />}
        {currentTab === TABS[2].value && <Team />}
      </Card>
    </Container>
  );
}
