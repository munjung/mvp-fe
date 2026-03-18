interface Props {
  tabs: string[]
  active: number
  onChange: (index: number) => void
}

export default function BaseTab({ tabs, active, onChange }: Props) {
  return (
    <nav className="tab-menu">
      {tabs.map((tab, index) => (
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
