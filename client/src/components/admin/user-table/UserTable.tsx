import { Button, Table } from 'react-bootstrap';
import { User } from '../../../models/current-user/User';

import './sass/UserTable.css';

interface UserTableProps {
  handleSortByEmail: () => void;
  sortOrder: string;
  currentUsers: User[];
  handleUserClick: (userId: number) => Promise<void>;
  openUpdateUserForm: (user: User) => void;
  handleDeleteUser: (userId: number) => Promise<void>;
}

export const UserTable: React.FC<UserTableProps> = ({
  handleSortByEmail,
  sortOrder,
  currentUsers,
  handleUserClick,
  openUpdateUserForm,
  handleDeleteUser,
}) => {
  return (
    <>
      <Table className="user-table">
        <thead>
          <tr className="user-table__row bg-gray-700">
            <th className="user-table__row-header" onClick={handleSortByEmail}>
              Email
              {sortOrder === 'asc' ? (
                <span className="user-table__sort-icon">&#9650;</span>
              ) : (
                <span className="user-table__sort-icon">&#9660;</span>
              )}
            </th>
            <th className="user-table__row-header">Role</th>
            <th className="user-table__row-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="user-table__row hover:bg-gray-700">
              <td
                className="user-table__row-cell"
                onClick={() => handleUserClick(user.id)}
              >
                {user.email}
              </td>
              <td className="user-table__row-cell">{user.role}</td>
              <td className="user-table__row-cell">
                <Button
                  className="user-table__update-button"
                  onClick={() => openUpdateUserForm(user)}
                >
                  Update
                </Button>
                <Button
                  className="user-table__delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
