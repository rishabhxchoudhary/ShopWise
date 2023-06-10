import { useState } from 'react';

type CartActionsProps = {
  totalAmount: number;
  onAddToCart: () => void;
  onBuy: () => void;
};

const CartActions: React.FC<CartActionsProps> = ({
  totalAmount,
  onAddToCart,
  onBuy,
}) => {
  return (
    <div className="flex flex-col items-start justify-between">
      <div className="text-lg font-bold">Total Amount: ${totalAmount}</div>
      <div>
        <button
          className="px-4 py-2 mr-4 text-black border border-slate-950 bg-white rounded-lg"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 text-white bg-black rounded"
          onClick={onBuy}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default CartActions;
