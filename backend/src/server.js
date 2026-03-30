import "dotenv/config";
import { createApp } from "./app.js";

const port = process.env.PORT;
if (!port) {
  throw new Error("Missing required environment variable: PORT");
}

const app = await createApp();

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  console.log(`AdminJS panel: http://localhost:${port}/admin`);
});
