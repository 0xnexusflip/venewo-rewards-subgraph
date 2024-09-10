import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  Burn,
  ChangeWhitelistERC20,
  Deposit,
  Mint,
  OwnerChanged,
  OwnerNominated,
  PauseChanged,
  PayPenalty,
  Recovered,
  RecoveredNFT,
  Relock,
  Transfer,
  Withdraw
} from "../generated/VeNewO/VeNewO"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBurnEvent(user: Address, shares: BigInt): Burn {
  let burnEvent = changetype<Burn>(newMockEvent())

  burnEvent.parameters = new Array()

  burnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  burnEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return burnEvent
}

export function createChangeWhitelistERC20Event(
  tokenAddress: Address,
  whitelistState: boolean
): ChangeWhitelistERC20 {
  let changeWhitelistErc20Event = changetype<ChangeWhitelistERC20>(
    newMockEvent()
  )

  changeWhitelistErc20Event.parameters = new Array()

  changeWhitelistErc20Event.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  changeWhitelistErc20Event.parameters.push(
    new ethereum.EventParam(
      "whitelistState",
      ethereum.Value.fromBoolean(whitelistState)
    )
  )

  return changeWhitelistErc20Event
}

export function createDepositEvent(
  caller: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
}

export function createMintEvent(user: Address, shares: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return mintEvent
}

export function createOwnerChangedEvent(
  oldOwner: Address,
  newOwner: Address
): OwnerChanged {
  let ownerChangedEvent = changetype<OwnerChanged>(newMockEvent())

  ownerChangedEvent.parameters = new Array()

  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownerChangedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerChangedEvent
}

export function createOwnerNominatedEvent(newOwner: Address): OwnerNominated {
  let ownerNominatedEvent = changetype<OwnerNominated>(newMockEvent())

  ownerNominatedEvent.parameters = new Array()

  ownerNominatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerNominatedEvent
}

export function createPauseChangedEvent(isPaused: boolean): PauseChanged {
  let pauseChangedEvent = changetype<PauseChanged>(newMockEvent())

  pauseChangedEvent.parameters = new Array()

  pauseChangedEvent.parameters.push(
    new ethereum.EventParam("isPaused", ethereum.Value.fromBoolean(isPaused))
  )

  return pauseChangedEvent
}

export function createPayPenaltyEvent(
  caller: Address,
  owner: Address,
  assets: BigInt
): PayPenalty {
  let payPenaltyEvent = changetype<PayPenalty>(newMockEvent())

  payPenaltyEvent.parameters = new Array()

  payPenaltyEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  payPenaltyEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  payPenaltyEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )

  return payPenaltyEvent
}

export function createRecoveredEvent(
  token: Address,
  amount: BigInt
): Recovered {
  let recoveredEvent = changetype<Recovered>(newMockEvent())

  recoveredEvent.parameters = new Array()

  recoveredEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  recoveredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return recoveredEvent
}

export function createRecoveredNFTEvent(
  tokenAddress: Address,
  tokenId: BigInt
): RecoveredNFT {
  let recoveredNftEvent = changetype<RecoveredNFT>(newMockEvent())

  recoveredNftEvent.parameters = new Array()

  recoveredNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  recoveredNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return recoveredNftEvent
}

export function createRelockEvent(
  caller: Address,
  receiver: Address,
  assets: BigInt,
  newUnlockDate: BigInt
): Relock {
  let relockEvent = changetype<Relock>(newMockEvent())

  relockEvent.parameters = new Array()

  relockEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  relockEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  relockEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  relockEvent.parameters.push(
    new ethereum.EventParam(
      "newUnlockDate",
      ethereum.Value.fromUnsignedBigInt(newUnlockDate)
    )
  )

  return relockEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createWithdrawEvent(
  caller: Address,
  receiver: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}
