// AddContact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddContact.module.css";

function AddContact({ contacts, onDelete, onEdit, setContacts }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  // حذف همه کارت‌ها
  const deleteAll = () => {
    if (window.confirm("Are you sure you want to delete all contacts?")) {
      setContacts([]);
      setSelectedCards([]);
    }
  };

  // انتخاب یا لغو انتخاب کارت
  const toggleSelectCard = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((i) => i !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  // حذف کارت‌های انتخاب‌شده
  const deleteSelected = () => {
    if (selectedCards.length === 0) return;
    if (window.confirm("Are you sure you want to delete selected contacts?")) {
      setContacts((prev) =>
        prev.filter((_, idx) => !selectedCards.includes(idx))
      );
      setSelectedCards([]);
    }
  };

  return (
    <div>
      <div className={styles.parentInfo}>
        <h1 className={styles.AddInfo}>Contact Manager</h1>

        {/* دکمه‌ها فقط در صورت وجود کارت نمایش داده شوند */}
        {contacts.length > 0 && (
          <div>
            <button
              className={styles.buttonInfo}
              onClick={() => navigate("/add")}
            >
              + New
            </button>

            <button
              className={styles.buttonInfo}
              onClick={deleteAll}
              style={{ marginLeft: "10px", backgroundColor: "red" }}
            >
              Delete All
            </button>

            {selectedCards.length > 0 && (
              <button
                className={styles.buttonInfo}
                onClick={deleteSelected}
                style={{ marginLeft: "10px", backgroundColor: "orange" }}
              >
                Delete Selected ({selectedCards.length})
              </button>
            )}
          </div>
        )}

        {/* اگر هیچ کارتی وجود ندارد فقط دکمه New نمایش داده شود */}
        {contacts.length === 0 && (
          <button
            className={styles.buttonInfo}
            onClick={() => navigate("/add")}
          >
            + New
          </button>
        )}
      </div>

      <p className={styles.paragInfo}>
        Welcome to contact list manager application. Please navigate through
        different areas.
      </p>

      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {contacts.length === 0 && (
            <p className={styles.cardParagraphNoContatct}>
              NO CONTACTS ADDED YET!!
            </p>
          )}

          {contacts.map((contact, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: "relative" }}
            >
              {/* چک‌باکس در سمت چپ */}
              <input
                type="checkbox"
                checked={selectedCards.includes(index)}
                onChange={() => toggleSelectCard(index)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />

              {/* دکمه‌های اکشن هنگام هاور */}
              {hoveredIndex === index && (
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    onClick={() => onDelete(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    onClick={() => onEdit(index, navigate)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.view}`}
                    onClick={() =>
                      alert(
                        `👤 ${contact.user}\n📧 ${contact.email}\n💼 ${contact.job}\n📱 ${contact.phone}`
                      )
                    }
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
              )}

              {contact.img && (
                <img
                  src={contact.img}
                  alt={contact.user}
                  className={styles.cardImg}
                />
              )}
              <h3 className={styles.contactsHeader}>{contact.user}</h3>
              <p className={styles.contactsEmails}>
                <span>Email</span> : {contact.email}
              </p>
              <p className={styles.contactsJob}>
                <span>Job</span> : {contact.job}
              </p>
              <p className={styles.contactsPhone}>
                <span>Phone</span> : {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddContact;
