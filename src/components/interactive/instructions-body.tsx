"use client";

import {
  setSwitchIllustrationOn,
  useSwitchIllustrationOn,
} from "@/components/interactive/switch-illustration";
import { Button } from "@/components/ui/button";
import { proseParagraphClassName } from "@/components/ui/prose";

export function InstructionsBody() {
  const on = useSwitchIllustrationOn();

  return (
    <>
      <p className={proseParagraphClassName}>
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

      <div className="mt-prose-block flex max-w-[60ch] flex-wrap items-center gap-3 py-2 font-body text-body leading-[var(--ds-leading-body)] text-foreground/68">
        <Button
          variant="toggle"
          size="sm"
          onClick={() => setSwitchIllustrationOn(true)}
          aria-pressed={on}
          className="min-w-14"
        >
          on
        </Button>
        <span className="text-foreground/50">or</span>
        <Button
          variant="toggle"
          size="sm"
          onClick={() => setSwitchIllustrationOn(false)}
          aria-pressed={!on}
          className="min-w-14"
        >
          off
        </Button>
      </div>

      <p className={proseParagraphClassName}>
        Everything on your screen, every photo, message, video,
        <br />
        comes down to that one decision, made billions of times a second.
        <br />
        That&apos;s it. That&apos;s the whole thing.
      </p>

      <p className={proseParagraphClassName}>
        But what actually makes those decisions? How does a computer know when
        to let electricity through, and when not to?
      </p>
    </>
  );
}
