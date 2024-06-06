import React from 'react';
import useSkies from '../hooks/useSkies';
import { Link } from 'react-router-dom';
import { deleteSky } from '../api/requests';

function Skies() {
    const skies = useSkies()

    const handleDelete = (id: number | undefined) => {
      if (!id) return

      deleteSky(id).then(() => window.location.reload())
    }

    return (
      <div>
      <nav className="navbar">
        <span className="navbar-title">Skies</span>
      </nav>
      <div className="skies-container">
        <table>
          <thead>
            <tr>
              <th>Cloud Level</th>
              <th>Moon Phase</th>
              <th>Rain Type</th>
              <th>Fog Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skies.map((sky) => (
              <tr key={sky.id}>
                <td>{sky.cloudLevel}</td>
                <td>{sky.moonPhase}</td>
                <td>{sky.rainType}</td>
                <td>{sky.fogLevel}</td>
                <td className="action-links-container">
                  <Link className="action-link" to={`/skies/${sky.id}/constellations`}>View constellations</Link>
                  <Link className="action-link" to={`/skies/update/${sky.id}`}>Update sky</Link>
                  <button className="action-button" onClick={() => handleDelete(sky.id)}>Delete sky</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bottom-buttons">
        <div>
        <Link to="/skies/new" className="submit-button">Add new sky</Link>
          </div>
      </div>
    </div>
    );
}

export default Skies;