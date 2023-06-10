import { useEffect, useState } from 'react';

type VariantOption = {
  option: string;
  values: string[];
  availability: string[];
};

type VariantSelection = {
  [option: string]: string;
};

type VariantsProps = {
  variants: VariantOption[];
};

const Variants: React.FC<VariantsProps> = ({ variants }) => {
  const [selection, setSelection] = useState<VariantSelection>({});

  const handleOptionChange = (option: string, value: string) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      [option]: value,
    }));
  };
  useEffect(() => {
    const initialSelection: VariantSelection = {};
    variants.forEach((variant) => {
      if (variant.values.length > 0) {
        initialSelection[variant.option] = variant.values[0];
      }
    });
    setSelection(initialSelection);
  }, [variants]);

  return (
    <div>
      {variants.map((variant) => (
        <div key={variant.option} className="mb-4">
          <h3 className="mb-2 font-semibold">{variant.option}</h3>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value, index) => (
              <label
                key={value}
                className={`flex items-center justify-center rounded-md px-4 py-2 border ${
                  variant.availability[index] === 'in stock'
                    ? 'cursor-pointer'
                    : 'border-gray-300 bg-slate-100 cursor-not-allowed'
                } ${
                  selection[variant.option] === value
                    ? 'border-black'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={variant.option}
                  value={value}
                  checked={selection[variant.option] === value}
                  disabled={variant.availability[index] !== 'in stock'}
                  onChange={() => handleOptionChange(variant.option, value)}
                  className="hidden"
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}
      {/* <div>
        <pre>{JSON.stringify(selection)}</pre>
      </div> */}
    </div>
  );
};

export default Variants;
