import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { Calendar, User, Clock, MapPin, Plus, LogOut, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddShiftModal from '../components/AddShiftModal';

interface Shift {
  id: number;
  userId: number;
  startTime: string;
  endTime: string;
  area: string;
  roleRequired: string;
  employee?: {
    name: string;
    role: string;
  };
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/schedule', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShifts(response.data);
    } catch (err) {
      console.error('Error fetching shifts:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#ff4d4d' }}>Scheduling App</h1>
          <p style={{ margin: 0, color: '#666' }}>Welcome back, {user?.name} ({user?.role})</p>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: '#f8dada', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#ff4d4d' }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
        <aside style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: '#ff4d4d', fontWeight: 'bold' }}>Dashboard</Link>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee', color: '#666' }}>My Shifts</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee', color: '#666' }}>Time Off Requests</li>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <Link to="/employees" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} /> Employees
                </Link>
              </li>
            )}
          </ul>
        </aside>

        <main style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Weekly Schedule</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(user?.role === 'admin' || user?.role === 'manager') && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <Plus size={16} /> Add Shift
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
            {weekDays.map((day) => {
              const dayShifts = shifts.filter(s => isSameDay(parseISO(s.startTime), day));
              return (
                <div key={day.toString()} style={{ borderRight: '1px solid #eee', minHeight: '400px', background: isSameDay(day, new Date()) ? '#fff5f5' : 'white' }}>
                  <div style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                    <strong style={{ display: 'block', color: isSameDay(day, new Date()) ? '#ff4d4d' : '#333' }}>{format(day, 'EEE')}</strong>
                    <span style={{ fontSize: '12px', color: '#666' }}>{format(day, 'MMM d')}</span>
                  </div>
                  <div style={{ padding: '8px' }}>
                    {dayShifts.length > 0 ? (
                      dayShifts.map(shift => (
                        <div key={shift.id} style={{ marginBottom: '8px', padding: '8px', background: '#eef2ff', borderRadius: '4px', borderLeft: '3px solid #6366f1', fontSize: '12px' }}>
                          <div style={{ fontWeight: 'bold', color: '#1e1b4b' }}>{shift.employee?.name || 'Unassigned'}</div>
                          <div style={{ color: '#4338ca' }}>{format(parseISO(shift.startTime), 'HH:mm')} - {format(parseISO(shift.endTime), 'HH:mm')}</div>
                          <div style={{ fontSize: '10px', color: '#6366f1', marginTop: '2px', fontStyle: 'italic' }}>{shift.area}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '11px', color: '#ccc', textAlign: 'center', marginTop: '50px' }}>No shifts</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <AddShiftModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onShiftAdded={fetchShifts} 
      />
    </div>
  );
};

export default Dashboard;
