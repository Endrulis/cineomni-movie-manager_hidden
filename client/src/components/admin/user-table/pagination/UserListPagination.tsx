import { User } from '../../../../models/current-user/User';

import './sass/UserListPagination.css';

interface UserListPaginationProps {
  users: User[];
  usersPerPage: 4 | 8;
  currentPage: number;
  handleUserPageChange: (pageNumber: number) => void;
}

export const UserListPagination: React.FC<UserListPaginationProps> = ({
  users,
  usersPerPage,
  currentPage,
  handleUserPageChange,
}) => {
  return (
    <>
      <div className="list-container">
        <nav className="list-container__nav">
          <ul className="list-container__nav-list">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, index) => (
                <li key={index}>
                  <button
                    className={`${
                      index + 1 === currentPage
                        ? 'list-container__nav-button-active'
                        : 'list-container__nav-button'
                    }`}
                    onClick={() => handleUserPageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};
