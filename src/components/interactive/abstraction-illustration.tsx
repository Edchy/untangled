"use client";

import { StandaloneLightSwitch } from "@/components/interactive/light-switch";

export function AbstractionIllustration() {
  return (
    <div className="relative isolate flex h-[360px] w-full items-center justify-center overflow-visible">
      <svg
        viewBox="0 0 920 360"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[120vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-foreground lg:w-[92vw]"
        aria-hidden
      >
        <defs>
          <filter id="switch-cords-roughen" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.031"
              numOctaves="4"
              seed="43"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter="url(#switch-cords-roughen)" opacity="0.25" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M0 78 C74 48 132 72 198 48 C272 21 335 40 382 82 C407 104 425 112 448 115"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M0 170 C66 139 132 151 190 179 C257 211 318 194 382 154 C407 138 429 132 452 134"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.72"
            strokeWidth="2.6"
          />
          <path
            d="M0 262 C74 232 132 238 196 269 C258 300 329 290 390 246 C414 229 432 224 451 226"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M920 48 C859 78 812 88 754 57 C692 24 629 27 570 70 C538 94 514 106 486 112"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M920 151 C870 123 814 121 762 163 C704 209 638 217 574 164 C545 140 518 129 488 133"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.72"
            strokeWidth="2.6"
          />
          <path
            d="M920 245 C867 218 813 214 764 260 C708 312 639 313 575 256 C546 230 518 222 489 226"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M116 10 C152 60 184 79 236 76 C306 72 334 114 328 178 C322 244 363 280 430 277"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.9"
          />
          <path
            d="M782 4 C748 51 711 70 653 62 C579 51 544 88 552 155 C559 214 526 246 480 243"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.48"
            strokeWidth="1.9"
          />
          <path
            d="M430 91 C444 100 453 105 462 111 M430 153 C442 146 452 141 462 138 M430 246 C441 237 451 232 462 229"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="2.2"
          />
          <path
            d="M490 111 C500 104 509 99 522 94 M490 138 C501 134 512 135 524 142 M490 229 C501 232 512 239 524 250"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="2.2"
          />
          <path
            d="M522 105 C588 89 634 113 674 157 C721 209 785 209 920 190"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="1.8"
          />
          <path
            d="M522 286 C590 258 642 279 704 308 C768 338 830 328 920 298"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.44"
            strokeWidth="1.7"
          />
          <path
            d="M438 106 H457 M438 132 H457 M438 224 H457 M486 106 H505 M486 132 H505 M486 224 H505"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="2.4"
          />

          <circle cx="198" cy="55" r="14" fill="var(--background)" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.8" />
          <circle cx="328" cy="178" r="13" fill="var(--background)" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.7" />
          <circle cx="552" cy="155" r="13" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.42" strokeWidth="1.7" />
          <circle cx="754" cy="57" r="14" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.44" strokeWidth="1.8" />
          <circle cx="196" cy="269" r="12" fill="var(--background)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.6" />
          <circle cx="573" cy="334" r="11" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.38" strokeWidth="1.5" />
          <circle cx="314" cy="330" r="11" fill="var(--background)" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
          <path
            d="M184 55 H212 M198 41 V69 M315 178 H341 M328 165 V191 M539 155 H565 M552 142 V168 M740 57 H768 M754 43 V71 M184 269 H208 M196 257 V281 M562 334 H584 M573 323 V345 M303 330 H325 M314 319 V341"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.24"
            strokeWidth="1.4"
          />
          <path
            d="M692 20 L804 20 M724 44 L842 44 M662 306 L830 306 M706 332 L852 332"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.24"
            strokeWidth="1.4"
          />
          <path
            d="M100 34 L176 34 M124 58 L210 58 M72 316 L176 316 M110 338 L232 338"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1.4"
          />
        </g>
      </svg>

      <div className="relative z-10">
        <StandaloneLightSwitch />
      </div>
    </div>
  );
}
