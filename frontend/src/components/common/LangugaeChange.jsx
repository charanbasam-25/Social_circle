import { useEffect, useState } from "react";
import i18n from "../../utils/il8next";

const LanguageModifier = ({ navigate }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    localStorage.setItem("c_app_language",language);
    i18n.changeLanguage(language);
  }, [language]);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="bg-[#4eb84c] rounded-full w-18 md:w-44">
      <select value={language} onChange={handleChange} className="p-2 mt-1 mb-1 rounded-md w-14 md:w-44">
        <option disabled={true}>Language</option>
        <option value={"en"}>English</option>
        <option value={"fr"}>French</option>
        <option value={"pt"}>Portuguse</option>
      </select>
    </div>
  );
};
export default LanguageModifier;
