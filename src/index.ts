import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { requestLogger } from "./middlewares/logger.js";
import { requireApiKey } from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(requireApiKey);

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    ts: new Date().toISOString(),
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use(
  (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
);

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});