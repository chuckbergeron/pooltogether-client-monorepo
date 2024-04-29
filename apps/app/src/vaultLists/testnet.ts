import { VaultList } from '@shared/types'
import { NETWORK } from '@shared/utilities'

export const testnetVaults: VaultList['tokens'] = [
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0x95849a4C2E58F4f8Bf868ADEf10B05747A24eE71',
    name: 'Prize POOL',
    decimals: 18,
    symbol: 'pPOOL',
    logoURI: 'https://etherscan.io/token/images/pooltogether_32.png',
    extensions: {
      underlyingAsset: {
        address: '0x24Ffb8Ca3DeA588B267A15F1d94766dCbA034aE6',
        symbol: 'POOL',
        name: 'PoolTogether'
      }
    }
  },
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0xE039683D5f9717d6f74D252722546cFedAB32250',
    name: 'Prize DAI',
    decimals: 18,
    symbol: 'pDAI',
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
    extensions: {
      underlyingAsset: {
        address: '0xeF38f21EC5477f6E3D4b7e9f0DEa44A788C669b0',
        symbol: 'DAI',
        name: 'Dai Stablecoin'
      }
    }
  },
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0xCC255d71c57A5D5f92183a66b7fC5589151aDcD0',
    name: 'Prize USDC',
    decimals: 6,
    symbol: 'pUSDC',
    logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
    extensions: {
      underlyingAsset: {
        address: '0xdED96a50515f1a4620a3C5244fAe15eD7D216d4a',
        symbol: 'USDC',
        name: 'USD Coin'
      }
    }
  },
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0xE1498d24A398b588b5e3F2c5d230991304203AD9',
    name: 'Prize GUSD',
    decimals: 2,
    symbol: 'pGUSD',
    logoURI:
      'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
    extensions: {
      underlyingAsset: {
        address: '0x68F92539f64E486f2853BB2892933a21b54829E5',
        symbol: 'GUSD',
        name: 'Gemini Dollar'
      }
    }
  },
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0x02dda5914b78f0751FdF5BBe2050eFABD95DfF46',
    name: 'Prize WBTC',
    decimals: 8,
    symbol: 'pWBTC',
    logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
    extensions: {
      underlyingAsset: {
        address: '0x6c6a62B0861d8F2B946456Ba9dCD0F3BAeC54147',
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin'
      }
    }
  },
  {
    chainId: NETWORK.optimism_sepolia,
    address: '0xEd2f166aD10b247f67C3FcE7a4C8e0C5E54247ea',
    name: 'Prize WETH',
    decimals: 18,
    symbol: 'pWETH',
    logoURI: 'https://etherscan.io/token/images/weth_28.png',
    extensions: {
      underlyingAsset: {
        address: '0x4a61B6f54157840E80e0C47f1A628C0B3744a739',
        symbol: 'WETH',
        name: 'Wrapped Ether'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0x52e119Db61648df0680616f2E9Bd59a8B470bF1e',
    name: 'Prize POOL',
    decimals: 18,
    symbol: 'pPOOL',
    logoURI: 'https://etherscan.io/token/images/pooltogether_32.png',
    extensions: {
      underlyingAsset: {
        address: '0x71B271952c3335e7258fBdCAE5CD3a57E76b5b51',
        symbol: 'POOL',
        name: 'PoolTogether'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0x01F6351FE2651C411cD98910AAe2ADEfCD034c59',
    name: 'Prize DAI',
    decimals: 18,
    symbol: 'pDAI',
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
    extensions: {
      underlyingAsset: {
        address: '0x82557c5157fcBEddD80aE09647Ec018a0083a638',
        symbol: 'DAI',
        name: 'Dai Stablecoin'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0xA51D2A8dd481800E9576aeb341340411b2B28679',
    name: 'Prize USDC',
    decimals: 6,
    symbol: 'pUSDC',
    logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
    extensions: {
      underlyingAsset: {
        address: '0xC88130e55Db4a3BA162984d6EFE4fF982BC0E227',
        symbol: 'USDC',
        name: 'USD Coin'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0xeD665c4c6ec4315131ea5266dA4c3Be4694D0615',
    name: 'Prize GUSD',
    decimals: 2,
    symbol: 'pGUSD',
    logoURI:
      'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
    extensions: {
      underlyingAsset: {
        address: '0x431bf0FE8acB5C79C4f4FBc63f6De0756e928Dd3',
        symbol: 'GUSD',
        name: 'Gemini Dollar'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0x7BA33795f824c3494a7D8285E7cc20b83A7d7dBa',
    name: 'Prize WBTC',
    decimals: 8,
    symbol: 'pWBTC',
    logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
    extensions: {
      underlyingAsset: {
        address: '0x214e35Ca60a828cC44Fae2f2b97D37C116B02229',
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin'
      }
    }
  },
  {
    chainId: NETWORK.base_sepolia,
    address: '0x137a5E9cF386eA09bE2304f17052613609D24660',
    name: 'Prize WETH',
    decimals: 18,
    symbol: 'pWETH',
    logoURI: 'https://etherscan.io/token/images/weth_28.png',
    extensions: {
      underlyingAsset: {
        address: '0x41D7dDF285A08C74A4cB9FDc979C703B10c30ab1',
        symbol: 'WETH',
        name: 'Wrapped Ether'
      }
    }
  }
]
