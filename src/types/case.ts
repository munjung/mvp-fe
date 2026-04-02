import type { Brand, Model } from './brand'
import type { DamageParts } from './damage'

export interface UseCase {
  id: number
  name: string
}

export interface UseCaseDetail {
  ownVehicle?: UseCaseVehicle[]
  otherVehicle?: UseCaseVehicle[]
}

export interface UseCaseVehicle {
  vehicleId: string
  vehicleType: string
  damageDegree: string
  fuelType: string
  engineCc: string
  price: number
  brand: Brand
  model: Model
  damageParts?: DamageParts[]
}
