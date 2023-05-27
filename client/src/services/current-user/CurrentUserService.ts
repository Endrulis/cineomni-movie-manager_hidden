import axiosInstance from '../api/axiosInstance';
import { buildBearerAccessToken } from '../../utils';
import { MoviePayload, Movie } from '../../models';
import { AxiosResponse } from 'axios';
import { UpdateCurrentUserDto } from '../../models/current-user/UpdateCurrentUserDto';

export const getCurrentUser = async (accessToken: string) => {
  return await axiosInstance.get('/user/me', {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const updateCurrentUser = async (accessToken: string, dto: UpdateCurrentUserDto) => {
  return await axiosInstance.patch('/user/me', dto, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const deleteCurrentUser = async (accessToken: string) => {
  return await axiosInstance.delete('/user/me', {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const getAllMoviesByCurrentUser = async (accessToken: string) => {
  return await axiosInstance.get('/movies', {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const createMovie = async (
  accessToken: string,
  moviePayload: MoviePayload,
): Promise<AxiosResponse<Movie>> => {
  return await axiosInstance.post('/movies', moviePayload, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const getMovieById = async (accessToken: string, movieId: number) => {
  return await axiosInstance.get(`/movies/${movieId}`, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const updateMovieById = async (
  accessToken: string,
  movieId: number,
  moviePayload: MoviePayload,
): Promise<AxiosResponse<Movie>> => {
  return await axiosInstance.patch(`/movies/${movieId}`, moviePayload, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};

export const deleteMovieById = async (accessToken: string, movieId: number) => {
  return await axiosInstance.delete(`/movies/${movieId}`, {
    headers: { Authorization: buildBearerAccessToken(accessToken) },
  });
};
