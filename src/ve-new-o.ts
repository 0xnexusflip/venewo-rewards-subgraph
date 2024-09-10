import { BigInt } from "@graphprotocol/graph-ts"
import {
  VeNewO,
  Burn,
  Deposit,
  Mint,
  PayPenalty,
  Relock,
  Withdraw
} from "../generated/VeNewO/VeNewO"
import { loadOrCreateFactory, loadOrCreateUser } from "./helper"

export function handleBurn(event: Burn): void {
  let userEntity = loadOrCreateUser(event.params.user)
  let factoryEntity = loadOrCreateFactory(event.address)

  userEntity.allTimeUserSharesBurned = userEntity.allTimeUserSharesBurned.plus(event.params.shares)

  if (userEntity.currentUserShares.minus(event.params.shares).ge(BigInt.fromI32(0))) {
    userEntity.currentUserShares = userEntity.currentUserShares.minus(event.params.shares)
  }
  else {
    userEntity.currentUserShares = BigInt.fromI32(0)
  }

  factoryEntity.allTimeSharesBurned = factoryEntity.allTimeSharesBurned.plus(event.params.shares)

  if(factoryEntity.currentSharesMinted.minus(event.params.shares).ge(BigInt.fromI32(0))) {
    factoryEntity.currentSharesMinted = factoryEntity.currentSharesMinted.minus(event.params.shares)
  }
  else {
    factoryEntity.currentSharesMinted = BigInt.fromI32(0)
  }

  userEntity.save()
  factoryEntity.save()
}

export function handleDeposit(event: Deposit): void {
  let userEntity = loadOrCreateUser(event.params.owner)
  let factoryEntity = loadOrCreateFactory(event.address)
  
  let contract = VeNewO.bind(event.address)

  userEntity.allTimeUserDeposit = userEntity.allTimeUserDeposit.plus(event.params.assets)
  userEntity.currentUserDeposit = userEntity.currentUserDeposit.plus(event.params.assets)

  userEntity.lockDate = event.block.timestamp
  userEntity.lockBlock = event.block.number
  userEntity.unlockDate = contract.unlockDate(event.params.owner)
  userEntity.lockDuration = contract.unlockDate(event.params.owner).minus(event.block.timestamp)

  factoryEntity.allTimeDeposit = factoryEntity.allTimeDeposit.plus(event.params.assets)
  factoryEntity.currentDeposit = factoryEntity.currentDeposit.plus(event.params.assets)

  userEntity.save()
  factoryEntity.save()
}

export function handleMint(event: Mint): void {
  let userEntity = loadOrCreateUser(event.params.user)
  let factoryEntity = loadOrCreateFactory(event.address)

  userEntity.allTimeUserSharesMinted = userEntity.allTimeUserSharesMinted.plus(event.params.shares)
  userEntity.currentUserShares = userEntity.currentUserShares.plus(event.params.shares)

  factoryEntity.allTimeSharesMinted = factoryEntity.allTimeSharesMinted.plus(event.params.shares)
  factoryEntity.currentSharesMinted = factoryEntity.currentSharesMinted.plus(event.params.shares)

  userEntity.save()
  factoryEntity.save()
}

export function handlePayPenalty(event: PayPenalty): void {
  let userEntity = loadOrCreateUser(event.params.owner)
  let factoryEntity = loadOrCreateFactory(event.address)

  if (factoryEntity.currentDeposit.minus(event.params.assets).ge(BigInt.fromI32(0))) {
    factoryEntity.currentDeposit = factoryEntity.currentDeposit.minus(event.params.assets)
  }
  else {
    factoryEntity.currentDeposit = BigInt.fromI32(0)
  }

  if (userEntity.currentUserDeposit.minus(event.params.assets).ge(BigInt.fromI32(0))) {
    userEntity.currentUserDeposit = userEntity.currentUserDeposit.minus(event.params.assets)
  }
  else {
    userEntity.currentUserDeposit = BigInt.fromI32(0)
  }

  factoryEntity.save()
  userEntity.save()
}

export function handleRelock(event: Relock): void {
  let userEntity = loadOrCreateUser(event.params.receiver)
  let factoryEntity = loadOrCreateFactory(event.address)

  userEntity.allTimeUserDeposit = userEntity.allTimeUserDeposit.plus(event.params.assets)

  userEntity.unlockDate = event.params.newUnlockDate
  userEntity.lockDuration = event.params.newUnlockDate.minus(userEntity.lockDate)

  factoryEntity.allTimeDeposit = factoryEntity.allTimeDeposit.plus(event.params.assets)

  userEntity.save()
  factoryEntity.save()
}

export function handleWithdraw(event: Withdraw): void {
  let userEntity = loadOrCreateUser(event.params.receiver)
  let factoryEntity = loadOrCreateFactory(event.address)

  if (userEntity.currentUserDeposit.minus(event.params.assets).ge(BigInt.fromI32(0))) {
    userEntity.currentUserDeposit = userEntity.currentUserDeposit.minus(event.params.assets)
  }
  else {
    userEntity.currentUserDeposit = BigInt.fromI32(0)

    userEntity.lockDate = BigInt.fromI32(0)
    userEntity.unlockDate = BigInt.fromI32(0)
    userEntity.lockDuration = BigInt.fromI32(0)
  }

  if (factoryEntity.currentDeposit.minus(event.params.assets).ge(BigInt.fromI32(0))) {
    factoryEntity.currentDeposit = factoryEntity.currentDeposit.minus(event.params.assets)
  }
  else {
    factoryEntity.currentDeposit = BigInt.fromI32(0)
  }

  userEntity.save()
  factoryEntity.save()
}