import express, { Request, Response, Router } from 'express';
import prisma from '../../prismaConfig';
import { Constellation } from '@prisma/client';

const constellationRouter: Router = express.Router();

constellationRouter.get('/', async (req: Request, res: Response) => {
    const constellations: Constellation[] = await prisma.constellation.findMany();
    res.send(constellations);
});

constellationRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const constellation: Constellation | null = await prisma.constellation.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            stars: true
        }
    });

    if (constellation) {
        res.send(constellation);
    } else {
        res.status(404).json({message: `Constellation with id: ${id} not found`});
    }
});

constellationRouter.post('/', async (req: Request, res: Response) => {
    const { name, description, imgLink, skyId } = req.body as Constellation;
    try {
        const newConstellation = await prisma.constellation.create({
            data: {
                name: name,
                description: description,
                imgLink: imgLink,
                skyId: Number(skyId)
              }
        })
        res.status(201).json(newConstellation);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

constellationRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, imgLink, skyId } = req.body as Constellation;
    try {
        const updatedConstellation = await prisma.constellation.update({
            where: { id: Number(id) },
            data: {
                name: name,
                description: description,
                imgLink: imgLink,
                skyId: Number(skyId)
              },
        });
        res.json(updatedConstellation);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

constellationRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.constellation.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

export default constellationRouter;