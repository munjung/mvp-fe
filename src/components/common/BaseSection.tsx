import type { ReactNode } from 'react'

interface BaseSectionProps {
  title?: string
  children: ReactNode
  className?: string
}

export default function BaseSection({ title, children, className = '' }: BaseSectionProps) {
  return (
    <section className={`base-section ${className}`.trim()}>
      {title && (
        <div className="base-section-header">
          <h3 className="base-section-title">{title}</h3>
        </div>
      )}
      <div className="base-section-body">{children}</div>
    </section>
  )
}
