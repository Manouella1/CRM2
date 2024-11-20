import React, { useState } from "react";
import axios from "axios";
import "../style/contactModal.css";

//KONTAKT SIDA och TA BORT KONTOT PÅ HEMSIDAN

const CustomerContact: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isContactModalVisible, setIsContactModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  //const API_URL = "http://localhost:3000";

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", { email, message });
      if (response.status === 200) {
        alert("Ditt meddelande har skickats!");
        setIsContactModalVisible(false);
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Fel vid skickande av meddelande:", error);
      alert("Ett fel inträffade. Försök igen senare.");
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.delete("/api/customers/delete", {
        data: { email },
      });
      if (response.status === 200) {
        alert("Kontot har raderats om det finns i systemet.");
        setIsDeleteModalVisible(false);
        setEmail("");
      } else {
        alert("Konto hittades inte.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ett fel inträffade vid radering. Försök igen senare.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Kontaktformulär</h2>
      <p className="description">
        Om du har några frågor, funderingar eller behöver hjälp med något som
        rör vår hemsida, tveka inte att kontakta oss. Vi strävar efter att ge
        dig den bästa möjliga servicen och svarar gärna på dina frågor. Fyll i
        formuläret nedan med din e-post och ditt meddelande, så återkommer vi
        till dig så snart vi kan.{" "}
      </p>
      <div className="contact-section" style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setIsContactModalVisible(true)}
          style={{ marginBottom: "10px" }}
        >
          Skicka Meddelande
        </button>
        {isContactModalVisible && (
          <div
            className="modal-overlay"
            onClick={() => setIsContactModalVisible(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Skicka Meddelande</h3>
              <form onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="contact-email">E-post:</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message">Meddelande:</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Skicka</button>
              </form>
              <button onClick={() => setIsContactModalVisible(false)}>
                Stäng
              </button>
            </div>
          </div>
        )}
      </div>

      <h2>Ta bort konto</h2>
      <p className="description">
        Om du vill radera ditt konto, vänligen fyll i din e-postadress i
        formuläret nedan. Observera att radering av kontot innebär att all din
        data kommer att tas bort permanent och inte kan återställas. Tack för
        att du har varit en del av vår plattform
      </p>
      <div className="delete-section" style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setIsDeleteModalVisible(true)}
          style={{ marginBottom: "10px" }}
        >
          Radera Konto
        </button>
        {isDeleteModalVisible && (
          <div
            className="modal-overlay"
            onClick={() => setIsDeleteModalVisible(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Radera Konto</h3>
              <form onSubmit={handleDeleteSubmit}>
                <div>
                  <label htmlFor="delete-email">E-post:</label>
                  <input
                    type="email"
                    id="delete-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Radera</button>
              </form>
              <button onClick={() => setIsDeleteModalVisible(false)}>
                Stäng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerContact;
