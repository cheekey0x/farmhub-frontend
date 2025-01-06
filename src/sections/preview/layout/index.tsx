import { Stack, useTheme, Container } from "@mui/material";
import dynamic from "next/dynamic";
import { usePersistStore } from "src/store/persist";

type Props = {
  mode?: "dark" | "light";
  children: React.ReactNode;
  window?: () => Window;
};

export const Header = dynamic(() => import("./header"), { ssr: false });

export default function PreviewLayout({ children, mode, window }: Props) {
  const theme = useTheme();
  const projectInfo = usePersistStore((store) => store.app.previewProject);
  const bsBgColor = projectInfo?.bgColor ?? theme.palette.background.neutral;
  const bsFtColor = projectInfo?.bsFontColor ?? theme.palette.text.black;
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        height: "100%",
        background: `url(${projectInfo?.bgImgUrl}) center center` ?? "",
        backgroundColor: bsBgColor,
        backgroundSize: "cover",
        color: bsFtColor,
        backgroundRepeat: "no-repeat"
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 1,
            md: 10
          }
        }}
      >
        {children}
      </Container>
    </Stack>
  );
}
