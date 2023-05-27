interface DeleteCurrentUserConfirmationModalProps {
  handleDeleteUser: () => Promise<void>;
  setDeleteCurrentUserConfirmationModal: (
    value: React.SetStateAction<boolean>,
  ) => void;
}

export const DeleteCurrentUserConfirmationModal: React.FC<
  DeleteCurrentUserConfirmationModalProps
> = ({ handleDeleteUser, setDeleteCurrentUserConfirmationModal }) => {
    
  return (
    <>
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-lg p-6">
          <p className="mb-4 text-gray-800 dark:text-gray-200">
            Are you sure you want to delete your account?
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none mr-2"
              onClick={handleDeleteUser}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => setDeleteCurrentUserConfirmationModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
