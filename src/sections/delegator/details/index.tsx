import { Tab, Card, Stack, useTheme, Container } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useState, useEffect, useCallback } from "react";
import Iconify from "src/components/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/";
import { useParams } from "next/navigation";
import Profile from "./home";
import Assets from "./assets";
import Order from "./order";
import Details from "./details";
import Coverpart from "./cover";

// ...................................
const TABS = [
  {
    value: "profile",
    label: "Profile",
    icon: <Iconify icon="solar:user-id-outline" width={30} />
  },
  {
    value: "details",
    label: "Details",
    icon: <Iconify icon="solar:wallet-money-outline" width={30} />
  },
  {
    value: "assets",
    label: "Assets/Equity",
    icon: <Iconify icon="solar:closet-2-outline" width={30} />
  },
  {
    value: "order",
    label: "Orders place",
    icon: <Iconify icon="solar:layers-minimalistic-outline" width={30} />
  }
];

// ...................................
export default function UserDetails() {
  // ...................................
  const [data, setData] = useState<any>();
  const [currentTab, setCurrentTab] = useState("profile");
  const param = useParams();
  const theme = useTheme();

  // ...................................
  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const initializeUserDetails = useCallback(async () => {
    try {
      console.log("initialize user details");
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line
  }, [param]);

  // ...................................

  useEffect(() => {
    if (param) {
      initializeUserDetails();
    }
  }, [param, initializeUserDetails]);

  return (
    <Container>
      <Stack m={2}>
        <CustomBreadcrumbs
          heading="Details"
          links={[
            { name: "Dashboard", href: "/app" },
            { name: "User", href: "/user" },
            { name: `${data?.firstName} ${data?.secondName}` }
          ]}
        />
      </Stack>
      <Card
        sx={{
          height: 250,
          mb: 3
        }}
      >
        <Stack>
          <Coverpart
            name={`${data?.firstName} ${data?.secondName}`}
            email={`${data?.email}`}
            avatar={`${data?.profilePic?.url}`}
          />
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.background.main
              }
            }}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              borderColor: theme.palette.background.main,
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end"
                }
              }
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Stack>
      </Card>
      {currentTab === "profile" && <Profile profile={data!} />}
      {currentTab === "details" && <Details details={data!} />}
      {currentTab === "assets" && <Assets assets={data!} />}
      {currentTab === "order" && <Order order={data!} />}
    </Container>
  );
}
