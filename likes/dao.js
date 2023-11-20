import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesAlbum = (userId, albumId) =>
  model.create({ user: userId, albumId: albumId });
export const findAlbumsUserLikes = (userId) => model.find({ user: userId });
export const findUsersWhoLikeAlbum = (albumId) =>
  model.find({ albumId: albumId });
