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
    <div className="App">
      {stars.map(star => (
        <div key={star.id}>
          <div>{star.name}</div>
          <div>{star.description}</div>
          <img width="300" src={star.imgLink} alt="Star" />
          <div>
            <Link to={`/skies/${skyIdParam}/constellations/${constellationIdParam}/stars/update/${star.id}`}>Update Star</Link>
          </div>
          <div>
            <button onClick={() => handleDelete(star.id)}>Delete Star</button>
          </div>
        </div>
      ))}
      <div>
        <Link to={`/skies/${skyIdParam}/constellations/${constellationIdParam}/stars/new`}>Add Star</Link>
      </div>
      <div>
        <Link to={`/skies/${skyIdParam}/constellations`}>Back</Link>
      </div>
    </div>
  );
}

export default ConstellationStars;