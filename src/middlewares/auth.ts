import type { Request, Response, NextFunction } from "express";
import { createHmac, timingSafeEqual } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET ?? "secreto-demo";

function base64UrlDecode(str: string): string {
  return Buffer.from(
    str.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf8");
}

export function requireJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"] ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) return res.status(401).json({ error: "Token no existe" });

  const parts = token.split(".");

  if (parts.length !== 3) {
    return res.status(401).json({ error: "Token mal formado" });
  }

  const [headersB64, payloadB64, signaturaB64] = parts as [
    string,
    string,
    string
  ];

  const header = JSON.parse(base64UrlDecode(headersB64));

  if (header.alg !== "HS256") {
    return res.status(401).json({ error: "Algoritmo no permitido" });
  }

  const expectedSig = createHmac("sha256", JWT_SECRET)
    .update(`${headersB64}.${payloadB64}`)
    .digest("base64url");

  const receivedSig = Buffer.from(signaturaB64);
  const expectedSigBuffer = Buffer.from(expectedSig);

  if (
    receivedSig.length !== expectedSigBuffer.length ||
    !timingSafeEqual(receivedSig, expectedSigBuffer)
  ) {
    return res.status(401).json({ error: "Firma inválida" });
  }

  const claims = JSON.parse(base64UrlDecode(payloadB64));

  const now = Math.floor(Date.now() / 1000);

  if (claims.exp && claims.exp < now) {
    return res.status(401).json({ error: "Token expirado" });
  }

  if (!claims.sub) {
    return res.status(401).json({ error: "Claim sub ausente" });
  }

  (req as Request & { user?: unknown }).user = {
    sub: claims.sub,
    scope: claims.scope ?? "",
  };

  next();
}