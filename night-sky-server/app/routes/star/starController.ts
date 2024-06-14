import express, { Request, Response, Router } from 'express';
import prisma from '../../prismaConfig';
import { Star } from '@prisma/client';

const starRouter: Router = express.Router();

starRouter.get('/', async (req: Request, res: Response) => {
    const stars: Star[] = await prisma.star.findMany();
    res.send(stars);
});

starRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const star: Star | null = await prisma.star.findUnique({
        where:{
            id: Number(id)
        }
    });

    if (star) {
        res.send(star);
    } else {
        res.status(404).json({message: `Star with id: ${star} not found`});
    }
});

starRouter.post('/', async (req: Request, res: Response) => {
    const { name, description, imgLink, constellationId } = req.body as Star;
    try {
        const newStar = await prisma.star.create({
            data: {
                name: name,
                description: description,
                imgLink: imgLink,
                constellationId: Number(constellationId)
              }
        })

        res.status(201).json(newStar);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

starRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, imgLink, constellationId } = req.body as Star;
    try {
        const updatedStar = await prisma.star.update({
            where: { id: Number(id) },
            data: {
                name: name,
                description: description,
                imgLink: imgLink,
                constellationId: Number(constellationId)
              },
        });
        res.json(updatedStar);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

starRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.star.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
});

starRouter.put('/:id/turn-visability', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const star = await prisma.star.findUnique({
            where: { id: Number(id) }
        });

        const updatedStar = await prisma.star.update({
            where: { id: Number(id) },
            data: {
                isOn: !star?.isOn
              },
        });
        res.json(updatedStar);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
    }
})

export default starRouter;