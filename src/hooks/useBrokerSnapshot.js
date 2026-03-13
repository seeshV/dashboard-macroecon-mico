import { useQuery } from '@tanstack/react-query';
import { fetchBrokerSnapshot } from '../api/broker';

export function useBrokerSnapshot() {
  return useQuery({
    queryKey: ['broker-snapshot'],
    queryFn: fetchBrokerSnapshot,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
  });
}
