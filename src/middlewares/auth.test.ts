import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { requireApiKey } from "./auth.js";
import type { Request, Response, NextFunction } from "express";

describe("requireApiKey", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };

    res = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn() as any,
    };

    next = jest.fn() as NextFunction;
  });

  test("retorna 401 si no existe x-api-key", () => {
    requireApiKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "API key inválida o ausente",
    });
  });

  test("retorna 401 si la API key es incorrecta", () => {
    req.headers = { "x-api-key": "incorrecta" };

    requireApiKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "API key inválida o ausente",
    });
  });

  test("llama next si la API key es válida", () => {
    req.headers = { "x-api-key": "secreto-demo" };

    requireApiKey(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});