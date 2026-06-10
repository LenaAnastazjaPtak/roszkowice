import { useEffect } from "react";

const JSON_LD_SCRIPT_ID = "page-json-ld";

export function useJsonLd(data) {
  const serializedData = data ? JSON.stringify(data) : null;

  useEffect(() => {
    document.getElementById(JSON_LD_SCRIPT_ID)?.remove();

    if (!serializedData) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = JSON_LD_SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = serializedData;
    document.head.appendChild(script);

    return () => {
      document.getElementById(JSON_LD_SCRIPT_ID)?.remove();
    };
  }, [serializedData]);
}
