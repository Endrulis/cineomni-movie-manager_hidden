import { useEffect, useState } from 'react';
import { useAccessToken } from '../../hooks/useAccessToken';
import {
  deleteUserById,
  getAllUsers,
  getMoviesByUserId,
  updateUserById,
} from '../../services/admin/AdminService';
import { User } from '../../models/current-user/User';
import { Movie } from '../../models';
import { UpdateUserDto } from '../../models/admin/UpdateUserDto';
import { UserSearchInput } from '../../components/admin/user-search/UserSearchInput';
import { UserTable } from '../../components/admin/user-table/UserTable';
import { UserListPagination } from '../../components/admin/user-table/pagination/UserListPagination';
import { Container, ListGroup } from 'react-bootstrap';
import { UserUpdateModal } from '../../components/admin/modals/user-update/UserUpdateModal';
import { MovieListModal } from '../../components/admin/user-table/movies/MovieListModal';

import './sass/AdminPage.css';

export const AdminPage = () => {
  const AccessToken = useAccessToken();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [users, setUsers] = useState<User[]>([]);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [updateUserFormData, setUpdateUserFormData] = useState<UpdateUserDto>({
    email: '',
    password: '',
    role: '',
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isMovieListModalOpen, setMovieListModal] = useState(false);
  const [searchMovieQuery, setSearchMovieQuery] = useState('');
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [currentMoviesPage, setCurrentMoviesPage] = useState(1);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchUserQuery.toLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = window.innerWidth < 768 ? 4 : 8;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (selectedUser) {
      setUpdateUserFormData({
        email: selectedUser.email,
        password: '',
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const accessToken = AccessToken.getAccessToken();
      if (accessToken) {
        getAllUsers(accessToken)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching current user:', error);
          });
      }
    };
    fetchAllUsers();
  }, [AccessToken]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 800) {
      setMoviesPerPage(1);
    } else {
      setMoviesPerPage(4);
    }
  }, [windowWidth]);

  const handleUserPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortByEmail = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a.email < b.email) return sortOrder === 'asc' ? -1 : 1;
      if (a.email > b.email) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const openUpdateUserForm = (user: User) => {
    setSelectedUser(user);
  };
  const closeUpdateUserForm = () => setSelectedUser(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdateUserFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUserSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchUserQuery(event.target.value);
  };

  const handleMovieSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMovieQuery(event.target.value);
  };

  const handleGetMovies = async (userId: number) => {
    const accessToken = AccessToken.getAccessToken();
    if (accessToken) {
      await getMoviesByUserId(accessToken, userId)
        .then((response) => {
          setMovies(response.data);
          setMovieListModal(true);
          console.log(movies);
        })
        .catch((error) => {
          console.error('Error fetching movies by user ID:', error);
        });
    }
  };

  const handleUpdateUser = (event: React.FormEvent) => {
    event.preventDefault();
    const accessToken = AccessToken.getAccessToken();
    if (accessToken && selectedUser) {
      const { email, password, role } = updateUserFormData;
      const updatedUserDto = { email, password, role };
      updateUserById(accessToken, selectedUser.id, updatedUserDto)
        .then(() => {
          setUsers((prevUsers: User[]) =>
            prevUsers.map((user) => {
              if (user.id === selectedUser.id) {
                return { ...user, ...updatedUserDto };
              }
              return user;
            }),
          );
          closeUpdateUserForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const accessToken = AccessToken.getAccessToken();
    if (accessToken) {
      try {
        await deleteUserById(accessToken, userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      console.error('Access token is missing.');
    }
  };

  const closeMovieListModal = () => {
    setMovieListModal(false);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentMoviesPage(pageNumber);
  };

  return (
    <Container className="admin-page-container">
      <UserSearchInput
        searchUserQuery={searchUserQuery}
        handleUserSearchInputChange={handleUserSearchInputChange}
      />
      <ListGroup className="admin-page-container__group">
        <UserTable
          handleSortByEmail={handleSortByEmail}
          sortOrder={sortOrder}
          currentUsers={currentUsers}
          handleUserClick={handleGetMovies}
          openUpdateUserForm={openUpdateUserForm}
          handleDeleteUser={handleDeleteUser}
        />
        <UserListPagination
          users={users}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          handleUserPageChange={handleUserPageChange}
        />
      </ListGroup>
      {selectedUser && (
        <UserUpdateModal
          closeUpdateUserForm={closeUpdateUserForm}
          handleUpdateUserSubmit={handleUpdateUser}
          updateUserFormData={updateUserFormData}
          handleInputChange={handleInputChange}
        />
      )}

      {isMovieListModalOpen && (
        <MovieListModal
          movies={movies}
          searchMovieQuery={searchMovieQuery}
          handleMovieSearchChange={handleMovieSearchChange}
          closePopup={closeMovieListModal}
          moviesPerPage={moviesPerPage}
          currentMoviesPage={currentMoviesPage}
          goToPage={goToPage}
        />
      )}
    </Container>
  );
};
