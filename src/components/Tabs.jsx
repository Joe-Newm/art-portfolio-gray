import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../components/EditModal';
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="bg-gray-300 h-full flex gap-2 font-size !text-xs flex-grow pl-4 pr-4">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={activeTab === tab.id ? "tab-selected" : "tab"}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
}