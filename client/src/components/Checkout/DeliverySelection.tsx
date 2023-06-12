"use client";

interface Address {
    id: number;
    name: string;
    mobile: string;
    addressLine1: string;
    addressLine2: string;
    pincode: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
  }
import { useState } from "react";

interface DeliverySelectionProps {
  addresses: Address[];
    selectedAddressId: number | null;
    setSelectedAddressId: (addressId: number | null) => void;
}

const DeliverySelection: React.FC<DeliverySelectionProps> = ({ addresses,selectedAddressId,setSelectedAddressId }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    name: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
  });

  const handleAddressSelection = (addressId: number|null) => {
    setSelectedAddressId(addressId);
  };

  const handleAddFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addresses.push(newAddress);
    // createAddress(newAddress); // Replace `createAddress` with your actual API call function
    setShowAddForm(false);
    setNewAddress({
      id: 0,
      name: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      pincode: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
    });
  };

  const handleDeleteAddress = (addressId: number) => {
    // deleteAddress(addressId); // Replace `deleteAddress` with your actual API call function
  };

  return (
    <>
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Delivery Selection</h2>
            {/* Render past addresses */}
            {addresses.map((address) => (
                <div key={address.id} onClick={() => handleAddressSelection(address.id)} className={`bg-white shadow border rounded p-4 m-1 ${
                    selectedAddressId === address.id ? "border-blue-500" : ""
                    }`}>
                    <div className="cursor-pointer text-sm flex items-start flex-col">
                        <div className="font-bold">{address.name}</div>
                        <div className="info md:flex md: gap-1">
                            <div>{address.addressLine1}</div>
                            <div>{address.addressLine2}</div>
                            <div>{address.landmark}</div>
                            <div>{address.city}, {address.state}, {address.country}</div>
                            <div>{address.pincode}</div>
                        </div>
                        <button
                            className="text-red-500 mt-2"
                            onClick={() => handleDeleteAddress(address.id)}
                            >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {/* Add new Address */}
            {!showAddForm ? (<>
            <div
                className={`bg-white shadow border rounded p-4 m-1 ${
                selectedAddressId === null ? "border-blue-500" : ""
                }`}
                onClick={() => setShowAddForm(true)}
            >
                <p className="cursor-pointer text-sm flex items-start flex-col font-bold">+ Add New Address</p>
            </div>
            </>):(<>
                <form onSubmit={handleAddFormSubmit} className="p-4 border">
                <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={newAddress.mobile}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, mobile: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Address Line 1"
                    value={newAddress.addressLine1}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, addressLine1: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Address Line 2"
                    value={newAddress.addressLine2}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, addressLine2: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Landmark"
                    value={newAddress.landmark}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    required
                    className="p-2 border"
                />
                <div className="flex justify-between">
                    <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    type="submit"
                    >
                    Save Address
                    </button>
                    <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </form>
            </>)}
        </div>
    </>
  );
};

export default DeliverySelection;
