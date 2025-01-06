import DashboardLayout from "src/layouts/admin";
import DelegatorDetailsPage from "src/sections/delegator/details";

export default function DelegatorDetails() {
  return <DelegatorDetailsPage />;
}

DelegatorDetails.getLayout = function getLayout(
  page: React.ReactElement
): JSX.Element {
  return <DashboardLayout>{page}</DashboardLayout>;
};
