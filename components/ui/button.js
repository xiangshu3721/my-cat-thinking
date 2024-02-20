export function Button({ variant, children, ...props }) {
  const outlineStyles = 'bg-white border-2 border-black text-black hover:bg-gray-100';
  const baseStyles = 'inline-flex items-center justify-center p-2 rounded';

  const className = variant === 'outline' ? `${baseStyles} ${outlineStyles}` : baseStyles;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}