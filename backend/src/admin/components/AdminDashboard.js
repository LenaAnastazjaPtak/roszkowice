import React from "react";
import { Box, H2, Text } from "@adminjs/design-system";

function Tile({ title, description, href }) {
  return React.createElement(
    Box,
    {
      as: "a",
      href,
      style: {
        borderRadius: "8px",
        padding: "32px",
        minHeight: "240px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textDecoration: "none",
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        transition: "all 0.2s ease",
        cursor: "pointer",
      },
    },
    [
      React.createElement(H2, { key: "title", style: { marginBottom: "10px", color: "#111827" } }, title),
      React.createElement(
        Text,
        { key: "description", style: { color: "#4b5563", maxWidth: "340px" } },
        description,
      ),
    ],
  );
}

function AdminDashboard() {
  return React.createElement(
    Box,
    { variant: "grey", style: { padding: "32px", minHeight: "100vh" } },
    [
      React.createElement(H2, { key: "heading", mb: "xl" }, "Pałac Roszkowice Admin"),
      React.createElement(
        Box,
        {
          key: "tiles",
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          },
        },
        [
          React.createElement(Tile, {
            key: "posts",
            title: "Posty",
            description: "Zarządzaj wpisami blogowymi i ich tłumaczeniami.",
            href: "/resources/BlogPost/actions/list",
          }),
          React.createElement(Tile, {
            key: "gallery",
            title: "Galeria",
            description: "Dodawaj zdjęcia, kategorie i ustawiaj kolejność.",
            href: "/resources/GalleryImage/actions/list",
          }),
        ],
      ),
    ],
  );
}

export default AdminDashboard;
