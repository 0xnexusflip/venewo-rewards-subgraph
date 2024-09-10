import { Address, BigInt } from "@graphprotocol/graph-ts"
import { User, Factory } from "../generated/schema"

export function loadOrCreateUser(address: Address): User {
    let userEntity = User.load(address)
    
    if (!userEntity) {
        userEntity = new User(address)
        userEntity.allTimeUserDeposit = BigInt.fromI32(0)
        userEntity.allTimeUserSharesMinted = BigInt.fromI32(0)
        userEntity.allTimeUserSharesBurned = BigInt.fromI32(0)
        userEntity.currentUserDeposit = BigInt.fromI32(0)
        userEntity.currentUserShares = BigInt.fromI32(0)
        userEntity.lockBlock = BigInt.fromI32(0)
        userEntity.lockDate = BigInt.fromI32(0)
        userEntity.unlockDate = BigInt.fromI32(0)
        userEntity.lockDuration = BigInt.fromI32(0)
    }
    
    return userEntity as User
}

export function loadOrCreateFactory(address: Address): Factory {
    let factoryEntity = Factory.load(address)

    if(!factoryEntity) {
        factoryEntity = new Factory(address)
        factoryEntity.allTimeDeposit = BigInt.fromI32(0)
        factoryEntity.allTimeSharesMinted = BigInt.fromI32(0)
        factoryEntity.allTimeSharesBurned = BigInt.fromI32(0)
        factoryEntity.currentDeposit = BigInt.fromI32(0)
        factoryEntity.currentSharesMinted = BigInt.fromI32(0)
    }

    return factoryEntity as Factory
}