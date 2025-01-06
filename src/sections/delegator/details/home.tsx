import { Card, Grid, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";

// ...................................

type Props = {
  profile: any;
};

// ...................................
export default function Home({ profile }: Props) {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3, lg: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Stack
              p={3}
              alignItems="center"
              justifyContent="space-between"
              color="primary.main"
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                gap: { xs: 3, sm: 1 }
              }}
            >
              <Iconify icon="solar:user-rounded-bold" width={30} />
              <Typography
                variant="subtitle1"
                whiteSpace="nowrap"
                fontWeight={400}
              >
                Total Investe counts
              </Typography>
              <Typography variant="subtitle1" fontWeight={400}>
                100
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Stack
              p={3}
              alignItems="center"
              justifyContent="space-between"
              color="primary.main"
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                gap: { xs: 3, sm: 1 }
              }}
            >
              <Iconify icon="solar:home-bold" width={30} />
              <Typography
                variant="subtitle1"
                whiteSpace="nowrap"
                fontWeight={400}
              >
                Proeprty Listings
              </Typography>
              <Typography variant="subtitle1" fontWeight={400}>
                5
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Stack
              p={3}
              alignItems="center"
              justifyContent="space-between"
              color="primary.main"
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                gap: { xs: 3, sm: 1 }
              }}
            >
              <Iconify icon="solar:chat-round-money-bold" width={30} />
              <Typography
                variant="subtitle1"
                whiteSpace="nowrap"
                fontWeight={400}
              >
                Total Payed Out
              </Typography>
              <Typography variant="subtitle1" fontWeight={400}>
                $100
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <Stack
              p={3}
              alignItems="center"
              justifyContent="space-between"
              color="primary.main"
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                gap: { xs: 3, sm: 1 }
              }}
            >
              <Iconify icon="solar:money-bag-bold" width={30} />
              <Typography
                variant="subtitle1"
                whiteSpace="nowrap"
                fontWeight={400}
              >
                Annual Cash Flow
              </Typography>
              <Typography variant="subtitle1" fontWeight={400}>
                $100
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Stack>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          p={2}
        >
          <Typography variant="h5" fontWeight={400}>
            Assets/Equity
          </Typography>
        </Stack>
        {/* <Grid container spacing={{ xs: 2, md: 3, lg: 5 }}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Stack p={2}>
                  <Stack
                    sx={{
                      background: `url(${GetItem(USER_LIST[0].property[index])?.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      aspectRatio: 2.5,
                      borderRadius: 1,
                    }}
                  />
                  <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Stack>
                      <Typography variant="body1">
                        {GetItem(USER_LIST[0].property[index])?.name}
                      </Typography>
                      <Typography variant="body2" color="text.disabled">
                        {GetItem(USER_LIST[0].property[index])?.address}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1">
                        {GetItem(USER_LIST[0].property[index])?.irr}%&nbsp;IRR
                      </Typography>
                      <Typography variant="body2">
                        {GetItem(USER_LIST[0].property[index])?.coc}%&nbsp;Coc
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Stack>
    </>
  );
}
