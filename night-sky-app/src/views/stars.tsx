import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useConstellationStars from '../hooks/useStars';
import { deleteStar } from '../api/requests';

function ConstellationStars() {
  const skyIdParam = useParams().skyId;
  const constellationIdParam = useParams().constellationId;
  const stars = useConstellationStars(Number(constellationIdParam));

  const handleDelete = (id: number | undefined) => {
    if (!id) return;

    deleteStar(id).then(() => window.location.reload());
  }

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-title">Stars</span>
      </nav>
      <div className="constellation-stars-container">
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
            {stars.map(star => (
              <tr key={star.id}>
                <td>{star.name}</td>
                <td className="description-column">{star.description}</td>
                <td><img src={star.imgLink} alt="Star" /></td>
                <td>
                  <Link className="action-link" to={`/skies/${skyIdParam}/constellations/${constellationIdParam}/stars/update/${star.id}`}>Update Star</Link>
                  <button className="action-button" onClick={() => handleDelete(star.id)}>Delete Star</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bottom-buttons">
        <div>
          <Link className="submit-button" to={`/skies/${skyIdParam}/constellations/${constellationIdParam}/stars/new`}>Add Star</Link>
        </div>
        <div>
          <Link className="back-link" to={`/skies/${skyIdParam}/constellations`}>Back</Link>
        </div>
      </div>
    </div>
    
  );
}

export default ConstellationStars;