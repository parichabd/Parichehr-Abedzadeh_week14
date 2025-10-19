import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Nav from "./Components/Navbar/Nav";
import AddContact from "./Components/AddContact/AddContact";
import UserInfo from "./Components/UserInfo/UserInfo";
import Search from "./Components/Search/Search";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


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


  const editContact = (index, navigate) => {
    setEditData(contacts[index]);
    setEditIndex(index);
    navigate("/add");
  };

  // ✅ فیلتر بر اساس سرچ
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
                setContacts={setContacts} // ✅ این خط اضافه و بقیه حذف شوند
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
