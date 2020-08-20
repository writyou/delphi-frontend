import { useCallback } from 'react';

import { useApi } from 'services/api';

export function useGetDepositLimit$(poolAddress: string) {
  const api = useApi();

  return useCallback(() => api.user.getInvestmentsDepositLimit$(poolAddress), [api, poolAddress]);
}
