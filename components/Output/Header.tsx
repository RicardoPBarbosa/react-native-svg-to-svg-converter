import { Code } from "lucide-react";

import { CardTitle, CardDescription } from "../ui/card";

export default function OutputHeader() {
  return (
    <>
      <CardTitle className="flex items-center text-left gap-2 md:text-lg">
        <Code className="w-5 h-5 flex-none" />
        SVG Output
      </CardTitle>
      <CardDescription className="hidden md:inline">
        Edit the converted SVG code
      </CardDescription>
    </>
  );
}
