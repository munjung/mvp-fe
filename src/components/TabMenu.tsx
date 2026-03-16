import './TabMenu.css'

const TABS = ['견적 산정', '대인피해', '과실 산정']

interface TabMenuProps {
  active: number
  onChange: (index: number) => void
}

function TabMenu({ active, onChange }: TabMenuProps) {
  return (
    <nav className="tab-menu">
      {TABS.map((tab, index) => (
        <button
          key={tab}
          className={`tab-item${active === index ? ' tab-item--active' : ''}`}
          onClick={() => onChange(index)}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default TabMenu
