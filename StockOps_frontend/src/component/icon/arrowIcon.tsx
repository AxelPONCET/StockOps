import type { SVGProps } from "react";

export function OutlineKeyboardArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50px"
      height="50px"
      aria-labelledby="arrowDownTitle"
      role="img"
      color="#F29340"
      {...props}
    >
      <title id="arrowDownTitle">Chevron vers le bas</title>
      <path
        fill="currentColor"
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
      />
    </svg>
  );
}
