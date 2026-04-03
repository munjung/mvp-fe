import { useLodingStore } from "@/store/loadingStore"

export default function BaseLoader() {
    const isLoading = useLodingStore((s) => s.count > 0)
    if (!isLoading) return null

    return (
      <>
        {/* 상단 로딩 바 */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 3, background: '#0891b2', zIndex: 9999,
          animation: 'loading-bar 1s ease infinite'
        }} />

        {/* 전체 화면 오버레이 */}
        {/* <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 9998,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 44, height: 44,
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid #fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div> */}
      </>
    )
}