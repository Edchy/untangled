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
            d="M0 90 C78 58 132 82 198 55 C264 28 334 38 392 76 C450 114 515 110 570 70 C629 27 693 24 754 57 C810 87 858 76 920 46"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M0 168 C66 137 132 151 190 179 C258 211 320 193 380 153 C444 111 515 115 574 164 C638 217 704 209 762 163 C814 121 870 123 920 151"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.72"
            strokeWidth="2.6"
          />
          <path
            d="M0 258 C74 229 132 237 196 269 C257 299 330 290 391 246 C456 200 520 206 575 256 C639 313 708 312 764 260 C813 214 867 218 920 245"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
          />
          <path
            d="M116 10 C152 60 184 79 236 76 C306 72 334 114 328 178 C321 251 369 287 444 276 C531 263 574 304 573 360"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.9"
          />
          <path
            d="M782 4 C748 51 711 70 653 62 C579 51 544 88 552 155 C561 226 511 258 443 240 C358 218 310 252 314 356"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.48"
            strokeWidth="1.9"
          />
          <path
            d="M512 105 C584 88 632 111 674 157 C721 209 785 209 920 190"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="1.8"
          />
          <path
            d="M505 286 C586 254 640 278 704 308 C768 338 830 328 920 298"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.44"
            strokeWidth="1.7"
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
