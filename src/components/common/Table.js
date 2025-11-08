import React from "react";
import { Loader2 } from "lucide-react";

export const Table = ({
  columns,
  data,
  renderRow,
  loading = false,
  emptyMessage = "No data available"
}) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-extrabold text-white uppercase tracking-wider ${column.className ||
                  ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0
            ? data.map((item, index) => renderRow(item, index))
            : !loading && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500 italic"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      {loading && data.length > 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <span className="ml-4 text-xl font-semibold text-indigo-700">
            Updating...
          </span>
        </div>
      )}
    </div>
  );
};
