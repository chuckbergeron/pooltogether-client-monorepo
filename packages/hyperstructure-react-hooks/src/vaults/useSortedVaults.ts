import { PrizePool, Vault } from '@generationsoftware/hyperstructure-client-js'
import { TokenWithAmount, TokenWithPrice, TokenWithSupply } from '@shared/types'
import { useMemo, useState } from 'react'
import { Address, formatUnits } from 'viem'
import { useAccount } from 'wagmi'
import {
  useAllPrizeValue,
  useAllUserVaultBalances,
  useAllVaultPrizeYields,
  useAllVaultSharePrices,
  useVaults
} from '..'

export type SortId = 'prizes' | 'winChance' | 'totalBalance' | 'userBalance'
export type SortDirection = 'asc' | 'desc'

/**
 * Returns a sorted array of vaults
 *
 * NOTE: In order to sort by prizes and/or win chance, provide prize pools in `options`
 * @param vaultsArray an unsorted array of vaults
 * @param options optional settings
 * @returns
 */
export const useSortedVaults = (
  vaultsArray: Vault[],
  options?: {
    prizePools?: PrizePool[]
    defaultSortId?: SortId
    defaultSortDirection?: SortDirection
  }
) => {
  const [sortVaultsBy, setSortVaultsBy] = useState<SortId>(options?.defaultSortId ?? 'totalBalance')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    options?.defaultSortDirection ?? 'desc'
  )

  const vaults = useVaults(vaultsArray)

  const { address: userAddress } = useAccount()

  const { data: allVaultShareTokens, isFetched: isFetchedAllVaultShareTokens } =
    useAllVaultSharePrices(vaults)

  const { data: allUserVaultBalances, isFetched: isFetchedAllUserVaultBalances } =
    useAllUserVaultBalances(vaults, userAddress as Address)

  const { data: allPrizeValue, isFetched: isFetchedAllPrizeValue } = useAllPrizeValue(
    options?.prizePools ?? []
  )

  const { data: allVaultPrizeYields, isFetched: isFetchedAllVaultPrizeYields } =
    useAllVaultPrizeYields(vaults, options?.prizePools ?? [])

  const isFetched =
    !!vaults &&
    isFetchedAllVaultShareTokens &&
    (isFetchedAllUserVaultBalances || !userAddress) &&
    (isFetchedAllPrizeValue || !options?.prizePools?.length) &&
    (isFetchedAllVaultPrizeYields || !options?.prizePools?.length)

  const sortedVaults = useMemo(() => {
    if (isFetched && !!allVaultShareTokens) {
      let sortedVaults = sortVaultsByTotalDeposits(vaultsArray, allVaultShareTokens)

      if (sortVaultsBy === 'prizes' && !!options?.prizePools?.length) {
        sortedVaults = sortVaultsByPrizes(sortedVaults, options.prizePools, allPrizeValue)
      } else if (sortVaultsBy === 'winChance') {
        sortedVaults = sortVaultsByWinChance(sortedVaults, allVaultPrizeYields)
      } else if (sortVaultsBy === 'userBalance' && !!allUserVaultBalances) {
        sortedVaults = sortVaultsByUserBalances(
          sortedVaults,
          allVaultShareTokens,
          allUserVaultBalances
        )
      }

      if (sortDirection === 'asc') {
        sortedVaults.reverse()
      }

      return sortedVaults
    } else {
      return []
    }
  }, [vaultsArray, sortVaultsBy, sortDirection, userAddress, isFetched])

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return {
    sortedVaults,
    sortVaultsBy,
    setSortVaultsBy,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    isFetched
  }
}

const sortVaultsByPrizes = (
  vaults: Vault[],
  prizePools: PrizePool[],
  prizeValue: { [prizePoolId: string]: number }
) => {
  return [...vaults].sort((a, b) => {
    const prizes = (v: Vault) => {
      const prizePool = prizePools.find((pool) => pool.chainId === v.chainId)
      if (!prizePool) return 0
      return prizeValue[prizePool.id] ?? 0
    }

    return prizes(b) - prizes(a)
  })
}

const sortVaultsByWinChance = (
  vaults: Vault[],
  prizeYields: {
    [vaultId: string]: number
  }
) => {
  return [...vaults].sort((a, b) => {
    const winChance = (v: Vault) => prizeYields[v.id] ?? 0

    return winChance(b) - winChance(a)
  })
}

const sortVaultsByTotalDeposits = (
  vaults: Vault[],
  shareTokens: { [vaultId: string]: TokenWithSupply & TokenWithPrice }
) => {
  return [...vaults].sort((a, b) => {
    const price = (v: Vault) => shareTokens[v.id]?.price ?? 0
    const balance = (v: Vault) => shareTokens[v.id]?.totalSupply ?? 0n
    const decimals = (v: Vault) => shareTokens[v.id]?.decimals ?? 0

    const amount = (v: Vault) => parseFloat(formatUnits(balance(v), decimals(v)))
    const value = (v: Vault) => amount(v) * price(v)

    return value(b) - value(a)
  })
}

const sortVaultsByUserBalances = (
  vaults: Vault[],
  shareTokens: { [vaultId: string]: TokenWithSupply & TokenWithPrice },
  userBalances: { [vaultId: string]: TokenWithAmount }
) => {
  return [...vaults].sort((a, b) => {
    const price = (v: Vault) => shareTokens[v.id]?.price ?? 0
    const shareBalance = (v: Vault) => userBalances[v.id]?.amount ?? 0n
    const decimals = (v: Vault) => shareTokens[v.id]?.decimals ?? 0

    const amount = (v: Vault) => parseFloat(formatUnits(shareBalance(v), decimals(v)))
    const value = (v: Vault) => amount(v) * price(v)

    return value(b) - value(a)
  })
}
