import { Approval, Transaction } from "../types";
import {
  EthermintEvmEvent,
  EthermintEvmCall,
} from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
/*
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
*/
/*
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};
*/

export async function handleEthermintEvmEvent(
  event: EthermintEvmEvent
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = JSON.parse(event.args[2])
  transaction.from = event.args[0];
  transaction.to = event.args[1];
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleEthermintEvmCall(
  event: EthermintEvmCall
): Promise<void> {
  const approval = new Approval(event.hash);
  approval.owner = event.from;
  approval.value = JSON.parse(event.args[1]);
  approval.spender = event.args[0];
  approval.contractAddress = event.to;

  await approval.save();
}
