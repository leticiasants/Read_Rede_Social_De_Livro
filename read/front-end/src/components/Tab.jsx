import { useState } from "react";
import PropTypes from "prop-types";

export default function TabComponent({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-grow py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === index
                ? "text-white border-b-4 border-[rgba(251,251,251,0.59)]"
                : "text-white hover:bg-[rgba(251,251,251,0.59)] hover:text-[rgba(0,0,0,0.92)]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
}

TabComponent.propTypes = {
  tabs: PropTypes.array.isRequired,
};
