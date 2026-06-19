import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { requestLogger } from "./middlewares/logger.js";
import { requireApiKey } from "./middlewares/auth.js";

// importar las rutas de v1, v2,
import v1Inscripciones from './routes/v1/inscripciones.js'
import v2Inscripciones from './routes/v2/inscripciones.js'



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

app.get("/v1", (_req: Request, res: Response) => {
  res.json({
    message: "API v1 funcionando",
  });
});

app.use ('/v1/inscripciones', v1Inscripciones)
app.use ('/v2/inscripciones', v2Inscripciones)



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