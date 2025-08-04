"use client";

import dynamic from "next/dynamic";

import { useSvgConverter } from "@/context";

const MonacoEditor = dynamic(() => import("../MonacoEditor"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-50 animate-pulse rounded-md" />,
});

export default function InputEditor() {
  const {
    state: { inputCode },
    setInputCode,
  } = useSvgConverter();

  return (
    <MonacoEditor
      language="javascript"
      value={inputCode}
      setValue={setInputCode}
    />
  );
}
