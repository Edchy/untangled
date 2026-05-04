"use client";

import {
  setSwitchIllustrationOn,
  useSwitchIllustrationOn,
} from "@/components/interactive/switch-illustration";

export function InstructionsBody() {
  const on = useSwitchIllustrationOn();
  const paragraphClassName =
    "mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty] first:mt-0";
  const buttonBaseClassName =
    "mx-1 inline-flex min-w-14 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  return (
    <>
      <p className={paragraphClassName}>
        Forget everything you think a computer does.
        <br />
        At its core, a computer only does one thing.
        <br />
        It decides.
        <br />
        Yes or no.
        <br />
        Let electricity through, or don&apos;t.
      </p>

      <div className="mt-5 flex max-w-[60ch] flex-wrap items-center gap-3 py-2 text-[1.0625rem] leading-[1.85] text-foreground/68">
        <button
          type="button"
          onClick={() => setSwitchIllustrationOn(true)}
          aria-pressed={on}
          className={`${buttonBaseClassName} ${
            on
              ? "border-accent bg-accent text-background"
              : "border-accent/45 text-accent hover:border-accent hover:bg-accent/10"
          }`}
        >
          on
        </button>
        <span className="text-foreground/50">or</span>
        <button
          type="button"
          onClick={() => setSwitchIllustrationOn(false)}
          aria-pressed={!on}
          className={`${buttonBaseClassName} ${
            !on
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/35 text-foreground/78 hover:border-foreground/70 hover:bg-foreground/8"
          }`}
        >
          off
        </button>
      </div>

      <p className={paragraphClassName}>
        Everything on your screen, every photo, message, video,
        <br />
        comes down to that one decision, made billions of times a second.
        <br />
        That&apos;s it. That&apos;s the whole thing.
      </p>

      <p className={paragraphClassName}>
        But what actually makes those decisions? How does a computer know when
        to let electricity through, and when not to?
      </p>
    </>
  );
}
