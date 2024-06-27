import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import { NO_REFETCH } from '@shared/generic-react-hooks'
import { getVaultAddressesFromFactory, NETWORK } from '@shared/utilities'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

export const useDeployedVaultAddresses = (prizePool: PrizePool) => {
  return useQuery({
    queryKey: ['deployedVaultAddresses', prizePool?.id],
    queryFn: async () => {
      let vaultAddresses: Lowercase<Address>[] = []

      const addresses = await getVaultAddressesFromFactory(prizePool.publicClient)
      vaultAddresses.push(...addresses)

      if (prizePool.chainId === NETWORK.optimism) {
        const oldAddresses = await getVaultAddressesFromFactory(prizePool.publicClient, {
          factoryAddress: '0xF0F151494658baE060034c8f4f199F74910ea806'
        })
        vaultAddresses.push(...oldAddresses)
      }

      return vaultAddresses
    },
    enabled: !!prizePool,
    ...NO_REFETCH
  })
}
