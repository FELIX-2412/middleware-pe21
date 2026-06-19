import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const METODOS_PAGO = ['debit', 'credit', 'scholarship'] as const;

router.post('/', (req: Request, res: Response) => {
  const { estudianteId, materias, periodoId, payment_method } = req.body;

  if (!estudianteId || !materias?.length || !periodoId || !payment_method) {
    return res.status(400).json({
      error: 'Campos requeridos: estudianteId, materias, periodoId, payment_method'
    });
  }

  if (!METODOS_PAGO.includes(payment_method)) {
    return res.status(400).json({
      error: 'payment_method inválido. Valores: debit, credit, scholarship'
    });
  }

  return res.status(201).json({
    version: 'v2',
    estudianteId,
    materias,
    periodoId,
    payment_method
  });
});

export default router;