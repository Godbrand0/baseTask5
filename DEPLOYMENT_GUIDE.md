# Todo List dApp Deployment Guide

This guide will walk you through deploying the TodoList smart contract.

## Prerequisites

- Foundry installed
- A wallet with ETH for deployment fees
- RPC endpoint (for testnet or mainnet)

## Testing the Contract

Before deploying, it's recommended to run the tests to ensure everything works correctly:

```bash
forge test
```

## Deployment Steps

### 1. Local Deployment

To deploy the contract locally:

```bash
forge script script/DeployTodoList.s.sol --rpc-url http://localhost:8545 --broadcast
```

### 2. Testnet Deployment

To deploy to a testnet (e.g., Sepolia):

```bash
forge script script/DeployTodoList.s.sol --rpc-url sepolia --broadcast --verify
```

Replace `sepolia` with your preferred testnet.

### 3. Mainnet Deployment

To deploy to mainnet:

```bash
forge script script/DeployTodoList.s.sol --rpc-url mainnet --broadcast --verify
```

## Post-Deployment

After deploying, you can create a sample list with some todos:

```bash
forge script script/DeployTodoList.s.sol --rpc-url <your_rpc_url> --broadcast --sig "createSampleList()" 
```

## Contract Address

After deployment, note down the contract address. You'll need this for the frontend integration.

## Verification

The `--verify` flag will automatically verify the contract on Etherscan if you have set up your API key:

```bash
export ETHERSCAN_API_KEY=your_api_key_here
```

## Frontend Integration

Once the contract is deployed, you can integrate it with the frontend. The contract ABI will be available in the `out` directory after compilation.

To get the ABI:

```bash
forge build
```

The ABI will be in `out/TodoList.sol/TodoList.json`.

## Environment Variables for Frontend

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_TODO_LIST_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

## Security Considerations

- Always test on testnet before deploying to mainnet
- Ensure you have sufficient ETH for gas fees
- Keep your private keys secure
- Consider using a multisig wallet for additional security