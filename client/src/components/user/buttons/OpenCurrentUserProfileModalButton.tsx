import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OpenCurrentUserProfileModalButtonProps {
  openCurrentUserProfileModal: () => void;
}

export const OpenCurrentUserProfileModalButton: React.FC<OpenCurrentUserProfileModalButtonProps> = ({
    openCurrentUserProfileModal,
  }) => {
    return (
      <button
        className="mt-24 text-white bg-blue-700 rounded-lg w-32 py-2 font-semibold hover:bg-blue-800 transition-colors duration-300"
        onClick={openCurrentUserProfileModal}
      >
        <FontAwesomeIcon className='mr-2' icon={faUser} beat />
        Profile
      </button>
    );
  };
