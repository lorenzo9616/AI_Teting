import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Plus, Trash2 } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
}

interface Area {
  id: number;
  name: string;
}

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShiftAdded: () => void;
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({ isOpen, onClose, onShiftAdded }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [showAreaManager, setShowAreaManager] = useState(false);
  const [newAreaName, setNewAreaName] = useState('');
  
  const [formData, setFormData] = useState({
    userId: '',
    startTime: '',
    endTime: '',
    area: '',
    roleRequired: 'Chef'
  });

  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
      fetchAreas();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const fetchAreas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/areas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAreas(response.data);
      if (response.data.length > 0 && !formData.area) {
        setFormData(prev => ({ ...prev, area: response.data[0].name }));
      }
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  };

  const handleAddArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAreaName.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/areas', { name: newAreaName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewAreaName('');
      fetchAreas();
    } catch (err) {
      alert('Failed to add area');
    }
  };

  const handleDeleteArea = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this area?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/areas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAreas();
    } catch (err) {
      alert('Failed to delete area');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/schedule', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onShiftAdded();
      onClose();
    } catch (err) {
      alert('Failed to create shift');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '450px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        <h2 style={{ marginTop: 0, color: '#333' }}>Add New Shift</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Employee</label>
            <select 
              required 
              value={formData.userId} 
              onChange={e => setFormData({...formData, userId: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ marginBottom: '15px', flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Start Time</label>
              <input 
                type="datetime-local" 
                required 
                value={formData.startTime}
                onChange={e => setFormData({...formData, startTime: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px', flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>End Time</label>
              <input 
                type="datetime-local" 
                required 
                value={formData.endTime}
                onChange={e => setFormData({...formData, endTime: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ fontSize: '14px' }}>Area</label>
              <button 
                type="button" 
                onClick={() => setShowAreaManager(!showAreaManager)}
                style={{ fontSize: '12px', background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {showAreaManager ? 'Back' : <><Plus size={14} /> Manage Areas</>}
              </button>
            </div>

            {!showAreaManager ? (
              <select 
                value={formData.area}
                onChange={e => setFormData({...formData, area: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              >
                {areas.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            ) : (
              <div style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px', background: '#f9f9f9' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="New area name..."
                    value={newAreaName}
                    onChange={e => setNewAreaName(e.target.value)}
                    style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddArea}
                    style={{ padding: '5px 10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  {areas.map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
                      {a.name}
                      <button 
                        type="button" 
                        onClick={() => handleDeleteArea(a.id)}
                        style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '2px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Role Required</label>
            <select 
              value={formData.roleRequired}
              onChange={e => setFormData({...formData, roleRequired: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
              <option value="Bartender">Bartender</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {!showAreaManager && (
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
              Create Shift
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddShiftModal;
