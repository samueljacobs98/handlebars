const express = require("express");
const app = express();
const port = 3001;

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

function addHateoasLinks(item) {
  return {
    ...item,
    links: [
      { rel: "self", href: `http://localhost:${port}/api/items/${item.id}` },
      {
        rel: "edit",
        href: `http://localhost:${port}/api/items/${item.id}/edit`,
      },
      {
        rel: "delete",
        href: `http://localhost:${port}/api/items/${item.id}/delete`,
      },
    ],
  };
}

app.get("/api/items", (req, res) => {
  const itemsWithLinks = items.map(addHateoasLinks);
  res.json({ items: itemsWithLinks });
});

app.listen(port, () => {
  console.log(`Backend service running at http://localhost:${port}`);
});
