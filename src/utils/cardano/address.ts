import CardanoWallet from "./wallet";

// ---------------------------------------------------------------------------//
// Address Functions That Check Wallet Network
// ---------------------------------------------------------------------------//
export const isValidAddress = (address: string) => {
  try {
    const addressDetails: any =
      CardanoWallet.getLucid()?.utils.getAddressDetails(address);
    if (!addressDetails) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const isAddressEmptyOrValid = (address: string) =>
  address === "" ? true : isValidAddress(address);

// ---------------------------------------------------------------------------//
