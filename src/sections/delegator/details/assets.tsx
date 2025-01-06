import { Card, Grid, CardHeader } from "@mui/material";

// ...................................

type Props = {
  assets: any;
};

// ...................................
export default function Assets({ assets }: Props) {
  return (
    <Card>
      <CardHeader title="Properties" />
      <Grid container spacing={{ xs: 2, md: 3, lg: 5 }} p={3}>
        asssets
      </Grid>
    </Card>
  );
}
