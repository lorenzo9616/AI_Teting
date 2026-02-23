import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TimeOffRequest extends Model {
  public id!: number;
  public userId!: number;
  public date!: Date; // Or range
  public reason!: string;
  public status!: 'pending' | 'approved' | 'rejected';
}

TimeOffRequest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'time_off_requests',
  }
);

export default TimeOffRequest;
