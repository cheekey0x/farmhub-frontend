import { projectWalletCryptoApiService } from "cardano-api/index";
import Decimal from "decimal.js";
import { Assets } from "lucid-cardano";
import { useEffect, useState } from "react";

const useProjectBalance = (projectId: string) => {
  const [balance, setBalance] = useState<Assets>({});
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async (projectId: string) => {
    try {
      if (projectId == "") return;
      setLoading(true);
      const result = await projectWalletCryptoApiService.getBalance(projectId);
      setBalance(result.balance);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance(projectId);
  }, [projectId]);

  const getAssetAmount = (unit: string, decimal: number = 6) => {
    if (unit in balance) {
      return new Decimal(balance[unit].toString()).dividedBy(
        Math.pow(10, decimal)
      );
    } else {
      return new Decimal(0);
    }
  };

  return { balance, error, loading, getAssetAmount };
};

export default useProjectBalance;
