const opensea = require('opensea-js')
const OpenSeaPort = opensea.OpenSeaPort
const Network = opensea.Network
const MnemonicWalletSubprovider = require('@0x/subproviders').MnemonicWalletSubprovider
const RPCSubprovider = require('web3-provider-engine/subproviders/rpc')
const Web3ProviderEngine = require('web3-provider-engine')

const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const TARGET_CONTRACT_ADDRESS = process.env.TARGET_CONTRACT_ADDRESS
const MY_ADDRESS = process.env.MY_ADDRESS
const NETWORK = process.env.NETWORK
const API_KEY = process.env.API_KEY || '' // API key is optional but useful if you're doing a high volume of requests.

if (!MNEMONIC || !INFURA_KEY || !NETWORK || !MY_ADDRESS || !TARGET_CONTRACT_ADDRESS) {
    console.error('Please set a mnemonic, infura key, user address, network, and target NFT contract address.')
    return
}

// Set up the wallet and provider stuff.
const BASE_DERIVATION_PATH = `44'/60'/0'/0`

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({ mnemonic: MNEMONIC, baseDerivationPath: BASE_DERIVATION_PATH})
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: 'https://' + NETWORK + '.infura.io/v3/' + INFURA_KEY,
})

const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(mnemonicWalletSubprovider)
providerEngine.addProvider(infuraRpcSubprovider)
providerEngine.start()

// Initialize the seaport.
const seaport = new OpenSeaPort(providerEngine, {
    networkName: NETWORK === 'mainnet' ? Network.Main : Network.Rinkeby,
    apiKey: API_KEY
}, (arg) => console.log(arg))

async function main() {
    const tokenId = '39'

    // Make a bid on an item. 
    console.log(`Bidding on https://opensea.io/assets/${TARGET_CONTRACT_ADDRESS}/${tokenId}`)
    try {
        const buyOrder = await seaport.createBuyOrder({
            asset: {
                tokenId,
                tokenAddress: TARGET_CONTRACT_ADDRESS
            },
            startAmount: .00002,
            accountAddress: MY_ADDRESS
        })
        console.log(`Successfully created a buy order! ${buyOrder.asset.openseaLink}\n`)
    } catch(e) {
        console.log('Failed:', e)
    }
    
}

main().then(() => process.exit())