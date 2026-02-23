import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Area extends Model {
  public id!: number;
  public name!: string;
}

Area.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'areas',
  }
);

export default Area;
