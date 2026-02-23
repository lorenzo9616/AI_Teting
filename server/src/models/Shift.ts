import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Shift extends Model {
  public id!: number;
  public userId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public roleRequired!: string;
  public area!: string;
}

Shift.init(
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
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    roleRequired: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'shifts',
  }
);

export default Shift;
