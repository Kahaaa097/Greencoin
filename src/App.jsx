import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [{ internalType: "address", name: "_verifier", type: "address" }],
    name: "addVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "string", name: "_actionType", type: "string" }
    ],
    name: "grantPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getMyPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

const contractAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [points, setPoints] = useState(null);
  const [verifier, setVerifier] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [actionType, setActionType] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner().then(signer => {
        setAccount(signer.address);
        const greencoin = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(greencoin);
      });
    } else {
      alert("MetaMask not found");
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  const handleAddVerifier = async () => {
    try {
      const tx = await contract.addVerifier(verifier);
      await tx.wait();
      alert("Verifier added!");
    } catch (err) {
      alert("Error adding verifier: " + err.message);
    }
  };

  const handleGrantPoints = async () => {
    try {
      const tx = await contract.grantPoints(to, amount, actionType);
      await tx.wait();
      alert("Points granted!");
    } catch (err) {
      alert("Error granting points: " + err.message);
    }
  };

  const handleGetMyPoints = async () => {
    const pts = await contract.getMyPoints();
    setPoints(pts.toString());
  };

  const handleSubmitProof = () => {
    if (!description || !imageFile) {
      alert("Vui lòng nhập mô tả và chọn hình ảnh.");
      return;
    }

    alert(`Mô tả: ${description}\nHình ảnh: ${imageFile.name}`);
    // (Tương lai) Tải ảnh lên IPFS và ghi nhận trên contract
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 text-center">
      <h1 className="text-2xl font-bold">🌱 GreenCoin DApp</h1>

      <button onClick={connectWallet} className="bg-green-600 text-white px-4 py-2 rounded">
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>

      {/* Add Verifier */}
      <div>
        <h2 className="font-semibold mt-4">Add Verifier</h2>
        <input
          type="text"
          placeholder="Verifier address"
          value={verifier}
          onChange={e => setVerifier(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={handleAddVerifier} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
          Add Verifier
        </button>
      </div>

      {/* Grant Points */}
      <div>
        <h2 className="font-semibold mt-4">Grant Points</h2>
        <input
          type="text"
          placeholder="Recipient address"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Action type (e.g. trồng cây)"
          value={actionType}
          onChange={e => setActionType(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={handleGrantPoints} className="mt-2 bg-purple-600 text-white px-4 py-1 rounded">
          Grant Points
        </button>
      </div>

      {/* Get My Points */}
      <div>
        <h2 className="font-semibold mt-4">Get My Points</h2>
        <button onClick={handleGetMyPoints} className="bg-gray-700 text-white px-4 py-1 rounded">
          View My Points
        </button>
        {points !== null && <p className="mt-2">You have <b>{points}</b> GRC</p>}
      </div>

      {/* Record Action */}
      <div>
        <h2 className="font-semibold mt-4">Ghi nhận hành động</h2>
        <input
          type="text"
          placeholder="Mô tả hành động (e.g. Nhặt rác ở công viên)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          className="border px-2 py-1 rounded w-full mb-2"
        />
        <button onClick={handleSubmitProof} className="bg-yellow-600 text-white px-4 py-1 rounded">
          Gửi minh chứng
        </button>
      </div>
    </div>
  );
}

export default App;
