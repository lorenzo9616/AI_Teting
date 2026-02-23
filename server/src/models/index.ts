import User from './User';
import Shift from './Shift';
import TimeOffRequest from './TimeOffRequest';
import Area from './Area';

// Associations
User.hasMany(Shift, { foreignKey: 'userId', as: 'shifts' });
Shift.belongsTo(User, { foreignKey: 'userId', as: 'employee' });

User.hasMany(TimeOffRequest, { foreignKey: 'userId', as: 'timeOffRequests' });
TimeOffRequest.belongsTo(User, { foreignKey: 'userId', as: 'employee' });

export { User, Shift, TimeOffRequest, Area };
