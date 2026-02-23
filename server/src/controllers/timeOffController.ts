import { Request, Response } from 'express';
import { TimeOffRequest, User } from '../models';

export const getRequests = async (req: Request, res: Response) => {
  try {
    const userRole = (req as any).user?.role;
    const userId = (req as any).user?.id;
    const where: any = {};

    if (userRole === 'employee') {
      where.userId = userId;
    }

    const requests = await TimeOffRequest.findAll({
      where,
      include: [{ model: User, as: 'employee', attributes: ['id', 'name'] }]
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

export const createRequest = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { date, reason } = req.body;
    const request = await TimeOffRequest.create({ userId, date, reason, status: 'pending' });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request' });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // approved, rejected
    const request = await TimeOffRequest.findByPk(id as string);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    await request.update({ status });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request' });
  }
};
