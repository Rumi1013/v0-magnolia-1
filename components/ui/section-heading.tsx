interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  labelColor?: string
  titleColor?: string
  descriptionColor?: string
  centered?: boolean
}

export function SectionHeading({
  label,
  title,
  description,
  labelColor = "text-rich-gold",
  titleColor = "text-magnolia-white",
  descriptionColor = "text-magnolia-white/90",
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <p className={`font-accent text-sm tracking-wider uppercase mb-2 ${labelColor}`}>{label}</p>
      <h2 className={`font-heading text-3xl md:text-4xl mb-4 ${titleColor}`}>{title}</h2>
      {description && <p className={`font-body max-w-2xl mx-auto ${descriptionColor}`}>{description}</p>}
    </div>
  )
}
