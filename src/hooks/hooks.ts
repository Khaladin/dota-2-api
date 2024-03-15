import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api";

const getHeroStats = () => {
  return client.get('/heroStats');
}

const getHeroMatchup = (heroId: number) => {
  return client.get(`/heroes/${heroId}/matchups`);
}

export const useHeroes = () => {
  return useSuspenseQuery({
    queryKey: ['heroes'],
    queryFn: getHeroStats,
    select: data => data.data,
  })
}

export const useHeroMatchups = (heroId: number) => {
  return useQuery({
    queryKey: ['matchup'],
    queryFn: () => getHeroMatchup(heroId),
    select: data => data.data,
    enabled: false
  })
}