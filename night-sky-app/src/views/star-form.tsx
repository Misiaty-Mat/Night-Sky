import React, { useEffect, useState } from 'react';
import { createStar, fetchStarById, updateStar } from '../api/requests';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function StarForm() {
  const { skyId, constellationId, starId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    if (starId) {
        fetchStarById(Number(starId)).then((star) => {
            setName(star.name);
            setDescription(star.description);
            setImgLink(star.imgLink);
        })
    }
  }, [starId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!constellationId) return;

    const starOperation = starId
      ? updateStar({ id: Number(starId), name, description, imgLink, constellationId })
      : createStar({ name, description, imgLink, constellationId });

      starOperation.then(() => {
      setName('');
      setDescription('');
      setImgLink('');
      navigate(`/skies/${skyId}/constellations/${constellationId}/stars`);
    });
  }

  return (
    
    <div className="star-form-container">
      <form onSubmit={handleSubmit} className="star-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Image Link:
          <input type="text" value={imgLink} onChange={(e) => setImgLink(e.target.value)} />
        </label>
        <br />
        <button type="submit" className="submit-button">{starId ? 'Update Star' : 'Create Star'}</button>
      </form>
      <Link to={`/skies/${skyId}/constellations/${constellationId}/stars`} className="back-link-black">Back</Link>
    </div>
  );
}

export default StarForm;
