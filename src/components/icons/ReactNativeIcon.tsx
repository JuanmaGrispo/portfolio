import type { SVGProps } from "react";

/**
 * Marca React Native (misma forma que React / React Native). No está en react-icons/si en esta versión.
 * @see https://commons.wikimedia.org/wiki/File:React-icon.svg
 */
export function ReactNativeIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}
