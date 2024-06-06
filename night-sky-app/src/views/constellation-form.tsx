import React, { useEffect, useState } from 'react';
import { createConstellation, fetchConstellationById, updateConstellation } from '../api/requests';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ConstellationForm() {
  const { skyId, constellationId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    if (constellationId) {
        fetchConstellationById(Number(constellationId)).then((constellation) => {
            setName(constellation.name);
            setDescription(constellation.description);
            setImgLink(constellation.imgLink);
        })
    }
  }, [constellationId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!skyId) return;

    const constellationOperation = constellationId
      ? updateConstellation({ id: Number(constellationId), name, description, imgLink, skyId })
      : createConstellation({ name, description, imgLink, skyId });

    constellationOperation.then(() => {
      setName('');
      setDescription('');
      setImgLink('');
      navigate(`/skies/${skyId}/constellations`);
    });
  };

  return (
    <div className="constellation-form-container">
      <form onSubmit={handleSubmit} className="constellation-form">
        <label htmlFor="name">
          Name:
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="description">
          Description:
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label htmlFor="imgLink">
          Image Link:
          <input type="text" id="imgLink" value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
        </label>
        <button type="submit" className="submit-button">{constellationId ? 'Update Constellation' : 'Create Constellation'}</button>
      </form>
      <Link to={`/skies/${skyId}/constellations`} className="back-link">Back</Link>
    </div>
  );
}

export default ConstellationForm;