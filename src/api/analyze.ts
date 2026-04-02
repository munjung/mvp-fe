// import apiClient from './client'

export interface ParamObject {
  id: string
  name: string
  obj1: string
  brandCd: string
  damageCds: string[]
  ownVehicle?: Vehicle[]
  otherVehicle?: Vehicle[]
}

export interface Vehicle {
  brand: { id: number; name: string }
  damageDegree: string
}
