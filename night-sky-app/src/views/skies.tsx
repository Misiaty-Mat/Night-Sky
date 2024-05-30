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
      <div className="App">
        {skies.map(sky => (
          <div key={sky.id}>
            <div>{sky.cloudLevel}</div>
            <div>{sky.moonPhase}</div>
            <div>{sky.rainType}</div>
            <div>{sky.fogLevel}</div>

            <div>
              <Link to={`/skies/${sky.id}/constellations`}>View constellations</Link>
            </div>

            <div>
              <Link to={`/skies/update/${sky.id}`}>Update sky</Link>
            </div>

            <div>
              <button onClick={() => handleDelete(sky.id)}>Delete sky</button>
            </div>
          </div>
        ))}
        <Link to="/skies/new">Add new sky</Link>
      </div>
    );
}

export default Skies;