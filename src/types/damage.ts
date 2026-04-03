// 파손 부위 목록 조회 Response
export interface DamageCategory {
  id: number
  category: string
  part?: Part[]
}

export interface Part {
  id: number
  name: string
}

// 파손 가격 계산 Request
export interface DamagePriceRequest {
  ownVehicle: VehicleDto[]
  otherVehicle: VehicleDto[]
}

// 파손 가격 계산 Response
export interface DamagePriceResponse {
  ownVehicle: DamagePriceVehicleDto[]
  otherVehicle: DamagePriceVehicleDto[]
}

export interface VehicleDto {
  vehicleId: string
  damageDegree: string
  damageParts: number[]
  mileage: number
  modelYear: number
}

export interface PriceDto {
  damageDegree: string
  partsCost: number
  laborCost: number
  paintCost: number
}

export interface DamagePricePartDto {
  id: number
  name: string
  price: PriceDto
}

export interface DamagePriceGroupDto {
  id: number
  category: string
  part: DamagePricePartDto[]
}

export interface DamagePriceVehicleDto {
  vehicleId: string
  damageParts: DamagePriceGroupDto[]
}
