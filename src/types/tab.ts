import type { UseCaseVehicle } from './case'

export interface ParamObject {
  id: string
  name: string
  obj1: string
  brandCd: string
  damageCds: string[]
  ownVehicle?: UseCaseVehicle[]
  otherVehicle?: UseCaseVehicle[]
}
