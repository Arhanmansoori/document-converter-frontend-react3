import React from "react";

const InfrixMark = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 48" role="img" aria-label="Infrix Technologies" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="infrix-blue" x1="8" y1="6" x2="58" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#004ee8" /><stop offset="1" stopColor="#13a7ff" /></linearGradient></defs>
    <circle cx="14" cy="8" r="5" fill="url(#infrix-blue)" />
    <path d="M9 17h10v22c-3.2 3.2-6.5 4.9-10 5.5V17Z" fill="#071b4f" />
    <path d="M23 16h10l10 11-8 8-12-19Z" fill="#0059eb" />
    <path d="M16 45C32 41 38 25 53 15h8C43 28 36 44 16 45Z" fill="url(#infrix-blue)" />
    <path d="M45 34l7-7 10 14H52L45 34Z" fill="#071b4f" />
    <rect x="53" y="7" width="4" height="4" fill="#12a7ff" /><rect x="58" y="2" width="3" height="3" fill="#12a7ff" />
  </svg>
);

export default InfrixMark;
