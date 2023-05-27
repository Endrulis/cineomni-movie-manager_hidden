import { UpdateUserDto } from '../../models/admin/UpdateUserDto';
import { buildBearerAccessToken } from '../../utils';
import axiosInstance from '../api/axiosInstance';

export const getAllUsers = async (accessToken: string) => {
  return await axiosInstance.get('/admin/users', {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const getMoviesByUserId = async (
  accessToken: string,
  userId: number,
) => {
  return await axiosInstance.get(`/admin/movies/${userId}`, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const updateUserById = async (
  accessToken: string,
  userId: number,
  dto: UpdateUserDto,
) => {
  await axiosInstance.patch(`/admin/users/${userId}`, dto, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const deleteUserById = async (accessToken: string, userId: number) => {
  await axiosInstance.delete(`/admin/users/${userId}`, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};
