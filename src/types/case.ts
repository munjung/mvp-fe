import type { Brand, Model } from './brand'
import type { DamageCategory } from './damage'

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
  damageParts?: DamageCategory[]
}

// AI 분석 전달용 파라미터
export interface UseCaseParam {
  id?: number | string
  ownVehicle?: UseCaseVehicle
  otherVehicle?: UseCaseVehicle
}
