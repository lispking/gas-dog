import React from "react";
import GoogleAdSense from "./GoogleAdSense";

const Footer: React.FC = () => {
  return (
    <footer className="bg-vscode-sidebar dark:bg-vscode-sidebar shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center">
            <GoogleAdSense slot="1234567890" format="auto" responsive={true} className="w-full max-w-[728px] h-[90px]" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm font-mono text-vscode-text-secondary">
                &copy; {new Date().getFullYear()} Monad Gas Tracker
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
