import { optimize } from "svgo";

export async function POST(request: Request) {
  const inputSVG = await request.text();
  if (!inputSVG) {
    return new Response("No SVG input provided", { status: 400 });
  }

  const result = optimize(inputSVG, {
    multipass: true,
  });

  return Response.json({ data: result.data });
}
