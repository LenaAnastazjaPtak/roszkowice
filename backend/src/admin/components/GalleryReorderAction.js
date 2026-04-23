import React, { useEffect, useState } from "react";
import { ApiClient, useNotice } from "adminjs";
import { Box, Button, H3, Text } from "@adminjs/design-system";

const api = new ApiClient();

function moveItem(array, fromIndex, toIndex) {
  const next = [...array];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

function normalizeRecord(record) {
  const params = record?.params ?? record ?? {};
  return {
    id: Number(params.id),
    image: normalizeImageUrl(params.image),
    category: params.category ?? "brak",
  };
}

function normalizeImageUrl(image) {
  if (!image || typeof image !== "string") {
    return "";
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  if (image.startsWith("/")) {
    return image;
  }
  if (image.startsWith("uploads/")) {
    return `/${image}`;
  }
  return `/uploads/${image}`;
}

function GalleryReorderAction(props) {
  const [items, setItems] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const addNotice = useNotice();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const response = await api.resourceAction({
          resourceId: props.resource.id,
          actionName: "reorderGallery",
        });
        const records = response?.data?.records ?? response?.records ?? [];
        const normalized = records
          .map(normalizeRecord)
          .filter((record) => Number.isInteger(record.id) && record.id > 0);
        if (!cancelled) {
          setItems(normalized);
        }
      } catch {
        if (!cancelled) {
          addNotice({
            message: "Nie udało się załadować zdjęć do sortowania.",
            type: "error",
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [props.resource.id]);

  const onDropAt = (targetIndex) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      return;
    }
    setItems((prev) => moveItem(prev, dragIndex, targetIndex));
    setDragIndex(null);
  };

  const saveOrder = async () => {
    try {
      setSaving(true);
      const order = items.map((item) => item.id).filter(Boolean);
      const response = await api.resourceAction({
        resourceId: props.resource.id,
        actionName: "reorderGallery",
        data: { order },
        method: "post",
      });
      const records = response?.data?.records ?? response?.records ?? [];
      setItems(
        records
          .map(normalizeRecord)
          .filter((record) => Number.isInteger(record.id) && record.id > 0),
      );
      addNotice({
        message: "Kolejność galerii została zapisana.",
        type: "success",
      });
    } catch (error) {
      addNotice({
        message: "Nie udało się zapisać kolejności galerii.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return React.createElement(
    Box,
    { variant: "grey", style: { padding: "24px", minHeight: "100vh" } },
    [
      React.createElement(H3, { key: "heading", mb: "lg" }, "Ułóż kolejność zdjęć"),
      React.createElement(
        Text,
        { key: "hint", mb: "xl" },
        "Przeciągnij i upuść zdjęcia, a następnie zapisz kolejność.",
      ),
      React.createElement(
        Box,
        {
          key: "list",
          style: {
            display: "grid",
            gap: "10px",
            marginBottom: "16px",
          },
        },
        loading
          ? React.createElement(Text, { key: "loading" }, "Ładowanie zdjęć...")
          : items.length === 0
            ? React.createElement(Text, { key: "empty" }, "Brak zdjęć do ułożenia.")
            : items.map((item, index) =>
                React.createElement(
                  Box,
                  {
                    key: item.id,
                    draggable: true,
                    onDragStart: () => setDragIndex(index),
                    onDragOver: (event) => event.preventDefault(),
                    onDrop: () => onDropAt(index),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      cursor: "grab",
                    },
                  },
                  [
                    React.createElement(
                      Text,
                      { key: "number", style: { minWidth: "24px", fontWeight: 600 } },
                      String(index + 1),
                    ),
                    React.createElement("img", {
                      key: "thumb",
                      src: item.image,
                      alt: "Miniatura",
                      onError: (event) => {
                        event.currentTarget.style.display = "none";
                      },
                      style: {
                        width: "80px",
                        height: "56px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        background: "#f3f4f6",
                      },
                    }),
                    React.createElement(
                      Text,
                      { key: "meta", style: { marginLeft: "8px" } },
                      `${item.category} • ID ${item.id}`,
                    ),
                  ],
                ),
              ),
      ),
      React.createElement(
        Button,
        {
          key: "save",
          variant: "primary",
          disabled: saving,
          onClick: saveOrder,
        },
        saving ? "Zapisywanie..." : "Zapisz kolejność",
      ),
    ],
  );
}

export default GalleryReorderAction;
