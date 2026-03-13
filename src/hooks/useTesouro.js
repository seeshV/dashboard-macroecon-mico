import { useQuery } from '@tanstack/react-query';
import { fetchTesouroTitles } from '../api/tesouro';

export function useTesouro() {
  return useQuery({
    queryKey: ['tesouro-titulos'],
    queryFn: fetchTesouroTitles,
    staleTime: 1000 * 60 * 30,
  });
}
