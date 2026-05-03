export async function POST(req: Request) {
  const { answers } = await req.json();
  console.log("Answers received:", answers);

  return new Response(
    "Looks good — AI feedback will appear here once wired up.",
    { headers: { "Content-Type": "text/plain" } },
  );
}
