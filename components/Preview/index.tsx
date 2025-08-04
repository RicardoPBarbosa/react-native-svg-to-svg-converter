"use client";

import { Eye } from "lucide-react";

import { useSvgConverter } from "@/context";

export default function SVGPreview() {
  const {
    state: { outputCode, dimensions },
  } = useSvgConverter();

  return (
    <div className="h-full flex-1 bg-gray-50 md:bg-white border-2 border-dashed border-gray-200 rounded-lg overflow-auto">
      {outputCode ? (
        <div className="flex flex-col justify-center-safe items-center gap-y-2 h-full">
          <div
            dangerouslySetInnerHTML={{
              __html: outputCode,
            }}
            className="border border-dashed"
          />
          <span className="text-xs text-slate-500">{`${dimensions.width}x${dimensions.height}`}</span>
        </div>
      ) : (
        <div className="text-gray-400 text-center flex flex-col justify-center-safe items-center h-full">
          <Eye className="size-12 mx-auto mb-2 opacity-50" />
          <p>SVG preview will appear here</p>
        </div>
      )}
    </div>
  );
}
