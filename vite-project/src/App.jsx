import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "./Components/Navbar/Nav";
import AddContact from "./Components/AddContact/AddContact";
import UserInfo from "./Components/UserInfo/UserInfo";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateContact = (contact, navigate) => {
    if (editData !== null && editIndex !== null) {
      // بروزرسانی مخاطب موجود
      setContacts((prev) =>
        prev.map((c, idx) => (idx === editIndex ? contact : c))
      );
      setEditData(null);
      setEditIndex(null);
    } else {
      // اضافه کردن مخاطب جدید
      setContacts((prev) => [...prev, contact]);
    }
    navigate("/");
  };

  const deleteContact = (index) => {
    setContacts((prev) => prev.filter((_, idx) => idx !== index));
  };

  const editContact = (index, navigate) => {
    setEditData(contacts[index]);
    setEditIndex(index);
    navigate("/add");
  };

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <AddContact
              contacts={contacts}
              onDelete={deleteContact}
              onEdit={editContact}
            />
          }
        />
        <Route
          path="/add"
          element={<UserInfoWrapper addOrUpdateContact={addOrUpdateContact} editData={editData} />}
        />
      </Routes>
    </Router>
  );
}

// wrapper برای استفاده از useNavigate
function UserInfoWrapper({ addOrUpdateContact, editData }) {
  const navigate = useNavigate();
  return (
    <UserInfo
      onAdd={(contact) => addOrUpdateContact(contact, navigate)}
      editData={editData}
    />
  );
}

export default App;
