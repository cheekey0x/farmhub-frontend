import { cardanoCryptoApiService } from "cardano-api/index";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { mayFailAsync } from "src/helpers";

const useBalance = (address: string = "", interval = 0) => {
  /// interval is second
  const [balance, setBalance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
    if (interval <= 0) {
      return;
    }
    const timer = setInterval(() => fetchBalance(), interval * 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const fetchBalance = async () => {
    if (!address) return;
    setLoading(true);
    const result = await mayFailAsync(() =>
      cardanoCryptoApiService.addressBalance(address)
    ).complete();
    if (result.ok) setBalance(result.data.balance);
    setLoading(false);
  };

  const getAssetAmount = (unit: string, decimal = 6): Decimal => {
    if (!(unit in balance)) return new Decimal(0);
    return new Decimal(balance[unit]).dividedBy(Math.pow(10, decimal));
  };

  return {
    balance,
    getAssetAmount,
    loading
  };
};

export default useBalance;
