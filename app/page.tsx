"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Header from "@/components/Header";
import SVGPreview from "@/components/Preview";
import DownloadSVG from "@/components/DownloadSVG";
import OptimizeSVG from "@/components/Output/OptimizeSVG";
import SVGPreviewHeader from "@/components/Preview/Header";
import { InputHeader, InputEditor } from "@/components/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  OutputHeader,
  OutputEditor,
  FormatOutputCode,
} from "@/components/Output";

export default function SVGConverter() {
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({
    input: true,
    output: true,
    preview: true,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderMobileView = () => (
    <div className="block md:hidden h-full">
      {/* Input Section */}
      <Collapsible
        open={openSections.input}
        onOpenChange={() => toggleSection("input")}
      >
        <CollapsibleTrigger className="w-full p-4 bg-white border-b flex items-center justify-between hover:bg-gray-50">
          <InputHeader />
          {openSections.input ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="h-64 p-4 bg-white border-b">
            <InputEditor />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Output Section */}
      <Collapsible
        open={openSections.output}
        onOpenChange={() => toggleSection("output")}
      >
        <CollapsibleTrigger className="w-full p-4 bg-white border-b flex items-center justify-between hover:bg-gray-50">
          <OutputHeader />
          <div className="flex items-center gap-2">
            {openSections.output && (
              <div className="flex gap-1 justify-end flex-wrap">
                <OptimizeSVG />
                <FormatOutputCode />
              </div>
            )}
            {openSections.output ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-white border-b h-64 p-4">
            <OutputEditor />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Preview Section */}
      <Collapsible
        open={openSections.preview}
        onOpenChange={() => toggleSection("preview")}
      >
        <CollapsibleTrigger className="w-full p-4 bg-white border-b flex items-center justify-between hover:bg-gray-50">
          <SVGPreviewHeader />
          {openSections.preview ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="h-64 p-4 bg-white border-b">
            <SVGPreview />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <div className="min-h-screen md:h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex flex-col pb-20">
        {isMobile ? (
          renderMobileView()
        ) : (
          <div className="hidden md:block h-full">
            <PanelGroup direction="horizontal">
              {/* Column 1: React Native SVG Input */}
              <Panel defaultSize={33} minSize={20}>
                <Card className="h-full flex flex-col rounded-none border-0 shadow-none border-r">
                  <CardHeader className="flex-shrink-0 pb-3">
                    <InputHeader />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
                    <div className="flex-1 border rounded-md overflow-hidden">
                      <InputEditor />
                    </div>
                  </CardContent>
                </Card>
              </Panel>

              <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />

              {/* Column 2: SVG Output */}
              <Panel defaultSize={34} minSize={20}>
                <Card className="h-full flex flex-col rounded-none border-0 shadow-none border-r">
                  <CardHeader className="flex-shrink-0 pb-3 gap-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <OutputHeader />
                      </div>
                      <div className="flex gap-1 justify-end flex-wrap">
                        <OptimizeSVG />
                        <FormatOutputCode />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
                    <div className="flex-1 border rounded-md overflow-hidden">
                      <OutputEditor />
                    </div>
                  </CardContent>
                </Card>
              </Panel>

              <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />

              {/* Column 3: SVG Preview */}
              <Panel defaultSize={33} minSize={20}>
                <Card className="h-full flex flex-col rounded-none border-0 shadow-none">
                  <CardHeader className="flex-shrink-0 pb-3">
                    <SVGPreviewHeader />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
                    <SVGPreview />
                  </CardContent>
                </Card>
              </Panel>
            </PanelGroup>
          </div>
        )}
      </div>

      <DownloadSVG />
    </div>
  );
}
