import { bep20_abi } from "@/abi/BEP20";
import BigNumber from "bignumber.js";
import { Contract, JsonRpcSigner } from "ethers";

export async function approve({
  pathname,
  signer,
  amount,
  receiptAddress,
  decimals,
}: {
  pathname?: string | null;
  signer?: JsonRpcSigner;
  amount?: number | null;
  receiptAddress?: string;
  decimals?: string;
}) {
  try {
    if (pathname) {
      const segments = pathname!.split("/");
      const tokenAddress = segments[segments.length - 1];
      const contract = new Contract(tokenAddress, bep20_abi, signer);
      //   if (amount && receiptAddress) {
      //     await contract.approve(receiptAddress, amount);
      //   }

      if (amount && receiptAddress && decimals) {
        const amountFormatted = BigNumber(amount).multipliedBy(
          BigNumber(10).pow(parseInt(decimals))
        );
        console.log(amountFormatted);

        await contract.approve(receiptAddress, amountFormatted.toString());
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function maxAllowAmount({
  pathname,
  signer,
  ownerAddress,
  spenderAddress,
}: {
  pathname?: string | null;
  signer?: JsonRpcSigner;
  ownerAddress?: string;
  spenderAddress?: string;
}) {
  try {
    if (pathname) {
      const segments = pathname!.split("/");
      const tokenAddress = segments[segments.length - 1];
      const contract = new Contract(tokenAddress, bep20_abi, signer);
      if (ownerAddress && spenderAddress) {
        const maxAmount = await contract.allowance(
          ownerAddress,
          spenderAddress
        );
        return maxAmount;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function transferFrom({
  pathname,
  signer,
  senderAddress,
  receiptAddress,
  amount,
}: {
  pathname?: string | null;
  signer?: JsonRpcSigner;
  senderAddress?: string;
  receiptAddress?: string;
  amount?: number | null;
}) {
  try {
    if (pathname) {
      const segments = pathname!.split("/");
      const tokenAddress = segments[segments.length - 1];
      const contract = new Contract(tokenAddress, bep20_abi, signer);
      if (senderAddress && receiptAddress && amount) {
        const transferFrom = await contract.transferFrom(
          senderAddress,
          receiptAddress,
          amount.toString()
        );
        await transferFrom.wait();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
