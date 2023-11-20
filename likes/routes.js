import * as dao from "./dao.js";

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {
    console.log("findAllLikes");
    const likes = await dao.findAllLikes();
    res.send(likes);
  };
  const createUserLikesAlbum = async (req, res) => {
    const { userId, albumId } = req.params;
    const like = await dao.createUserLikesAlbum(userId, albumId);
    res.send(like);
  };
  const findAlbumsUserLikes = async (req, res) => {
    const { userId } = req.params;
    const likes = await dao.findAlbumsUserLikes(userId);
    res.send(likes);
  };
  const findUsersWhoLikeAlbum = async (req, res) => {
    const { albumId } = req.params;
    const likes = await dao.findUsersWhoLikeAlbum(albumId);
    res.send(likes);
  };

  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes/:albumId", createUserLikesAlbum);
  app.get("/api/users/:userId/likes", findAlbumsUserLikes);
  app.get("/api/albums/:albumId/likes", findUsersWhoLikeAlbum);
}

export default LikesRoutes;
