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
      <Text>Let us take a minute to check what stuck.</Text>
      <Text className="mt-prose-block">
        <strong className="font-semibold text-foreground/90">
          Three short questions.
        </strong>
        <br />
        No score. No perfect answer.
      </Text>
      <Text className="mt-prose-block">
        Write what you actually think, in your own words. If you can explain it
        simply, you understand more than you might think.
      </Text>

      <div className="mt-10 flex items-center justify-start gap-8">
        {nextHref && (
          <Button
            onClick={() =>
              router.push(nextHref, { transitionTypes: ["nav-forward"] })
            }
            variant="subtle"
            size="md"
            className="gap-2 tracking-wide"
          >
            Start →
          </Button>
        )}
      </div>
    </div>
  );
}
