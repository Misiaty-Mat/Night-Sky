import { useCallback, useEffect, useState } from "react";
import {httpGetSkies}  from "../api/requests"
import { Sky } from "../model/Sky";

function useSkies() {
  const [skies, saveSkies] = useState<Sky[]>([]);

  const getSkies = useCallback(async () => {
    const fetchedSkies: Sky[] = await httpGetSkies();
    saveSkies(fetchedSkies);
  }, []);

  useEffect(() => {
    getSkies();
  }, [getSkies]);

  return skies;
}

export default useSkies;
