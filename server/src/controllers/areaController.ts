import { Request, Response } from 'express';
import { Area } from '../models';

export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.findAll({
      order: [['name', 'ASC']]
    });
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
};

export const createArea = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const area = await Area.create({ name });
    res.status(201).json(area);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Area already exists' });
    }
    res.status(500).json({ error: 'Failed to create area' });
  }
};

export const updateArea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const area = await Area.findByPk(id as string);
    if (!area) return res.status(404).json({ error: 'Area not found' });

    await area.update({ name });
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update area' });
  }
};

export const deleteArea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const area = await Area.findByPk(id as string);
    if (!area) return res.status(404).json({ error: 'Area not found' });

    await area.destroy();
    res.json({ message: 'Area deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete area' });
  }
};
