export function IcebergIllustration() {
  return (
    <div className="flex w-full items-center justify-center" aria-hidden>
      <svg
        viewBox="0 0 420 360"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-md text-foreground"
      >
        <defs>
          <filter id="iceberg-roughen" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="4"
              seed="12"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern
            id="iceberg-hatch"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-22)"
          >
            <line x1="0" y1="0" x2="0" y2="18" stroke="currentColor" strokeOpacity="0.08" />
          </pattern>
        </defs>

        <g filter="url(#iceberg-roughen)" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M44 142 C94 132 132 139 178 134 C232 128 276 134 376 124"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.44"
            strokeWidth="2"
          />
          <path
            d="M134 139 L190 54 L250 138 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M134 139 L190 54 L206 139 Z"
            fill="currentColor"
            opacity="0.045"
            stroke="none"
          />
          <path
            d="M206 139 L222 96 L250 138"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />

          <path
            d="M87 151 L333 141 L278 299 L187 330 L111 261 Z"
            fill="url(#iceberg-hatch)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M87 151 L181 209 L187 330 L111 261 Z"
            fill="currentColor"
            opacity="0.035"
            stroke="none"
          />
          <path
            d="M333 141 L238 216 L187 330 L278 299 Z"
            fill="currentColor"
            opacity="0.06"
            stroke="none"
          />
          <path
            d="M181 209 L224 151 L238 216 L187 330"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1.4"
          />
          <path
            d="M126 186 L181 209 L238 216 L294 172"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1.4"
          />
          <path
            d="M64 166 C112 176 151 169 196 174 C249 180 291 171 356 161"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.74"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
