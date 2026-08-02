"use client";

import { useEffect } from "react";
// We import StringTune dynamically since it relies on window/DOM and could fail during SSR.
// The package name is @fiddle-digital/string-tune.
import * as StringTuneLib from "@fiddle-digital/string-tune";

export function StringTuneProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize StringTune on mount (client-side only)
    try {
      const stringTune = StringTuneLib.StringTune.getInstance();
      
      // @ts-expect-error adding to window for string-tune internal reference if needed
      window.StringTuneContext = stringTune;

      stringTune.use(StringTuneLib.StringCursor);
      stringTune.use(StringTuneLib.StringSpotlight);
      stringTune.use(StringTuneLib.StringLazy);

      stringTune.start(0);

      // No clean-up method is documented, but typically we just run this once.
    } catch (e) {
      console.error("Failed to initialize StringTune", e);
    }
  }, []);

  return <>{children}</>;
}
