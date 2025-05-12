interface SectionHeadingProps {
  title: string
  description?: string
  label?: string
  center?: boolean
  titleColor?: string
}

export function SectionHeading({
  title,
  description,
  label,
  center = true,
  titleColor = "text-midnight-blue",
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      {label && (
        <span className="inline-block px-4 py-1 bg-rich-gold/20 rounded-full text-midnight-blue font-accent text-sm mb-4">
          {label}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl ${titleColor} mb-4 drop-shadow-sm`}>{title}</h2>
      {description && <p className="font-body text-midnight-teal/90 max-w-2xl mx-auto">{description}</p>}
    </div>
  )
}
