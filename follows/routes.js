import * as dao from "./dao.js";

function FollowsRoutes(app) {
  const findAllFollows = async (req, res) => {
    console.log("findAllFollows");
    const follows = await dao.findAllFollows();
    res.send(follows);
  };
  const createUserFollowsUser = async (req, res) => {
    const { followerId, followedId } = req.params;
    const follow = await dao.createUserFollowsUser(followerId, followedId);
    res.send(follow);
  };
  const deleteUserFollowsUser = async (req, res) => {
    const { followerId, followedId } = req.params;
    const status = await dao.deleteUserFollowsUser(followerId, followedId);
    res.send(status);
  };
  const findUsersFollowedByUser = async (req, res) => {
    const { userId } = req.params;
    const following = await dao.findUsersFollowedByUser(userId);
    res.send(following);
  };
  const findUsersFollowingUser = async (req, res) => {
    const { userId } = req.params;
    const followers = await dao.findUsersFollowingUser(userId);
    res.send(followers);
  };

  app.get("/api/follows", findAllFollows);
  app.post("/api/users/:followerId/follows/:followedId", createUserFollowsUser);
  app.delete(
    "/api/users/:followerId/follows/:followedId",
    deleteUserFollowsUser
  );
  app.get("/api/users/:userId/following", findUsersFollowedByUser);
  app.get("/api/users/:userId/followers", findUsersFollowingUser);
}

export default FollowsRoutes;
