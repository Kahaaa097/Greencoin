// ... (imports và ABI giữ nguyên như trước)
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
const contractAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
const backendUrl = "https://greencoin-backend-p2xm.onrender.com";

function App() {
  const [actionDescription, setActionDescription] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [points, setPoints] = useState(null);
  const [verifier, setVerifier] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [checkResult, setCheckResult] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner().then(async (signer) => {
        const address = await signer.getAddress(); // Fix lỗi lấy account
        setAccount(address);
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
      const tx = await contract.grantPoints(to, amount, ""); // Bỏ actionType
      await tx.wait();
      alert("Points granted!");
    } catch (err) {
      alert("Error granting points: " + err.message);
    }
  };

  const handleGetMyPoints = async () => {
    try {
      const pts = await contract.getMyPoints();
      setPoints(pts.toString());
    } catch (err) {
      alert("Error getting points: " + err.message);
    }
  };

  const handleImageCheck = async () => {
    if (!image) {
      alert("Vui lòng chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`${backendUrl}/check-image`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setCheckResult(data.message);

      if (data.success) {
        alert("✅ Ảnh hợp lệ, bạn có thể tiếp tục gửi minh chứng.");
      } else {
        alert("⚠️ Ảnh không hợp lệ: " + data.message);
      }
    } catch (err) {
      alert("Lỗi khi gửi ảnh: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 text-center">
      <h1 className="text-2xl font-bold">🌱 GreenCoin DApp</h1>

      <button onClick={connectWallet} className="bg-green-600 text-white px-4 py-2 rounded">
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>

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
        <button onClick={handleGrantPoints} className="mt-2 bg-purple-600 text-white px-4 py-1 rounded">
          Grant Points
        </button>
      </div>

      <div>
        <h2 className="font-semibold mt-4">Get My Points</h2>
        <button onClick={handleGetMyPoints} className="bg-gray-700 text-white px-4 py-1 rounded">
          View My Points
        </button>
        {points !== null && <p className="mt-2">You have <b>{points}</b> GRC</p>}
      </div>

  <div>
  <h2 className="font-semibold mt-4">Ghi nhận hành động</h2>
  <input
    type="text"
    placeholder="Mô tả hành động (e.g. Nhặt rác ở công viên)"
    value={actionDescription}
    onChange={e => setActionDescription(e.target.value)}
    className="border px-2 py-1 rounded w-full mb-2"
  />
  <input
    type="file"
    accept="image/*"
    onChange={e => {
      const file = e.target.files[0];
      if (file) {
        alert(`Bạn đã chọn ảnh: ${file.name}\nMô tả: ${actionDescription}`);
        // Sau này gửi ảnh + mô tả đến backend
      }
    }}
    className="border px-2 py-1 rounded w-full mb-2"
  />
  <button
    className="bg-green-600 text-white px-4 py-1 rounded"
    onClick={() => alert("Chức năng gửi minh chứng đang phát triển")}
  >
    Gửi minh chứng
  </button>
</div>


export default App;
