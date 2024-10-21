import React, { useState } from "react";

function Test() {
  const [selectedGender, setSelectedGender] = useState("male");

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div>
      <label className={`radio-label ${selectedGender === "male" ? "selected" : ""}`}>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleGenderChange}
          checked={selectedGender === "male"}
        />
        Male
      </label>
      <label className={`radio-label ${selectedGender === "female" ? "selected" : ""}`}>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleGenderChange}
          checked={selectedGender === "female"}
        />
        Female
      </label>
    </div>
  );
}

export default Test;
