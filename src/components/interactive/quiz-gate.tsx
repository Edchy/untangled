"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

interface Props {
  nextHref?: string;
}

export function QuizGate({ nextHref }: Props) {
  const router = useRouter();

  return (
    <div className="w-full max-w-2xl">
      <Text>
        Three questions.
      </Text>
      <Text className="mt-prose-block">
        Write what you actually think — in your own words.
        There&apos;s no score.
      </Text>

      <div className="mt-10 flex items-center justify-end gap-8">
        {nextHref && (
          <Button
            onClick={() => router.push(nextHref, { transitionTypes: ["nav-forward"] })}
            variant="quiet"
            size="sm"
            className="px-0 tracking-wide text-foreground/80 hover:text-foreground"
          >
            Start →
          </Button>
        )}
      </div>
    </div>
  );
}
