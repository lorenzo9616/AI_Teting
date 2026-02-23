import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123', // Default password
    role: 'employee',
    area: 'Front of House'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onEmployeeAdded();
      onClose();
      alert('Employee added! Default password: password123');
    } catch (err) {
      alert('Failed to add employee. Email might already exist.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        <h2 style={{ marginTop: 0 }}>Add New Employee</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
            <select 
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Primary Area</label>
            <select 
              value={formData.area}
              onChange={e => setFormData({...formData, area: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="Front of House">Front of House</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bar">Bar</option>
            </select>
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
