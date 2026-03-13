import { useQuery } from '@tanstack/react-query';
import { fetchMacroOverview } from '../api/bcb';

export function useBCBSeries() {
  return useQuery({
    queryKey: ['macro-overview'],
    queryFn: fetchMacroOverview,
    refetchInterval: 1000 * 60 * 10,
  });
}
