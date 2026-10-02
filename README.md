# GreenCoin

GreenCoin is a small blockchain-based project that rewards users with **GRC points** for participating in environmental activities.

The project was built to explore how **blockchain, Web3 wallets, and a simple backend** can work together in an environmental reward application.

> **Status:** Academic Project

## Tech Stack

* **Frontend:** React, Vite, JavaScript
* **Web3:** ethers.js, MetaMask
* **Backend:** Node.js, Express.js, Multer
* **Blockchain:** Solidity, Ethereum-compatible network

## Features

* Connect wallet with MetaMask
* Add verifier addresses
* Grant GRC points to users based on environmental activities
* Check the user's GRC points
* Upload images as evidence of environmental activities
* Backend API for processing submitted images

## How It Works

```text
User
 ↓
Connect MetaMask
 ↓
Submit environmental activity
 ↓
Upload evidence
 ↓
Verifier checks the activity
 ↓
GRC points are granted
```

The frontend uses **ethers.js** to interact with the smart contract, while the Node.js backend handles image uploads.

## Project Structure

```text
greencoin/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── server.js
│   └── package.json
├── contracts/
├── package.json
└── vite.config.js
```

## Run Locally

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
npm start
```

The backend runs on:

```text
http://localhost:3000
```

## Note

This is a prototype developed for learning purposes. The image verification part is currently a basic implementation and has not been connected to a full image-matching system yet.

## Future Improvements

* Improve image verification
* Add a verifier dashboard
* Store environmental evidence using IPFS
* Add transaction/activity history
* Improve smart-contract access control
