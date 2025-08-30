import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      const result = await response.json();

      if (result.success) {
        setSchools(result.data);
        setError('');
      } else {
        setError('Failed to fetch schools');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const SchoolCard = ({ school }) => (
    <div className="school-card">
      <div className="school-image">
        {school.image ? (
          <Image
            src={school.image}
            alt={school.name}
            width={300}
            height={200}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="school-image" 
          style={{ 
            display: school.image ? 'none' : 'flex',
            background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            color: '#6b46c1',
            fontSize: '2.5rem',
            flexDirection: 'column',
            gap: '0.5rem',
            fontWeight: 'bold'
          }}
        >
          🎓
          <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 'normal' }}>School Image</span>
        </div>
      </div>
      
      <div className="school-content">
        <h3 className="school-name" style={{ 
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '1.5rem', 
          fontWeight: '800',
          marginBottom: '0.8rem',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #c026d3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.01em'
        }}>
          {school.name}
        </h3>
        <p className="school-address" style={{
          color: '#64748b',
          fontSize: '0.95rem',
          marginBottom: '0.6rem'
        }}>
          {school.address}
        </p>
        <p className="school-city" style={{
          color: '#475569',
          fontWeight: '600',
          fontSize: '0.9rem',
          marginBottom: '1rem'
        }}>
          📍 {school.city}, {school.state}
        </p>
        
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'rgba(248, 250, 252, 0.8)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          border: '1px solid rgba(226, 232, 240, 0.6)'
        }}>
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.1rem' }}>📱</span>
            <strong>{school.contact}</strong>
          </div>
          <div style={{ 
            fontSize: '0.85rem', 
            color: '#475569', 
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.1rem' }}>✉️</span>
            <strong>{school.email_id}</strong>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h3>Loading schools...</h3>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3>Error Loading Schools</h3>
          <p>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={fetchSchools}
            style={{ marginTop: '1rem' }}
          >
            🔄 Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2.5rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        margin: '0 20px 2.5rem 20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontFamily: 'Montserrat, sans-serif',
          color: '#1a202c',
          fontSize: '3rem',
          fontWeight: '900',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #c026d3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em'
        }}>
          Schools Directory
        </h2>
        <p style={{ 
          fontFamily: 'Inter, sans-serif',
          color: '#52525b',
          fontSize: '1.2rem',
          fontWeight: '500',
          letterSpacing: '0.2px'
        }}>
          Discover and explore educational institutions across India 🇮🇳
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏫</div>
          <h3>No Schools Found</h3>
          <p>Start by adding your first school to the directory!</p>
          <a href="/addSchool" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            ➕ Add First School
          </a>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '15px',
            margin: '0 20px 2rem 20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ 
              color: '#475569',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>🏫</span>
              Found {schools.length} school{schools.length !== 1 ? 's' : ''}
            </div>
            <button 
              className="btn btn-primary"
              onClick={fetchSchools}
              style={{ 
                padding: '0.6rem 1.4rem', 
                fontSize: '0.85rem',
                borderRadius: '10px'
              }}
            >
              🔄 Refresh
            </button>
          </div>
          
          <div className="schools-grid">
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}