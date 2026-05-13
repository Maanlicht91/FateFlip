import { useEffect, useState } from "react";
import axios from "axios";
import CircleButton from "../images/button.png";

import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import CloseIcon from "@mui/icons-material/Close";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000"
).replace(/\/$/, "");

function BigButton() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardImage, setCardImage] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchFate = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/v1/fate/random`);
      const fate = response.data.data.fate;

      localStorage.setItem("fate", JSON.stringify(fate));
      return fate;
    };
    const loadCard = async () => {
      setError("");

      try {
        const today = new Date().toDateString();
        const lastFlipDate = localStorage.getItem("lastFlipDate");

        if (today !== lastFlipDate) {
          const fate = await fetchFate();
          const { type, message, imageUrl } = fate;
          setCardImage(imageUrl);
          setCardType(type);
          setCardMessage(message);
        } else {
          setError("You've already known your day luck.");
          const data = localStorage.getItem("fate");
          const { type, message, imageUrl } = JSON.parse(data);
          setCardImage(imageUrl);
          setCardType(type);
          setCardMessage(message);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setError("Card image could not be loaded.");
      }
    };

    loadCard();
  }, []);

  const handleClick = () => {
    localStorage.setItem("lastFlipDate", new Date().toDateString());
    setIsFlipped((currentValue) => !currentValue);
  };

  return (
    <div className="card-container">
      <button
        type="button"
        className={`big-button-flip ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleClick}
        //disabled={isLoading || !cardImage}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? "Hide card" : "Reveal card"}
      >
        <div className="big-button-flip-inner">
          <div className="big-button-face big-button-front">
            <img
              src={CircleButton}
              alt="Fate button"
              className="button-circle"
            />
          </div>

          <div className="big-button-face big-button-back">
            <Tooltip title={cardMessage} placement="right">
              <img
                src={cardImage}
                alt="Fate card"
                className={`fate-card-image fate-card-image-${cardType}`}
              />
            </Tooltip>
          </div>
        </div>
      </button>
      <div className="error-container">
        {error ? (
          <Collapse in={open}>
            <Alert
              severity={error.startsWith("Card") ? "error" : "info"}
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <p className="fate-card-error">{error}</p>
            </Alert>
          </Collapse>
        ) : null}{" "}
      </div>
    </div>
  );
}

export default BigButton;
