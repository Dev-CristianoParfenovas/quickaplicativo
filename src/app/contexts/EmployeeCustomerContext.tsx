import React, { createContext, useContext, useState } from "react";

interface EmployeeCustomerContextType {
  employee: string | null;
  setEmployee: (employee: string | null) => void;
  customer: string | null;
  setCustomer: (customer: string | null) => void;
}

const EmployeeCustomerContext = createContext<EmployeeCustomerContextType>({
  employee: null,
  setEmployee: () => {},
  customer: null,
  setCustomer: () => {},
});

export const EmployeeCustomerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = useState<string | null>(null);
  const [customer, setCustomer] = useState<string | null>(null);

  return (
    <EmployeeCustomerContext.Provider
      value={{ employee, setEmployee, customer, setCustomer }}
    >
      {children}
    </EmployeeCustomerContext.Provider>
  );
};

export const useEmployeeCustomer = () => useContext(EmployeeCustomerContext);
