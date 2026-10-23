import React from "react";

import { convert, prettify } from "@/lib/helpers";

interface SvgConverterState {
  inputCode: string;
  outputCode: string;
  fileName: string;
  dimensions: {
    width: string;
    height: string;
  };
  error: string | null;
}

interface SvgConverterContextProps {
  state: SvgConverterState;
  setInputCode: (code: string) => void;
  setOutputCode: (code: string) => void;
  setError: (error: string | null) => void;
}

const SvgConverterContext = React.createContext<
  SvgConverterContextProps | undefined
>(undefined);

interface SvgConverterProviderProps {
  children: React.ReactNode;
}

export const SvgConverterProvider: React.FC<SvgConverterProviderProps> = ({
  children,
}) => {
  const [state, setState] = React.useState<SvgConverterState>({
    inputCode: "",
    outputCode: "",
    fileName: "converted.svg",
    dimensions: {
      width: "24",
      height: "24",
    },
    error: null,
  });

  const setInputCode = React.useCallback((code: string) => {
    setState((prev) => ({ ...prev, inputCode: code }));
  }, []);

  const setOutputCode = React.useCallback((code: string) => {
    setState((prev) => ({ ...prev, outputCode: code }));
  }, []);

  const setDimensions = React.useCallback(
    (dimensions: { width: string; height: string }) => {
      setState((prev) => ({ ...prev, dimensions }));
    },
    []
  );

  const setError = React.useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setFileName = React.useCallback((fileName: string) => {
    setState((prev) => ({ ...prev, fileName }));
  }, []);

  React.useEffect(() => {
    if (state.inputCode.trim()) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Convert committed editor input into its existing derived context state.
        setError("");
        const result = convert(state.inputCode, setDimensions, setFileName);
        const prettified = prettify(result);
        setOutputCode(prettified);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
        setOutputCode("");
      }
    } else {
      setOutputCode("");
      setError("");
    }
  }, [state.inputCode, setDimensions, setError, setFileName, setOutputCode]);

  React.useEffect(() => {
    if (state.outputCode.trim()) {
      const svgMatch = state.outputCode.match(
        /<svg[^>]*\bwidth=["']?(\d+(\.\d+)?)["']?[^>]*\bheight=["']?(\d+(\.\d+)?)["']?[^>]*>/i
      );
      if (svgMatch) {
        const width = svgMatch[1];
        const height = svgMatch[3];
        if (!Number.isNaN(Number(width)) && !Number.isNaN(Number(height))) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync dimensions after manual output edits have committed.
          setDimensions({ width, height });
        }
      }
    }
  }, [state.outputCode, setDimensions]);

  return (
    <SvgConverterContext.Provider
      value={{
        state,
        setInputCode,
        setOutputCode,
        setError,
      }}
    >
      {children}
    </SvgConverterContext.Provider>
  );
};

export const useSvgConverter = (): SvgConverterContextProps => {
  const context = React.useContext(SvgConverterContext);
  if (context === undefined) {
    throw new Error(
      "useSvgConverter must be used within a SvgConverterProvider"
    );
  }
  return context;
};
