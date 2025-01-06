import React from "react";
import { Button, Typography } from "@mui/material";

interface WalletButtonProps {
  handleConnectWallet: () => void;
  walletStatus: any;
  btFtColor: string;
  btBgColor: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  handleConnectWallet,
  walletStatus,
  btFtColor,
  btBgColor
}) => (
  <Button
    sx={{
      backgroundColor: btBgColor,
      ":hover": {
        background: btBgColor
      },
      color: btFtColor,
      py: 1.5,
      px: 10,
      mt: 2
    }}
    onClick={handleConnectWallet}
  >
    <Typography variant="body2">
      {walletStatus?.address?.length > 0 ? "Stake" : "Connect Wallet"}
    </Typography>
  </Button>
);

export default WalletButton;
