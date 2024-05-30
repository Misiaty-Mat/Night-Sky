import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useSkyConstellations from '../hooks/useConstelations';
import { deleteConstellation } from '../api/requests';

function SkyConstellations() {
  const skyIdParam = useParams().skyId;
  const constellations = useSkyConstellations(Number(skyIdParam));

  const handleDelete = (id: number | undefined) => {
    if (!id) return;

    deleteConstellation(id).then(() => window.location.reload())
  }

  return (
    <div className="App">
      {constellations.map(constellation => (
        <div key={constellation.id}>
          <div>{constellation.name}</div>
          <div>{constellation.description}</div>
          <img width="300" src={constellation.imgLink} alt="Constellation" />
          <div>
            <Link to={`/skies/${skyIdParam}/constellations/${constellation.id}/stars`}>View stars</Link>
          </div>
          <div>
            <Link to={`/skies/${skyIdParam}/constellations/update/${constellation.id}`}>Update constellation</Link>
          </div>
          <div>
            <button onClick={() => handleDelete(constellation.id)}>Delete constellation</button>
          </div>
        </div>
      ))}
      <div>
        <Link to={`/skies/${skyIdParam}/constellations/new`}>Add new constellation</Link>
      </div>
      <div>
        <Link to={`/`}>Back</Link>
      </div>
    </div>
  );
}

export default SkyConstellations;