import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t: translate } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("zh")}
        className={`px-2 py-1 text-sm rounded ${
          language === "zh"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-sm rounded ${
          language === "en"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
