import { Router } from 'express';
import type { Request, Response } from 'express';

// 
const router = Router();

// Post: estudianteId, materias (Arreglo), periodoId
router.post('/', (req: Request, res: Response) => {
    //const body = req.body
    const { estudianteId, materias, periodoId } = req.body;

    if (!estudianteId || !materias?.length || !periodoId) {
        console.error('No existe el ID del estudiante');

        return res.status(400).json({
            error: 'Campos requeridos: estudianteId, materias, periodoId'
        });
    }

    return res.status(201).json({
        version: 'v1',
        message: {
            estudianteId,
            materias,
            periodoId
        }
    });
});

export default router;