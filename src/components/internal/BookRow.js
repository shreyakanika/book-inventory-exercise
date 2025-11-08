import React, { useState } from "react";
import { ChevronDown, ChevronUp, ListTodo } from "lucide-react";
import { Button } from "../common/Button";
import { BookImage } from "./BookImage";

export const BookRow = ({ imageURL, title, description }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const hasDescription = description && description.trim().length > 0;
  const ToggleIcon = isDescriptionVisible ? ChevronUp : ChevronDown;

  const truncatedDescription =
    hasDescription && description.length > 150
      ? description.substring(0, 147) + "..."
      : description;

  const descriptionRowId = `desc-row-${title
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  return (
    <>
      <tr className="bg-white transition duration-200 hover:bg-indigo-50/50">
        <td className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <BookImage imageURL={imageURL} title={title} />
            <span className="text-base font-semibold text-gray-800">
              {title}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 text-sm text-gray-600">
          {hasDescription ? (
            truncatedDescription
          ) : (
            <span className="text-gray-400 italic">No description</span>
          )}
        </td>

        <td className="px-6 py-4 w-40 text-center">
          {hasDescription && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsDescriptionVisible(prev => !prev)}
              icon={ToggleIcon}
            >
              {isDescriptionVisible ? "Hide" : "View"}
            </Button>
          )}
        </td>
      </tr>

      {isDescriptionVisible && hasDescription && (
        <tr id={descriptionRowId} className="bg-indigo-100/70 shadow-inner">
          <td colSpan="3" className="px-6 py-5 text-sm">
            <div className="font-bold mb-2 text-indigo-800 flex items-center">
              <ListTodo className="w-4 h-4 mr-2" />
              Full Description
            </div>
            <p className="text-gray-800 border-l-4 border-indigo-400 pl-4 py-1 whitespace-pre-wrap">
              {description}
            </p>
          </td>
        </tr>
      )}
    </>
  );
};
