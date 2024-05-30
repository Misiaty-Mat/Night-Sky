import { useCallback, useEffect, useState } from "react";
import { fetchSkyById }  from "../api/requests"
import { Constellation } from "../model/Constellation";

function useSkyConstellations(skyId: number) {
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  const fetchConstellations = useCallback(async () => {
    const fetchedConstellations = (await fetchSkyById(skyId)).constellations;
    if (!fetchedConstellations) return;
    setConstellations(fetchedConstellations);
  }, [skyId]);

  useEffect(() => {
    fetchConstellations();
  }, [fetchConstellations, skyId]);

  return constellations;
}

export default useSkyConstellations;
