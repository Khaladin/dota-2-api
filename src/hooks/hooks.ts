import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api";

const getHeroStats = () => {
  return client.get('/heroStats');
}

export const useHeroes = () => {
  return useSuspenseQuery({
    queryKey: ['heroes'],
    queryFn: getHeroStats,
    select: data => data.data,
  })
}