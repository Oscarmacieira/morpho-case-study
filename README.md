# Morpho Case Study

A Next.js application for interacting with Morpho Protocol vaults, allowing users to view and withdraw their assets.

## Tech Stack

### Core Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component system

### Web3 Technologies

- **wagmi** - React Hooks for Ethereum
- **viem** - TypeScript Interface for Ethereum
- **RainbowKit** - Wallet connection library
- **Tenderly** - Virtual mainnet for testing

### State Management & Data Fetching

- **TanStack Query** - (React Query) for server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

## Project Structure

```text
.
├── app/ # Next.js app directory
├── components/ # Reusable UI components
│ ├── svgs/ # SVG components
│ └── ui/ # shadcn/ui components
├── features/ # Feature-based modules
│ ├── auth/ # Authentication related components
│ ├── layout/ # Layout components
│ ├── transaction/ # Transaction handling
│ └── vault/ # Vault interaction logic
├── lib/ # Utility functions and configurations
│ └── formatters/ # Formatting utilities
├── views/ # Page-level components
└── abis/ # Smart contract ABIs
```

## Key Features

- Web3 wallet integration with RainbowKit
- MetaMorpho vault interaction
- Real-time transaction tracking
- Responsive UI with dark/light mode support
- Type-safe contract interactions
- Error handling and loading states

## Architecture Decisions

### 1. Feature-First Architecture

The project uses a feature-first architecture, organizing code by domain rather than technical function. This improves maintainability and makes the codebase more intuitive to navigate.

### 2. Provider Pattern

Implements React Context providers for:

- Transaction state management
- Vault data management
- Web3 connectivity

### 3. Custom Hooks

Extensive use of custom hooks for:

- Contract interactions
- Transaction state management
- Data fetching and caching

### 4. Type Safety

Strong emphasis on type safety using:

- TypeScript for all components
- Zod for runtime validation
- Type-safe contract ABIs

## Environment Variables

Required environment variables:

```sh
NEXT_PUBLIC_TENDERLY_VIRTUAL_MAINNET_RPC=
NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=
NEXT_PUBLIC_MM_FACTORY_ADDRESS=
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
yarn install
```

3. Create a `.env.local` file with the required environment variables
4. Run the development server:

```sh
yarn dev
```

## Development Workflow

The project uses several key workflows:

### State Management

- Transaction states are managed through a dedicated provider
- Vault data is cached and managed using TanStack Query
- Form state handled by React Hook Form

### Styling

- Tailwind CSS for utility-first styling
- CSS Variables for theme customization
- shadcn/ui for consistent component design

### Web3 Integration

- RainbowKit for wallet connection
- wagmi hooks for contract interactions
- Tenderly for testing on virtual mainnet

## License

MIT
