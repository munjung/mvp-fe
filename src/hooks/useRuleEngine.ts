import { useState } from 'react'
import { executeRules } from '@api/rules'
import type { RuleResult } from '@/types/rule'

export function useRuleEngine() {
  const [ruleResults, setRuleResults] = useState<RuleResult[]>([])
  const [ruleLoading, setRuleLoading] = useState(false)

  const runRules = async () => {
    setRuleLoading(true)
    setRuleResults([])
    try {
      const results = await executeRules()
      setRuleResults(results)
    } catch (e) {
      console.error('Rule Engine 호출 실패', e)
    } finally {
      setRuleLoading(false)
    }
  }

  return { ruleResults, ruleLoading, runRules }
}
