import { Network, WalletApi } from "lucid-cardano";
import { loadConfig } from "src/config";
import { mayFailAsync } from "src/helpers";
import { Err, Ok, Result } from "ts-res";
const config = loadConfig();

const getNetwork = async (api: WalletApi): Promise<Result<Network, string>> => {
  const networkId = await mayFailAsync(() => api.getNetworkId())
    .handle((e) => console.error(e))
    .complete();
  if (!networkId.ok) return Err("Fail to get network id");

  if (networkId.data == 1) return Ok("Mainnet");
  if (config.app.network === "Preprod") return Ok("Preprod");
  return Ok("Preview");
};

export { getNetwork };
