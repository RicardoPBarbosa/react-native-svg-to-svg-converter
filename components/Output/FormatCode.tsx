"use client";

import { Code } from "lucide-react";

import { prettify } from "@/lib/helpers";
import { useSvgConverter } from "@/context";
import { Button } from "../ui/button";
import { track } from "@/lib/tracking";

export default function FormatOutputCode() {
  const {
    state: { outputCode },
    setOutputCode,
    setError,
  } = useSvgConverter();

  const handleFormatCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!outputCode) return;

    track("Format Code");

    try {
      const prettified = prettify(outputCode);
      setOutputCode(prettified);
    } catch {
      setError("Failed to format code");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleFormatCode}
      disabled={!outputCode}
    >
      <Code className="w-4 h-4 mr-2 hidden md:inline" />
      Format <span className="hidden md:inline">code</span>
    </Button>
  );
}
