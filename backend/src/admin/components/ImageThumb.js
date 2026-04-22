import React from "react";
import { Box } from "@adminjs/design-system";

function toImageUrl(rawValue) {
  if (!rawValue) {
    return null;
  }

  if (rawValue.startsWith("http://") || rawValue.startsWith("https://")) {
    return rawValue;
  }

  if (rawValue.startsWith("/")) {
    return rawValue;
  }

  if (rawValue.startsWith("uploads/")) {
    return `/${rawValue}`;
  }

  return `/uploads/${rawValue}`;
}

function ImageThumb(props) {
  const imageRaw = props?.record?.params?.image;
  const src = toImageUrl(imageRaw);

  if (!src) {
    return React.createElement(Box, { color: "grey60" }, "Brak");
  }

  return React.createElement(
    Box,
    null,
    React.createElement("img", {
      src,
      alt: "Miniaturka posta",
      style: { width: "120px", height: "80px", objectFit: "cover", borderRadius: "4px" },
    }),
  );
}

export default ImageThumb;
