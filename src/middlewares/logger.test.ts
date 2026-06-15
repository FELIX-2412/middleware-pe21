import { describe, test, expect, jest } from "@jest/globals";
import { requestLogger } from "./logger.js";
import type { Request, Response, NextFunction } from "express";

describe("requestLogger", () => {
  test("llama next al recibir una petición", () => {
    const req = {
      method: "GET",
      path: "/health",
    } as Request;

    const res = {
      statusCode: 200,
      on: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("registra el método y la ruta correctamente", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    let finishCallback: () => void = () => {};

    const req = {
      method: "GET",
      path: "/health",
    } as Request;

    const res = {
      statusCode: 200,
      on: jest.fn((event: string, callback: () => void) => {
        if (event === "finish") {
          finishCallback = callback;
        }
      }),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    requestLogger(req, res, next);
    finishCallback();

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});