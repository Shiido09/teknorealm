import React from 'react';

type RegisterFormProps = {
  onClose: () => void;
  switchToLogin: () => void;
  address: string; // Add this line
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, switchToLogin, address }) => {
  return (
    <div>
      <p>Address: {address}</p> {/* Example usage of the address prop */}
    </div>
  );
};