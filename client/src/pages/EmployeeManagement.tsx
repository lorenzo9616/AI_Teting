import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, MapPin, Shield, Edit, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddEmployeeModal from '../components/AddEmployeeModal';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  area: string;
  plan: string;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Employee Management</h2>
          <Link to="/dashboard" style={{ color: '#ff4d4d', textDecoration: 'none', fontSize: '14px' }}>← Back to Dashboard</Link>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <Plus size={18} /> Add Employee
        </button>
      </header>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '15px' }}>Employee</th>
              <th style={{ padding: '15px' }}>Role</th>
              <th style={{ padding: '15px' }}>Area</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ff4d4d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{emp.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>{emp.role}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ fontSize: '14px' }}>{emp.area || 'N/A'}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}>
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onEmployeeAdded={fetchEmployees} 
      />
    </div>
  );
};

export default EmployeeManagement;
