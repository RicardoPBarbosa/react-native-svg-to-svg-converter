"use client";

import React from "react";
import { toast } from "sonner";

import { useSvgConverter } from "@/context";

export default function Toast() {
  const {
    state: { error },
    setError,
  } = useSvgConverter();

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null); // Clear the error after handling
    }
  }, [error, setError]);

  return null;
}
