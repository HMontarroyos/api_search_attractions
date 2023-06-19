import { App } from "./app";
import { connect } from "./config/database";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const PORT = process.env.PORT || 4000;

const app = new App().app;

connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
