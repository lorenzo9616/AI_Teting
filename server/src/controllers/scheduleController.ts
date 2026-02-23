import { Request, Response } from 'express';
import { Shift, User } from '../models';

export const getShifts = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    const where: any = {};
    
    // If user is employee, only show their shifts (or all shifts in their area?)
    // For now, let's show all shifts for managers/admins and personal for employees
    const userRole = (req as any).user?.role;
    const userId = (req as any).user?.id;

    if (userRole === 'employee') {
      where.userId = userId;
    }

    const shifts = await Shift.findAll({
      where,
      include: [{ model: User, as: 'employee', attributes: ['id', 'name', 'role', 'area'] }]
    });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shifts' });
  }
};

export const createShift = async (req: Request, res: Response) => {
  try {
    const { userId, startTime, endTime, area, roleRequired } = req.body;
    const shift = await Shift.create({ userId, startTime, endTime, area, roleRequired });
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shift' });
  }
};

export const updateShift = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, area, roleRequired } = req.body;
    const shift = await Shift.findByPk(id as string);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    
    await shift.update({ startTime, endTime, area, roleRequired });
    res.json(shift);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shift' });
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shift = await Shift.findByPk(id as string);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    
    await shift.destroy();
    res.json({ message: 'Shift deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shift' });
  }
};
