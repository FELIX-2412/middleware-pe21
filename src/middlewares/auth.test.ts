import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { requireJwt } from "./auth.js";
import type { Request, Response, NextFunction } from "express";

describe("requireJwt", () => {
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

  test("retorna 401 si no existe Authorization", () => {
    requireJwt(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token no existe",
    });
  });
});