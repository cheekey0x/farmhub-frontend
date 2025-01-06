import {
  Cardano,
  Lucid,
  Network,
  SignedMessage,
  WalletApi
} from "lucid-cardano";
import { loadConfig } from "src/config";
import { ECardanoWalletType } from "src/types/custom.crypto";
import { getNetwork } from "./network";
import { Err, Ok, Result } from "ts-res";
import { mayFailAsync } from "src/helpers";
const config = loadConfig();

type WalletAuth = {
  payload: string;
  signedMessage: SignedMessage;
};

class CardanoWallet {
  private static _lucid: Lucid | undefined;

  // ---------------------------------------------------------------------------//
  // Wallet functions
  // ---------------------------------------------------------------------------//
  static async connect(
    wallet: ECardanoWalletType
  ): Promise<Result<string, string>> {
    const { cardano } = window;
    if (!cardano)
      return Err(
        "You must have a Cardano Wallet Extension (such as Nami) to connect."
      );

    const walletSet = await this.setWallet(cardano, wallet);
    if (!walletSet) return Err("Wallet not set.");

    if (!this.isCorrectNetwork()) {
      this.disconnect();
      return Err(`Please change to ${config.app.network} network`);
    }
    return await this.getAddress();
  }

  static disconnect() {
    this._lucid = undefined;
    return true;
  }

  static async signData(data: string): Promise<Result<SignedMessage, string>> {
    if (!this._lucid) return Err("Wallet not set");

    const lucid = this._lucid;
    const { fromText } = await import("lucid-cardano");
    const messageToSign = fromText(data);
    const result = await mayFailAsync(async () => {
      const address = await lucid.wallet.address();
      return await lucid.wallet.signMessage(address, messageToSign);
    }).complete();

    if (!result.ok) return Err("Couldn't sign message");
    return Ok(result.data);
  }

  static async getWalletAuth(
    payload: string = "Verify with Yieldlab"
  ): Promise<Result<WalletAuth, string>> {
    const signedResult = await this.signData(payload);
    if (!signedResult.ok) return Err(signedResult.error);
    return Ok({
      payload,
      signedMessage: signedResult.data
    });
  }

  static isConnected() {
    if (this._lucid) return true;
    return false;
  }

  static isCorrectNetwork() {
    if (!this._lucid) return false;
    const network = this._lucid.network;

    if (network === config.app.network) return true;
    return false;
  }

  static async setWallet(
    cardano: Cardano,
    wallet: ECardanoWalletType
  ): Promise<Result<boolean, string>> {
    const api = await this.getWalletAPI(cardano, wallet);
    if (!api.ok) return Err(api.error);

    const network = await getNetwork(api.data);
    if (!network.ok) return Err(network.error);

    const lucid = await mayFailAsync(() => Lucid.new(undefined, network.data))
      .handle((e) => console.error(e))
      .complete();
    if (!lucid.ok) return Err("Couldn't set wallet.");

    this._lucid = lucid.data;
    this._lucid.selectWallet(api.data);
    return Ok(true);
  }
  // ---------------------------------------------------------------------------//

  // ---------------------------------------------------------------------------//
  // Helper functions
  // ---------------------------------------------------------------------------//
  static async getWalletAPI(
    cardanoWindow: Cardano,
    walletType: ECardanoWalletType
  ): Promise<Result<WalletApi, string>> {
    const walletKey = walletKeyMaps[walletType];
    if (walletKey in cardanoWindow) {
      const api = await mayFailAsync(() => cardanoWindow[walletKey].enable())
        .handle((e) => console.error(e))
        .complete();
      if (!api.ok) return Err(`Couldn't connect to ${walletType}`);
      return Ok(api.data);
    } else {
      return Err(`${walletType} is not installed.`);
    }
  }

  static async getAddress(): Promise<Result<string, string>> {
    if (!this._lucid) return Err("Wallet not connected");
    const lucid = this._lucid;
    const address = await mayFailAsync(() => lucid.wallet.address())
      .handle((e) => console.error(e))
      .complete();
    if (!address.ok) return Err("Couldn't get wallet address");
    return Ok(address.data);
  }

  static getConnectedNetwork(): Network | undefined {
    if (!this._lucid) return undefined;
    return this._lucid.network;
  }

  static async getTokenBalance(tokenPolicyId: string) {
    try {
      if (!this._lucid) {
        throw new Error("Lucid instance is not initialized.");
      }
      const { wallet } = this._lucid;
      if (!wallet) {
        throw new Error("Wallet is not initialized.");
      }
      const utxos = await wallet.getUtxos();

      let balance = 0;
      utxos.forEach((utxo) => {
        Object.entries(utxo.assets).forEach(([policyId, assets]) => {
          if (policyId === tokenPolicyId) {
            const decimals = 4; // Adjust this value based on the token's decimal places
            const divisor = BigInt(10 ** decimals);
            balance += Number(assets) / Number(divisor);
          }
        });
      });

      return balance;
    } catch (error) {
      console.error("Error fetching token balance:", error);
      throw new Error("Get Token Balance Error");
    }
  }

  static getLucid() {
    if (!this._lucid) return null;
    return this._lucid;
  }
  // ---------------------------------------------------------------------------//
}

const walletKeyMaps: Record<ECardanoWalletType, string> = {
  None: "",
  Nami: "nami",
  Eternl: "eternl",
  Flint: "flint",
  Gero: "gerowallet",
  Typhon: "typhoncip30",
  Nufi: "nufi",
  Lace: "lace",
  Vespr: "vespr",
  Begin: "begin",
  Yoroi: "yoroi"
};

export type { WalletAuth };
export default CardanoWallet;
