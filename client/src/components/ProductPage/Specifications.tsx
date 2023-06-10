import { useState } from 'react';

type SpecificationsProps = {
  specifications: { [key: string]: string[] };
};

const Specifications: React.FC<SpecificationsProps> = ({ specifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <div onClick={toggleExpansion} className="cursor-pointer flex items-center justify-between">
        <h2 className="text-lg font-semibold">Specifications</h2>
        <button
          className="text-sm text-gray-600 focus:outline-none"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <table className="w-full mt-4">
          <tbody>
            {Object.entries(specifications).map(([title, items]) => (
              <tr key={title}>
                <td className="py-2 pr-4 font-semibold">{title}</td>
                <td>
                  <ul>
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className="py-1 flex items-center justify-between border-b border-gray-300"
                      >
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Specifications;
