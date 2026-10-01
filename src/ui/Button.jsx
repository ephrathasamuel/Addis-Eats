export default function Button({
  children,
  variant = 'primary',
  as: Component = 'button',
  ...props
}) {
  const className = `btn ${variant === 'secondary' ? 'secondary' : ''}`.trim()
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}
