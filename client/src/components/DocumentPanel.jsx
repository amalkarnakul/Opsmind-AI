import React from 'react'

const DocumentPanel = () => {
  return (
    <div className="border-b border-slate-800 p-4 flex justify-between items-center">

      <div className="flex gap-3">

        <span className="bg-slate-800 px-3 py-1 rounded-lg text-sm">
          SOP.pdf
        </span>

        <span className="bg-slate-800 px-3 py-1 rounded-lg text-sm">
          HRPolicy.pdf
        </span>

      </div>

      <button className="bg-indigo-600 px-4 py-2 rounded-lg">
        Upload Document
      </button>

    </div>
  );
};

export default DocumentPanel;