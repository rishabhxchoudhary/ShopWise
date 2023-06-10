import { useState } from 'react';

type QuantityProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

const Quantity: React.FC<QuantityProps> = ({ quantity, onQuantityChange }) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    const newQuantity = parseInt(inputValue, 10) || 1;
    onQuantityChange(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    onQuantityChange(newQuantity);
    setInputValue(newQuantity.toString());
  };

  return (
    <div className="flex items-center">
      <button
        className="px-3 py-2 border border-gray-300 rounded-l"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="number"
        className="w-16 focus:outline-none px-3 py-2 text-center border-t border-b border-gray-300"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        readOnly
      />
      <button
        className="px-3 py-2 border border-gray-300 rounded-r"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
