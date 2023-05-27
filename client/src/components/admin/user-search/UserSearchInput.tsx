
import { FormControl, InputGroup } from 'react-bootstrap';
import './sass/UserSearchInput.css';

interface UserSearchInputProps {
  searchUserQuery: string;
  handleUserSearchInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const UserSearchInput = (props: UserSearchInputProps) => {
  const { searchUserQuery, handleUserSearchInputChange } = props;

  return (
    <>
      <InputGroup className="search-input-container">
        <FormControl
          className="search-input-container__input"
          type="text"
          placeholder="Search by email"
          value={searchUserQuery}
          onChange={handleUserSearchInputChange}
        />
      </InputGroup>
    </>
  );
};
