import type { LucideIcon } from 'lucide-react';

interface PortalIconProps {
  icon: LucideIcon;
  className?: string;
  strokeWidth?: number;
  /**
   * Adds a translucent fill inside closed glyph shapes for a stronger,
   * duotone-style treatment. Only use with icons built from closed paths.
   */
  duotone?: boolean;
}

export function PortalIcon({
  icon: Icon,
  className = 'size-5',
  strokeWidth = 2.25,
  duotone = false,
}: PortalIconProps) {
  return (
    <Icon
      aria-hidden="true"
      className={className}
      strokeWidth={strokeWidth}
      {...(duotone ? { fill: 'currentColor', fillOpacity: 0.18 } : {})}
    />
  );
}
