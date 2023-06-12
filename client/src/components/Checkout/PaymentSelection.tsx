"use client"
import Image from "next/image";

interface PaymentMethod {
  method: string;
  image?: string;
}

interface PaymentSelectionProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (paymentMethod: string) => void;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  paymentMethods,selectedPaymentMethod,setSelectedPaymentMethod
}) => {
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handlePaymentMethodSelection = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <div className="mx-auto pb-8">
        <h2 className="text-2xl font-bold mb-4">Payment Selection</h2>
        <div className="flex flex-wrap justify-start gap-2">
            {paymentMethods.map(({ method, image }) => (
                <div
                    key={method}
                    className={`bg-white shadow border rounded px-2 py-1 flex justify-center items-center ${
                        selectedPaymentMethod === method ? "border-blue-500" : ""
                    }`}
                    onClick={() => handlePaymentMethodSelection(method)}
                >
                    {image ? (
                        <Image className={""} height={50} width={50} src={image} alt={method} />
                    ) : (
                        <p className="font-semibold text-center">{method}</p>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

export default PaymentSelection;
