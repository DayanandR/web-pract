import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const ARRAY_LENGTH = 4;
  const [currentArray, setCurrentArray] = useState(
    new Array(ARRAY_LENGTH).fill("")
  );
  const [errorMsg, setErrorMsg] = useState("");

  const ref = useRef(new Array(ARRAY_LENGTH).fill(null)); // Initialize ref array

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) {
      setErrorMsg("Please Enter a valid OTP");
    }

    const newArray = [...currentArray];
    newArray[index] = e.target.value.slice(-1);
    setCurrentArray(newArray);

    if (newArray[index] && index < ARRAY_LENGTH - 1) {
      ref.current[index + 1]?.focus();
    }
    setErrorMsg("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (currentArray[index]) {
        // If the input is not empty, just clear it
        const newArray = [...currentArray];
        newArray[index] = "";
        setCurrentArray(newArray);
      } else if (index > 0) {
        // If already empty, move focus to the previous input
        ref.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text"); // Get pasted text

    const otpValues = pastedText.slice(0, ARRAY_LENGTH); // Extract digits only, limit length

    if (otpValues.length > 0) {
      const newArray = [...currentArray];
      newArray.forEach((element,idx) => {
        console.log(idx)
        newArray[idx] = otpValues.charAt(idx);
        console.log(newArray)
      });

      setCurrentArray(newArray);

      // Move focus to the last filled input
      ref.current[Math.min(otpValues.length, ARRAY_LENGTH - 1)]?.focus();
    }
  };

  return (
    <div className="container">
      OTP SCREEN
      <div className="otp-box">
        {currentArray.map((item, index) => (
          <input
            className="otp-input"
            type="text"
            key={index}
            ref={(el) => (ref.current[index] = el)} // Assign ref correctly
            value={currentArray[index]}
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste} // Handle paste event
          />
        ))}
      </div>
      {errorMsg && (
        <div>
          <p style={{ color: "red" }}>{errorMsg}</p>
        </div>
      )}{" "}
    </div>
  );
};

export default App;
