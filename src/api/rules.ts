import apiClient from './client'
import type { RuleResult } from '@/types/rule'


export const RULE_CTX = {
  // R04 - 과실비율 (교차로) → info
  accidentType: "교차로",

  // R08 - 12대 중과실 (신호위반) → critical
  majorFault: true,
  majorFaultType: "신호위반",

  // R02 - 전부손해 판정 → critical
  repairCost: 8500000,
  vehicleValue: 10000000,

  // R11 - 신차 감가 → warning
  vehicleAge: 0.3,
  severity: "심각",

  // R09 - 자기부담금 → info
  selfDamage: true,
  damageAmount: 3500000,

  // R13 - 과실 상계 → info
  faultA: 50,
  faultB: 50,
  totalCostB: 8000000,

  // R49 - 견인비용 → info
  towingRequired: true,
}

export const executeRules = async (): Promise<RuleResult[]> => {
  const res = await apiClient.post('/api/v1/rules/execute', RULE_CTX)
  return res.data?.results ?? []
}
