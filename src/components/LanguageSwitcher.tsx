import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}
        className="appearance-none bg-vscode-panel text-sm rounded-lg px-3 py-1.5 pr-8 border border-vscode-border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors duration-300 hover:bg-vscode-hover"
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
