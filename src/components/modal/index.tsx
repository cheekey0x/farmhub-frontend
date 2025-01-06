import AccountTypeModal from "./account/account-type";
import BillingHistoryModal from "./subscription/billing-history";
import DeleteMemberModal from "./account/accont-manage";
import SubscriptionModal from "./subscription/manage-subscriptoin";
import TeamMemberModal from "./account/team-manage";
import NunFungibleModal from "./app/project-app";
import PaymentMethodModal from "./subscription/payment-method";
import SubscriptionCycleModal from "./subscription/subscription-cycle";
import ProjectNewModal from "./project/new";
import AddPrjectWalletModal from "./wallet/add-project";
import AddAccountWalletModal from "./wallet/add-wallet";
import PreviewWalletModal from "./wallet/preview";
import StartSubscription from "./subscription/start-subscriptoin";
import InvoiceStatus from "./subscription/invoice-status";
import AddPaymentCard from "./subscription/payment-card";

export default function ModalContainer() {
  return (
    <>
      <AddPrjectWalletModal />
      <AddPaymentCard />
      <StartSubscription />
      <SubscriptionModal />
      <SubscriptionCycleModal />
      <PaymentMethodModal />
      <ProjectNewModal />
      <TeamMemberModal />
      <DeleteMemberModal />
      <AccountTypeModal />
      <BillingHistoryModal />
      <NunFungibleModal />
      <AddAccountWalletModal />
      <PreviewWalletModal />
      <InvoiceStatus />
    </>
  );
}
