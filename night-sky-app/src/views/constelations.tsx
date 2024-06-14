import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useSkyConstellations from '../hooks/useConstelations';
import { deleteConstellation } from '../api/requests';
import logo from '../img/logoSkyManager.png';

function SkyConstellations() {
  const skyIdParam = useParams().skyId;
  const constellations = useSkyConstellations(Number(skyIdParam));

  const handleDelete = (id: number | undefined) => {
    if (!id) return;

    deleteConstellation(id).then(() => window.location.reload())
  }

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-title">Constellations</span>
      </nav>
      <div className="constellations-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {constellations.map(constellation => (
              <tr key={constellation.id}>
                <td>{constellation.name}</td>
                <td className="description-column">{constellation.description}</td>
                <td><img width="100" src={constellation.imgLink} alt="Constellation" /></td>
                <td>
                  <Link className="action-link" to={`/skies/${skyIdParam}/constellations/${constellation.id}/stars`}>View stars</Link>
                  <Link className="action-link" to={`/skies/${skyIdParam}/constellations/update/${constellation.id}`}>Update</Link>
                  <button className="action-button" onClick={() => handleDelete(constellation.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='bottom-buttons'>
        <div>
          <Link to={`/skies/${skyIdParam}/constellations/new`} className="submit-button">Add new constellation</Link>
        </div>
        <div>
          <Link to={`/`} className="back-link-white">Back</Link>
        </div>
      </div>
      
    </div>

  );
}

export default SkyConstellations;