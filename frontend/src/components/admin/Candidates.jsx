import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/user/students');
        const data = await response.json();
        if (data.success) {
          setCandidates(data.students);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '100px 20px', fontFamily: 'Arial, sans-serif' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '20px 0',
            fontSize: '16px',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Profile</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Full Name</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Phone</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Bio</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Skills</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Resume</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate._id}>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                  <img
                    src={candidate.profile.profilePhoto}
                    alt={`${candidate.fullname}'s profile`}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{candidate.fullname}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{candidate.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{candidate.phoneNumber}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{candidate.profile.bio}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {candidate.profile.skills.join(', ')}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  <a
                    href={candidate.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                    }}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
