import { Eye } from "lucide-react";

import { CardDescription, CardTitle } from "../ui/card";

export default function SVGPreviewHeader() {
  return (
    <>
      <CardTitle className="flex items-center text-left gap-2 md:text-lg">
        <Eye className="size-5 flex-none" />
        SVG Preview
      </CardTitle>
      <CardDescription className="hidden md:block">
        Live preview of your SVG
      </CardDescription>
    </>
  );
}
