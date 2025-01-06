import { Box, Card, Grid, Stack, Button, TextField } from "@mui/material";

import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import CardHeader from "@mui/material/CardHeader";
import PaymentCardItem from "./details-card-item";
import PaymentNewCardDialog from "./details-newcard";

// ...................................
type Props = {
  details: any;
};

// ...................................
export default function Details({ details }: Props) {
  // ...................................
  const newCard = useBoolean();

  // ...................................
  const cards = [...Array(3)].map((_, index) => ({
    id: `stone${index}`,
    cardNumber: [
      "**** **** **** 1234",
      "**** **** **** 5678",
      "**** **** **** 7878"
    ][index],
    cardType: ["mastercard", "visa", "visa"][index],
    primary: index === 1
  }));

  // ...................................
  return (
    <Grid container spacing={{ xs: 2, md: 3, lg: 5 }}>
      <Grid item xs={12} sm={12} md={7}>
        <Card>
          <CardHeader title="Information" />
          <Stack p={3}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={`${details.firstName} ${details.secondName}`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  type="text"
                  fullWidth
                  value={details.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  value={details.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  value={details.address1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  label="State/Region"
                  type="text"
                  fullWidth
                  value={details.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zipcode"
                  label="Zip Code"
                  type="text"
                  fullWidth
                  value={details.zipCode}
                />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Card>
          <CardHeader
            title="Payment Method"
            action={
              <Button
                size="small"
                color="primary"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={newCard.onTrue}
              >
                New Card
              </Button>
            }
          />

          <Box
            rowGap={2.5}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)"
            }}
            sx={{ p: 3 }}
          >
            {cards.map((card) => (
              <PaymentCardItem key={card.id} card={card} />
            ))}
          </Box>
        </Card>
        <PaymentNewCardDialog open={newCard.value} onClose={newCard.onFalse} />
      </Grid>
    </Grid>
  );
}
