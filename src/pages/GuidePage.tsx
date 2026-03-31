import { useState } from 'react'
import {
  BaseButton,
  BaseCheckbox,
  BaseRadio,
  BaseSelect,
  BaseMultiSelect,
  BaseMultiSelectChip,
  BaseInput,
  BaseSection,
  BaseTextarea,
  BaseFormField,
  BaseTab,
  BaseTabHeader,
  BaseFileUpload,
  BasePopup,
  BaseChat,
} from '@components/common'
import { alert, confirm } from '@/lib/dialog'

const radioOptions = [
  { label: '전체', value: '' },
  { label: '국산', value: 'domestic' },
  { label: '외산', value: 'imported' },
]

const selectOptions = [
  { label: '현대', value: 'hyundai' },
  { label: '기아', value: 'kia' },
  { label: '벤츠', value: 'benz' },
]

const multiSelectOptions = [
  { label: '앞범퍼', value: 'front-bumper' },
  { label: '뒷범퍼', value: 'rear-bumper' },
  { label: '문', value: 'door' },
]

const multiSelectChipOptions = [
  { label: '프론트 범퍼(상)', value: 'front-bumper-top' },
  { label: '프론트 범퍼(하부)', value: 'front-bumper-bottom' },
  { label: '본넷', value: 'hood' },
  { label: '프론트 그릴', value: 'front-grill' },
  { label: '라디에이터', value: 'radiator' },
  { label: '인터쿨러', value: 'intercooler' },
  { label: '좌 헤드라이트', value: 'left-headlamp' },
  { label: '우 헤드라이트', value: 'right-headlamp' },
]

const tabs = ['견적 산정', '대인 피해', '과실 산정', '처리 방법', '기타']

