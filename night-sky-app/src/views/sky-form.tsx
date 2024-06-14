import React, { useEffect, useState } from 'react';
import { createSky, fetchSkyById, updateSky } from '../api/requests';
import { MoonPhase, RainType } from '../model/Sky';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../img/logoSkyManager.png';


function SkyForm() {
    const navigate = useNavigate();
    const skyId = Number(useParams().skyId);

    const [cloudLevel, setCloudLevel] = useState(0);
    const [moonPhase, setMoonPhase] = useState(MoonPhase.New);
    const [rainType, setRainType] = useState(RainType.None);
    const [fogLevel, setFogLevel] = useState(0);
    const [rainDisabled, setRainDisabled] = useState(true);

    useEffect(() => {
        if (skyId) {
            fetchSkyById(skyId).then((sky) => {
                setCloudLevel(sky.cloudLevel);
                setMoonPhase(sky.moonPhase);
                setRainType(sky.rainType);
                setFogLevel(sky.fogLevel);
            })
        }
    }, [skyId]);

    useEffect(() => {
        if (cloudLevel === 0) {
            setRainDisabled(true);
            setRainType(RainType.None);
        } else {
            setRainDisabled(false);
        }
    }, [cloudLevel]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const skyOperation = skyId
        ? updateSky({ id: skyId, cloudLevel, moonPhase, rainType, fogLevel })
        : createSky({ cloudLevel, moonPhase, rainType, fogLevel });

        skyOperation.then(() => {
            setCloudLevel(0);
            setMoonPhase(MoonPhase.New);
            setRainType(RainType.None);
            setFogLevel(0);
            navigate('/');
        });
    };

    return (
        <div className="sky-form-container">
            <img src={logo} alt="Sky Manager Logo" className="logo" /> {/* Dodaj logo */}
            <form onSubmit={handleSubmit} className='sky-form'>
            <div className="form-group">
                    <label htmlFor="cloudLevel">Cloud Level:</label>
                    <input
                        id="cloudLevel"
                        type="number"
                        value={cloudLevel}
                        min={0}
                        max={10}
                        onChange={(e) => setCloudLevel(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="moonPhase">Moon Phase:</label>
                    <select
                        id="moonPhase"
                        value={moonPhase}
                        onChange={(e) => setMoonPhase(MoonPhase[e.target.value as keyof typeof MoonPhase])}
                    >
                        {Object.values(MoonPhase).map((phase) => (
                            <option key={phase} value={phase}>
                                {phase}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="rainType">Rain Type:</label>
                    <select
                        id="rainType"
                        value={rainType}
                        onChange={(e) => setRainType(RainType[e.target.value as keyof typeof RainType])}
                    >
                        {Object.values(RainType).map((type) => (
                            <option key={type} value={type} disabled={type !== RainType.None && rainDisabled}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fogLevel">Fog Level:</label>
                    <input
                        id="fogLevel"
                        type="number"
                        value={fogLevel}
                        min={0}
                        max={10}
                        onChange={(e) => setFogLevel(Number(e.target.value))}
                    />
                </div>

                <br />
                <button type="submit" className="submit-button">{ skyId ? 'Update Sky' : 'Create Sky'}</button>
            </form>
            <Link to="/" className="back-link">Back</Link>
        </div>
    );
}

export default SkyForm;