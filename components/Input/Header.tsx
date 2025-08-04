import { FileCode } from "lucide-react";

import { CardTitle, CardDescription } from "../ui/card";

export default function InputHeader() {
  return (
    <>
      <CardTitle className="flex items-center text-left gap-2 md:text-lg">
        <FileCode className="w-5 h-5 flex-none" />
        React Native SVG Input
      </CardTitle>
      <CardDescription className="hidden md:block">
        Paste your React Native SVG component code here
      </CardDescription>
    </>
  );
}
