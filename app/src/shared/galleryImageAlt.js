const GALLERY_CATEGORY_LABEL_KEYS = {
  exterior: "gallery.exterior",
  interior: "gallery.interior",
  park: "gallery.park",
  remont: "gallery.remont",
  other: "gallery.other",
};

export function getGalleryImageAlt(t, category) {
  const labelKey = GALLERY_CATEGORY_LABEL_KEYS[category];
  if (!labelKey) {
    return t("gallery.palace");
  }

  return t("gallery.imageAlt", {
    palace: t("gallery.palace"),
    category: t(labelKey),
  });
}
