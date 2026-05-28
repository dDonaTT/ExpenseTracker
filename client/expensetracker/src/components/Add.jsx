import React from "react";
import { modalStyles } from "../assets/dummyStyles";
import { X } from "lucide-react";
const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = [
    "Food",
    "Housing",
    "Transport",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investments",
    "Bonus",
    "Other",
  ],
  color = "teal",
}) => {
  if (!showModal) return null;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = today.toISOString().split("T")[0];
  const minDate = `${currentYear}-01-01`;

  const colorClass = modalStyles.colorClasses[color];

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>{title}</h3>
          <button
            className={modalStyles.closeButton}
            onClick={() => setShowModal(false)}
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTransaction();
          }}
        ></form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
