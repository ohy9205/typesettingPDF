"use client";

const Button = ({ action, children }) => {
  return (
    <button onClick={action} className="bg-red-400 p-1">
      {children}
    </button>
  );
};

export default Button;
