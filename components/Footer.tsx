import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="absolute flex top-0 right-0 h-20">
      <a
        target="_blank"
        href="https://github.com/RicardoPBarbosa/react-native-svg-to-svg-converter"
        className="flex items-center gap-1 px-3 sm:px-6 md:px-8 border-b border-x h-full hover:bg-gray-50"
        tabIndex={-1}
      >
        <span className="font-medium text-sm hidden md:block">
          View on GitHub
        </span>
        <Github className="size-6" />
      </a>
    </div>
  );
}
