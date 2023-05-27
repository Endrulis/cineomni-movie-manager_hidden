import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateUserDto } from '../../../../models/admin/UpdateUserDto';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './sass/UserUpdateModal.css';
import { Button, Form } from 'react-bootstrap';

interface UserUpdateModalProps {
  closeUpdateUserForm: () => void;
  handleUpdateUserSubmit: (event: React.FormEvent) => void;
  updateUserFormData: UpdateUserDto;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserUpdateModal: React.FC<UserUpdateModalProps> = ({
  closeUpdateUserForm,
  handleUpdateUserSubmit,
  updateUserFormData,
  handleInputChange,
}) => {
  return (
    <>
      <div className="modal-container">
        <div className="modal-container__content">
          <Button
            className="modal-container__close"
            onClick={closeUpdateUserForm}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="modal-container__close-icon"
            />
          </Button>
          <Form onSubmit={handleUpdateUserSubmit}>
            <Form.Label className="modal-container__label">
              Email:
            </Form.Label>
            <Form.Control
              className="modal-container__input"
              type="text"
              name="email"
              value={updateUserFormData.email}
              onChange={handleInputChange}
            />

            <Form.Label className="modal-container__label">
              Password:
            </Form.Label>
            <Form.Control
              className="modal-container__input"
              type="text"
              name="password"
              value={updateUserFormData.password}
              onChange={handleInputChange}
            />

            <Form.Label className="modal-container__label">
              Role:
            </Form.Label>
            <Form.Control
              className="modal-container__input"
              type="text"
              name="role"
              value={updateUserFormData.role}
              onChange={handleInputChange}
            />

            <Button
              className="modal-container__button bg-blue-500"
              type="submit"
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
