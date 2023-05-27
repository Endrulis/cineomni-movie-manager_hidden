import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UpdateCurrentUserDto } from '../../../../models/current-user/UpdateCurrentUserDto';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import './sass/CurrentUserProfileModal.css';

interface CurrentUserProfileProps {
  closeCurrentUserProfileModal: () => void;
  handleUpdateCurrentUserSubmit: (event: React.FormEvent) => void;
  updateCurrentUserFormData: UpdateCurrentUserDto;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setDeleteUserProfileConfirmation: (
    value: React.SetStateAction<boolean>,
  ) => void;
  formErrors: { [key: string]: string };
}

export const CurrentUserProfileModal: React.FC<CurrentUserProfileProps> = ({
  closeCurrentUserProfileModal,
  handleUpdateCurrentUserSubmit,
  updateCurrentUserFormData,
  handleInputChange,
  setDeleteUserProfileConfirmation,
  formErrors,
}) => {
  return (
    <>
      <div className="modal-container">
        <div className="modal-container__content max-w-md">
          <Button
            className="modal-container__buttons-close"
            onClick={closeCurrentUserProfileModal}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="modal-container__buttons-close-icon"
            />
          </Button>
          <Form onSubmit={handleUpdateCurrentUserSubmit}>
            <Form.Label className="modal-container__label">Email:</Form.Label>
            <Form.Control
              className="modal-container__input"
              type="text"
              name="email"
              value={updateCurrentUserFormData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="text-red-400">{formErrors.email}</p>
            )}

            <Form.Label className="modal-container__label">
              Password:
            </Form.Label>
            <Form.Control
              className="modal-container__input"
              type="text"
              name="password"
              value={updateCurrentUserFormData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <p className="text-red-400">{formErrors.password}</p>
            )}
            <ButtonGroup className="modal-container__buttons">
              <Button
                className="modal-container__buttons-save bg-blue-500"
                type="submit"
              >
                Save
              </Button>
              <Button
                className="modal-container__buttons-delete"
                onClick={() => setDeleteUserProfileConfirmation(true)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="modal-container__buttons-delete-icon"
                />
                Delete Account
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
    </>
  );
};
