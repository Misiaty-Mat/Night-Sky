import { useCallback, useEffect, useState } from "react";
import { fetchConstellationById }  from "../api/requests"
import { Star } from "../model/Star";

function useConstellationStars(constellationId: number) {
  const [stars, setStars] = useState<Star[]>([]);

  const fetchStars = useCallback(async () => {
    const fetchedStars = (await fetchConstellationById(constellationId)).stars;
    if (!fetchedStars) return;
    setStars(fetchedStars);
  }, [constellationId]);

  useEffect(() => {
    fetchStars();
  }, [fetchStars, constellationId]);

  return stars;
}

export default useConstellationStars;
