import { Request, Response } from 'express';
import { User } from '../models';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'area', 'plan']
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, area, plan } = req.body;
    const employee = await User.findByPk(id as string);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    await employee.update({ name, role, area, plan });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
};
