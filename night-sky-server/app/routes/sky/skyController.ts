import express, { Request, Response, Router } from 'express';
import prisma from '../../prismaConfig';
import { Sky } from '@prisma/client';

const skyRouter: Router = express.Router();

skyRouter.get('/', async (req: Request, res: Response) => {
    const skies: Sky[] = await prisma.sky.findMany();
    res.send(skies);
});

skyRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const sky: Sky | null = await prisma.sky.findUnique({
        where:{
            id: Number(id)
        },
        include: {
            constellations: true
        }
    });

    if (sky) {
        res.send(sky);
    } else {
        res.status(404).json({message: `Sky with id: ${id} not found`});
    }
});

skyRouter.post('/', async (req: Request, res: Response) => {
    const { cloudLevel, moonPhase, rainType, fogLevel } = req.body as Sky;
    try {
        const newSky = await prisma.sky.create({
            data: { cloudLevel, moonPhase, rainType, fogLevel }
        })

        res.status(201).json(newSky);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

skyRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cloudLevel, moonPhase, rainType, fogLevel } = req.body as Sky;
    try {
        const updatedSky = await prisma.sky.update({
            where: { id: Number(id) },
            data: { cloudLevel, moonPhase, rainType, fogLevel },
        });
        res.json(updatedSky);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

skyRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.sky.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

export default skyRouter;