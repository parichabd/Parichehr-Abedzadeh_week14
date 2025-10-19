import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./Components/Navbar/Nav";
import AddContact from "./Components/AddContact/AddContact";
import UserInfo from "./Components/UserInfo/UserInfo";
import Search from "./Components/Search/Search";

function App() {
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem("contacts");
    return stored ? JSON.parse(stored) : [];
  });

  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addOrUpdateContact = (contact, navigate) => {
    if (editData !== null && editIndex !== null) {
      setContacts((prev) =>
        prev.map((c, idx) => (idx === editIndex ? contact : c))
      );
      setEditData(null);
      setEditIndex(null);
    } else {
      setContacts((prev) => [...prev, contact]);
    }
    navigate("/");
  };

  const deleteContact = (index) => {
    setContacts((prev) => prev.filter((_, idx) => idx !== index));
  };

  const deleteSelected = () => {
    if (selectedContacts.length === 0) return;
    setContacts((prev) =>
      prev.filter((_, idx) => !selectedContacts.includes(idx))
    );
    setSelectedContacts([]);
  };

  const deleteAll = () => {
    setContacts([]);
    setSelectedContacts([]);
  };

  const editContact = (index, navigate) => {
    setEditData(contacts[index]);
    setEditIndex(index);
    navigate("/add");
  };

  const toggleSelect = (index) => {
    setSelectedContacts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddContact
                contacts={filteredContacts}
                onDelete={deleteContact}
                onEdit={editContact}
                selectedContacts={selectedContacts}
                onToggleSelect={toggleSelect}
                onDeleteSelected={deleteSelected}
                onDeleteAll={deleteAll}
              />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <UserInfoWrapper
              addOrUpdateContact={addOrUpdateContact}
              editData={editData}
            />
          }
        />
      </Routes>
    </Router>
  );
}

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