const tabHeaderOptions = [
  { label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case1' },
  { label: 'Case 2: sample case 2', value: 'case2' },
  { label: 'Case 2: sample case 3', value: 'case3' },
]

const badgesOptions = [
  { key: 'estimate', label: '견적 산정', color: '#4a3c98', bg: '#f0edff' },
  { key: 'damage', label: '대인 피해', color: '#c92a2a', bg: '#fff5f5' },
  { key: 'fault', label: '과실 산정', color: '#2b8a3e', bg: '#e6f4ea' },
]

type ChatBlock = {
  id: number
  html: string
}

const chatSampleData: ChatBlock[] = [
  {
    id: 0,
    html: `
    <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 9px;"><div style="width: 22px; height: 22px; border-radius: 50%; background: rgb(8, 145, 178); display: flex; align-items: center; justify-content: center; color: rgb(255, 255, 255);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 014 4v2h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h2V6a4 4 0 014-4z"></path><circle cx="9" cy="14" r="1" fill="currentColor"></circle><circle cx="15" cy="14" r="1" fill="currentColor"></circle></svg></div><span style="font-size: 13px; font-weight: 700;">AI 분석</span></div>
    `,
  },
  {
    id: 1,
    html: `
  <div style="display: flex; gap: 0px; margin-bottom: 12px; background: rgb(241, 245, 249); border-radius: 10px; padding: 3px;"><button style="flex: 1 1 0%; padding: 8px 6px; border-radius: 8px; border: none; cursor: pointer; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 4px; transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 2px;"><span style="font-size: 11px; font-weight: 700; color: rgb(8, 145, 178);">🚙 타사 (BMW 7시리즈)</span><span style="font-size: 8.5px; color: rgb(100, 116, 139);">₩25M 청구 검증</span></button><button style="flex: 1 1 0%; padding: 8px 6px; border-radius: 8px; border: none; cursor: pointer; background: transparent; box-shadow: none; transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 2px;"><span style="font-size: 11px; font-weight: 500; color: rgb(148, 163, 184);">🚗 자사 (그랜저)</span><span style="font-size: 8.5px; color: rgb(203, 213, 225);">₩5M 수리비</span></button><button style="flex: 1 1 0%; padding: 8px 6px; border-radius: 8px; border: none; cursor: pointer; background: transparent; box-shadow: none; transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 2px;"><span style="font-size: 11px; font-weight: 500; color: rgb(148, 163, 184);">📊 보험사 총 지출</span><span style="font-size: 8.5px; color: rgb(203, 213, 225);">시나리오 비교</span></button></div>
    `,
  },
  {
    id: 2,
    html: `
      <div style="font-size: 12.5px;"><div style="line-height: 1.75;"><h3 style="color: rgb(15, 23, 42); margin: 13px 0px 5px; font-size: 14.5px; font-weight: 700;">🤖 AI 견적 검증 리포트 — BMW 7시리즈 740i (타사 B차)</h3><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">📋 차량 정보</h4><div style="overflow-x: auto; margin: 8px 0px;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;"><thead><tr style="border-bottom: 2px solid rgb(226, 232, 240);"><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">항목</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">내용</th></tr></thead><tbody><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">차종</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(30, 64, 175); font-weight: 700;">BMW 740i xDrive M Sport</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">연식</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">2023년 (약 2년)</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">주행거리</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">약 15,000km</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">차량가액</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">약 <strong style="color: rgb(8, 145, 178); font-weight: 800;">₩85,000,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">국산/외산</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">외산</strong> (부품 ×1.6 배수 적용)</td></tr></tbody></table></div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">📊 타사 청구 vs AI 적정 비교</h4><div style="height: 4px;"></div><div style="overflow-x: auto; margin: 8px 0px;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;"><thead><tr style="border-bottom: 2px solid rgb(226, 232, 240);"><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">파손 부위</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">타사 청구</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">수리방법(타사)</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">AI 적정</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">수리방법(AI)</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">차이</strong></th></tr></thead><tbody><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 범퍼 ASSY</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩1,700,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 범퍼(하/립)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩650,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩550,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">우 프론트 펜더</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,400,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩800,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">우 헤드라이트(LED)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체 ✅</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩0</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 그릴</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩600,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">본넷(후드)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장 *(범퍼에 포함)*</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩2,800,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">라디에이터+에어컨</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체 ✅</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩0</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">도장 (4면)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,100,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩1,100,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">공임비</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩4,600,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,650,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩1,950,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">합계</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(8, 145, 178); font-weight: 800;">₩25,000,000</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(8, 145, 178); font-weight: 800;">₩15,500,000</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩9,500,000</strong></td></tr></tbody></table></div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">🔍 과다 청구 항목 분석</h4><div style="height: 4px;"></div><p style="margin: 5px 0px; color: rgb(15, 23, 42); font-weight: 700;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">1. 프론트 범퍼 ASSY (₩3.5M → ₩1.8M, ▼₩1.7M)</strong></p><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>타사 주장: 범퍼 전체 ASSY 교체 필요</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>AI 판단: 사진 분석 결과 <strong style="color: rgb(15, 23, 42); font-weight: 700;">우측 하단 변형</strong> 수준 → 판금+부분도장으로 복원 가능</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>BMW 740i 순정 범퍼 ASSY 가격 ₩2,800,000 + 공임 ₩700,000 = ₩3,500,000 청구는 <strong style="color: rgb(220, 38, 38); font-weight: 800;">교체 전제 시에도 ₩200,000 과다</strong></div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>근거: 범퍼 변형 깊이 8mm 이하 → 보험개발원 경미손상 3유형 해당 가능</div><div style="height: 4px;"></div><p style="margin: 5px 0px; color: rgb(15, 23, 42); font-weight: 700;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">2. 우 프론트 펜더 (₩2.2M → ₩1.4M, ▼₩800K)</strong></p><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>타사 주장: 펜더 교체 + 도장</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>AI 판단: 찌그러짐이 있으나 <strong style="color: rgb(15, 23, 42); font-weight: 700;">판금 복원 가능 수준</strong> (절단선 없음)</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>외산 ×1.6 적용해도 판금 가격이 적정</div><div style="height: 4px;"></div><p style="margin: 5px 0px; color: rgb(15, 23, 42); font-weight: 700;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">3. 도장비 (₩3.2M → ₩2.1M, ▼₩1.1M)</strong></p><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>타사: 4면 전면도장 청구 (범퍼+펜더+그릴+헤드라이트 주변)</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>AI: 범퍼+펜더 2면 + 블렌딩 1면 = 3면 적정</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>BMW 외산 도장 배수 ₩700,000/면 기준 3면 = ₩2,100,000</div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">⚠️ ADAS 캘리브레이션</h4><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>프론트 범퍼 수리/교체 → <strong style="color: rgb(8, 145, 178); font-weight: 700;">전방 레이더 캘리브레이션 필수</strong></div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>헤드라이트 교체 → <strong style="color: rgb(15, 23, 42); font-weight: 700;">라이트 에이밍 + 카메라 캘리브레이션</strong></div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>예상 비용: <strong style="color: rgb(8, 145, 178); font-weight: 800;">₩450,000</strong> (BMW 전용 장비)</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>⚡ 타사 청구에 캘리브레이션 비용 미포함 → 추가 청구 가능성 있음</div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">🚗 렌트(대차) 동종동급 검증</h4><div style="overflow-x: auto; margin: 8px 0px;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;"><thead><tr style="border-bottom: 2px solid rgb(226, 232, 240);"><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">항목</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">타사 요구</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">AI 적정</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">차이</strong></th></tr></thead><tbody><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">대차 차종</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">BMW 7시리즈 동급</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">BMW <strong style="color: rgb(15, 23, 42); font-weight: 700;">5시리즈</strong> 동급</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">등급 정정</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">일 렌트비</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩375,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩225,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩150,000/일</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">예상 수리 기간</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">21일</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">21일 (외산 부품 수급 고려)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">동일</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">렌트 총 비용</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(8, 145, 178); font-weight: 800;">₩7,875,000</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(8, 145, 178); font-weight: 800;">₩4,725,000</strong></td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩3,150,000</strong></td></tr></tbody></table></div><div style="height: 4px;"></div><div style="border-left: 3px solid rgb(8, 145, 178); background: rgb(240, 253, 250); padding: 10px 14px; margin: 8px 0px; border-radius: 0px 8px 8px 0px;"><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 400;">⚖️ 대법원 동종동급 원칙: 피해 차량과 <strong style="color: rgb(15, 23, 42); font-weight: 700;">동종의 동급</strong> 차량 렌트비만 인정.</div><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 400;">7시리즈는 대형 세단이나, 일상 이동 목적 대차는 <strong style="color: rgb(15, 23, 42); font-weight: 700;">5시리즈(중대형)</strong>가 동종동급에 해당.</div></div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">💵 미수선(현금정산) 제안</h4><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>타사 고객이 현금 정산 희망 시: 적정 견적 ₩15,500,000의 70~80%</div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span><strong style="color: rgb(15, 23, 42); font-weight: 700;">현금정산 범위: ₩10,850,000 ~ ₩12,400,000</strong></div><div style="padding-left: 14px; margin: 2px 0px; color: rgb(71, 85, 105);"><span style="color: rgb(8, 145, 178); margin-right: 7px; font-size: 8px;">●</span>단, 심각 파손이므로 안전 관련 부위(라디에이터, ADAS)는 수리 권고</div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">✅ 종합 의견</h4><div style="border-left: 3px solid rgb(8, 145, 178); background: rgb(240, 253, 250); padding: 10px 14px; margin: 8px 0px; border-radius: 0px 8px 8px 0px;"><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 400;">BMW 7시리즈 수리비 ₩25,000,000 청구 중 <strong style="color: rgb(8, 145, 178); font-weight: 800;">₩9,500,000이 과다</strong>.</div><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 400;">범퍼·펜더는 판금 복원 가능하나 교체로 청구, 도장 면수 과다 산정.</div><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 700;"><strong style="color: rgb(5, 150, 105); font-weight: 800;">AI 적정가 ₩15,500,000 + ADAS ₩450,000 + 렌트 ₩4,725,000 = 총 ₩20,675,000</strong></div><div style="margin: 2px 0px; color: rgb(19, 78, 74); font-size: 12px; font-weight: 400;">(타사 주장 ₩32,875,000 대비 <strong style="color: rgb(8, 145, 178); font-weight: 800;">₩12,200,000 절감</strong>)</div></div></div></div>
    `,
  },
]

export default function GuidePage() {
  const [checked, setChecked] = useState(false)
  const [radioVal, setRadioVal] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [multiSelectVal, setMultiSelectVal] = useState<string[]>([])
  const [chips, setChips] = useState<string[]>([])
  const [inputVal, setInputVal] = useState('')
  const [textVal, setTextVal] = useState('')
  const [tabVal, setTabVal] = useState(0)
  const [tabHeaderVal, setTabHeaderVal] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [popupOpen, setPopupOpen] = useState(false)

  const [chatStart, setChatStart] = useState(false)
  const [chatData, setChatData] = useState<ChatBlock[]>([])

  const handleAlert = async () => {
    await alert('확인')
  }

  const handleConfirm = async () => {
    if (await confirm('내용', { title: '타이틀' })) {
      await alert('확인되었습니다.')
    } else {
      await alert('취소되었습니다.')
    }
  }

  const handleChat = () => {
    if (!chatStart) {
      setChatStart(true)
      setChatData(chatSampleData)
    }
  }

  return (
    <div className="page">
      {/* ================= 기본 컴포넌트 ================= */}
      <h2 className="mt-20 mb-20">기본 컴포넌트</h2>
      <BaseSection title="기본 컴포넌트">
        <div className="grid-1">
          <p>* 버튼 + Alert + Confirm</p>
          <BaseButton onClick={handleAlert}>Alert</BaseButton>
          <BaseButton onClick={handleConfirm}>Confirm</BaseButton>

          <p>* 체크박스</p>
          <BaseSection>
            <BaseCheckbox
              label="📹 블랙박스 영상"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </BaseSection>

          <p>* 라디오</p>
          <BaseRadio options={radioOptions} value={radioVal} onChange={setRadioVal} />

          <p>* 셀렉트</p>
          <BaseSelect
            options={selectOptions}
            value={selectVal}
            onChange={setselectVal}
            placeholder="선택"
          />

          <p>* 다중 셀렉트1</p>
          <BaseMultiSelect
            options={multiSelectOptions}
            value={multiSelectVal}
            onChange={setMultiSelectVal}
            placeholder="선택"
          />

          <p>* 다중 셀렉트2</p>
          <BaseMultiSelectChip
            label="전면부"
            options={multiSelectChipOptions}
            value={chips}
            onChange={setChips}
          />

          <p>* 파일업로드</p>
          <BaseFileUpload
            value={files}
            onChange={setFiles}
            multiple
            maxSize={5 * 1024 * 1024}
            accept={{
              'image/*': ['.jpg', '.jpeg', '.png'],
              'application/pdf': ['.pdf'],
            }}
            placeholder="이미지 또는 PDF 파일을 업로드하세요."
          />

          <p>* 탭</p>
          <BaseTab tabs={tabs} active={tabVal} onChange={(index) => setTabVal(index)}></BaseTab>

          <p>* 탭 헤더</p>
          <BaseTabHeader
            title="견적 산정"
            activeKey="damage"
            badges={badgesOptions}
            selectOptions={tabHeaderOptions}
            selectedValue={tabHeaderVal}
            onSelectChange={setTabHeaderVal}
            onLoad={() => console.log('불러오기')}
            onReset={() => setTabHeaderVal('')}
            onViewSituation={() => console.log('상황 보기')}
          />

          <div>
            <p>* 팝업</p>
            <BaseButton onClick={() => setPopupOpen(true)}>팝업 열기</BaseButton>
            <BasePopup
              show={popupOpen}
              title="팝업 타이틀 입력"
              width="35%"
              height="70%"
              showCloseButton={true} // 우측 상단 x 버튼
              showConfirm={true} // 하단 확인 버튼
              showCancel={true} // 하단 취소 버튼
              onCancel={() => setPopupOpen(false)}
              onConfirm={() => setPopupOpen(false)}
              onClose={() => setPopupOpen(false)}
            >
              <p>팝업 내용 입력</p>
            </BasePopup>
          </div>
        </div>
      </BaseSection>

      {/* ================= 폼 예시 ================= */}
      <h2 className="mt-20 mb-20">폼 예시</h2>
      <BaseSection title="차량 정보">
        {/* 차량 타입 */}
        <BaseRadio options={radioOptions} value={radioVal} onChange={setRadioVal} />

        {/* 2열 */}
        <div className="grid-2">
          <BaseFormField label="제조사" required>
            <BaseSelect
              options={selectOptions}
              value={selectVal}
              onChange={setselectVal}
              placeholder="선택"
            />
          </BaseFormField>

          <BaseFormField label="모델" required>
            <BaseSelect options={[]} value={''} onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="연식">
            <BaseSelect options={[]} value={''} onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="주행거리 (km)">
            <BaseInput
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="입력"
            />
          </BaseFormField>
        </div>

        {/* 3열 */}
        <div className="grid-3">
          <BaseFormField label="입력1">
            <BaseSelect
              options={selectOptions}
              value={selectVal}
              onChange={setselectVal}
              placeholder="선택"
            />
          </BaseFormField>

          <BaseFormField label="입력2">
            <BaseSelect options={[]} value="" onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="입력3">
            <BaseSelect options={[]} value="" onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="입력4">
            <BaseInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </BaseFormField>

          <BaseFormField label="입력5">
            <BaseInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </BaseFormField>
        </div>

        <BaseFormField label="내용">
          <BaseTextarea
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </BaseFormField>
      </BaseSection>

      {/* ================= 폼 예시 ================= */}
      <h2 className="mt-20 mb-20">AI 분석</h2>
      <BaseSection title="">
        <BaseButton onClick={handleChat}>분석시작</BaseButton>

        <BaseChat width="500" start={chatStart} chatData={chatData}></BaseChat>
      </BaseSection>
    </div>
  )
}
