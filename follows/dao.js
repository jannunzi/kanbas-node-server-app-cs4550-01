import model from "./model.js";

export const findAllFollows = () => model.find();

export const createUserFollowsUser = (followerId, followedId) =>
  model.create({ follower: followerId, followed: followedId });
export const deleteUserFollowsUser = (followerId, followedId) =>
  model.deleteOne({ follower: followerId, followed: followedId });

export const findUsersFollowedByUser = (userId) =>
  model.find({ follower: userId }).populate("followed").exec();

export const findUsersFollowingUser = (userId) =>
  model.find({ followed: userId }).populate("follower").exec();
