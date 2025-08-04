import { Cog } from "lucide-react";
import React, { useState } from "react";

import { prettify } from "@/lib/helpers";
import { useSvgConverter } from "@/context";
import { Button } from "../ui/button";
import { track } from "@/lib/tracking";

export default function OptimizeSVG() {
  const {
    state: { outputCode },
    setOutputCode,
    setError,
  } = useSvgConverter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!outputCode) return;

    track("Optimize SVG");

    setLoading(true);
    const response = await fetch("/api/svg", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: outputCode,
    });
    setLoading(false);
    if (!response.ok) {
      setError("Failed to optimize SVG");
    }

    const data = await response.json();
    if (data.data) {
      setOutputCode(prettify(data.data));
      setError(null);
    } else {
      setError("No optimized SVG data returned");
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSubmit}
      disabled={!outputCode || loading}
    >
      <Cog className="w-4 h-4 mr-2 hidden md:inline" />
      Optimize <span className="hidden md:inline">SVG</span>
    </Button>
  );
}
