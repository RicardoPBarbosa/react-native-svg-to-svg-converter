"use client";

import { Download } from "lucide-react";

import { useSvgConverter } from "@/context";
import { Button } from "./ui/button";
import { track } from "@/lib/tracking";

export default function DownloadSVG() {
  const {
    state: { outputCode, fileName },
  } = useSvgConverter();

  const handleDownload = () => {
    if (!outputCode) return;

    track("Download SVG");

    const blob = new Blob([outputCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 w-full h-20 flex justify-center items-center bg-white border-t">
      <Button
        onClick={handleDownload}
        disabled={!outputCode}
        size="lg"
        className="!px-10 py-6"
      >
        <Download className="w-4 h-4 mr-2" />
        Download SVG
      </Button>
    </div>
  );
}
