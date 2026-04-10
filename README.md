# AfriFlow 🌍⚡

![AfriFlow Hero Image](/afriflow_hero.png)

## AI-Powered Cross-Border Payment Agent for Africa

AfriFlow is an innovative fintech application designed to empower African freelancers by providing a seamless, low-cost, and instant cross-border payment solution. Built on the Solana blockchain, AfriFlow enables users to receive payments in USDC, convert them to Nigerian Naira (NGN), and withdraw directly to their local bank accounts, all within minutes.

## The Problem We're Solving

Every year, the African diaspora sends over $100 billion back home. However, traditional remittance services often impose predatory fees, consuming up to 15% of each transaction. This translates to a staggering $15 billion lost annually—funds that could otherwise support families, fund education, or stimulate local businesses across Africa.

## Our Solution: Meet AfriFlow

AfriFlow addresses this critical issue by leveraging AI and blockchain technology to offer a transparent, efficient, and affordable payment rail. Our platform is built on Cronos x402 rails, ensuring rapid and secure transactions. Users can interact with AfriFlow in plain English, French, Swahili, or Arabic, making financial management accessible and intuitive.

## Key Features

*   **Instant Settlement**: Payments land in under 5 seconds on Solana, significantly faster than traditional banking systems that can take 3–5 business days.
*   **Only 1% Fee**: AfriFlow charges a flat 1% fee, a substantial reduction compared to the 3–5% typically charged by services like Payoneer. There are no hidden charges.
*   **No Gatekeeping**: Access to AfriFlow requires no invitation, no US address, and no credit card. Users simply connect their Solana-compatible wallet (e.g., Phantom).
*   **Mobile-First Design**: Optimized for Android and low-bandwidth environments, AfriFlow works seamlessly in any mobile browser, ensuring broad accessibility across Africa.
*   **AI-Powered Intent Recognition**: Utilizes the Crypto.com AI Agent SDK for natural language understanding, allowing users to initiate complex transactions with simple commands.
*   **Real-time Market Data**: Integrates with the Market Data MCP for accurate, real-time exchange rates.
*   **Programmable Payments**: Leverages Cronos x402 facilitator for advanced features like milestone-based escrow.

## Technology Stack

AfriFlow is built with a modern and robust technology stack:

*   **Frontend**: React.js (with `useState` and `useEffect` hooks) for a dynamic and responsive user interface.
*   **Styling**: Inline styles and CSS animations for a sleek, mobile-first design, utilizing custom color palettes and fonts (Syne, DM Sans).
*   **Blockchain**: Solana for high-speed, low-cost transactions.
*   **Stablecoin**: USDC (SPL token) for stable value transfers.
*   **AI Integration**: Crypto.com AI Agent SDK for natural language processing.
*   **Data**: Market Data MCP for real-time financial information.
*   **Payments**: Cronos x402 rails for secure and programmable payment execution.
*   **Version Control**: Git and GitHub for collaborative development and code management.

## Project Structure

The project is structured to ensure modularity and maintainability. While the provided `AfriFlow.jsx` is a single file, a typical React project would have a structure similar to this:

```
AfriFlow/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Ic.jsx
│   │   ├── Spinner.jsx
│   │   ├── ReceiveModal.jsx
│   │   ├── ConvertModal.jsx
│   │   ├── WithdrawModal.jsx
│   │   ├── TxRow.jsx
│   │   ├── Landing.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx (AfriFlow.jsx content would typically be broken down into these components)
│   ├── index.js
│   └── styles/
│       └── main.css (or integrated into components)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

To run AfriFlow locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Ernestinomike/afriflow.git
    cd afriflow
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add necessary API keys or configuration details (e.g., for Crypto.com AI Agent SDK, Market Data MCP, Cronos x402). Refer to `.env.example` for guidance.

4.  **Run the application**:
    ```bash
    npm start
    # or yarn start
    ```
    This will typically open the application in your browser at `http://localhost:3000`.

## Usage

AfriFlow provides a user-friendly interface for managing cross-border payments:

1.  **Connect Wallet**: Connect your Solana-compatible wallet (e.g., Phantom) to the application.
2.  **Receive USDC**: Generate your Solana wallet address to receive USDC payments from clients globally.
3.  **Convert to NGN**: Easily convert your USDC balance to Nigerian Naira at competitive rates with a transparent 1% fee.
4.  **Withdraw to Bank**: Withdraw your NGN balance directly to your preferred local bank or mobile money account.
5.  **Track Transactions**: Monitor all your incoming, converted, and withdrawn transactions through the dashboard.

## Contributing

We welcome contributions to AfriFlow! Please feel free to fork the repository, create a new branch, and submit a pull request with your enhancements or bug fixes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Note: A LICENSE file would typically be added to the repository.)
