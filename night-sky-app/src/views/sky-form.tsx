import React, { useEffect, useState } from 'react';
import { createSky, fetchSkyById, updateSky } from '../api/requests';
import { MoonPhase, RainType } from '../model/Sky';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SkyForm() {
    const navigate = useNavigate();
    const skyId = Number(useParams().skyId);

    const [cloudLevel, setCloudLevel] = useState(0);
    const [moonPhase, setMoonPhase] = useState(MoonPhase.New);
    const [rainType, setRainType] = useState(RainType.None);
    const [fogLevel, setFogLevel] = useState(0);

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Cloud Level:
                    <input type="number" value={cloudLevel} min={0} max={10} onChange={(e) => setCloudLevel(Number(e.target.value))} />
                </label>
                <br />
                <label>
                    Moon Phase:
                    <select value={moonPhase} onChange={(e) => setMoonPhase(MoonPhase[e.target.value as keyof typeof MoonPhase])}>
                        {Object.values(MoonPhase).map((moonPhase) => (
                            <option key={moonPhase} value={moonPhase}>
                                {moonPhase}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Rain Type:

                    <select value={rainType} onChange={(e) => setRainType(RainType[e.target.value as keyof typeof RainType])}>
                        {Object.values(RainType).map((rainType) => (
                            <option key={rainType} value={rainType}>
                                {rainType}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Fog Level:
                    <input type="number" value={fogLevel} min={0} max={10} onChange={(e) => setFogLevel(Number(e.target.value))} />
                </label>
                <br />
                <button type="submit">{ skyId ? 'Update Sky' : 'Create Sky'}</button>
            </form>
            <Link to="/">Back</Link>
        </div>
    );
}

export default SkyForm;