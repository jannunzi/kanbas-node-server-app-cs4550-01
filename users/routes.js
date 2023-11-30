import * as dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    console.log("findAllUsers");
    const users = await dao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const { id } = req.params;
    const user = await dao.findUserById(id);
    res.send(user);
  };
  const findUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    res.send(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.send(user);
  };
  const createUser = async (req, res) => {
    const { username, password, firstName, lastName } = req.params;
    console.log("create user");
    console.log(req.params);
    let user = null;
    try {
      user = await dao.createUser({
        username,
        password,
        firstName,
        lastName,
      });
    } catch (e) {
      console.log(e);
    }
    res.send(user);
  };
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const status = await dao.updateUser(id, user);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.send(status);
  };

  const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
      return;
    } else {
      res.sendStatus(403);
    }
  };
  const signOut = async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };
  const signUp = async (req, res) => {
    const { username, password } = req.body;
    const userExists = await dao.findUserByUsername(username);
    if (userExists) {
      res.sendStatus(403);
      return;
    }
    const user = await dao.createUser({ username, password });
    const currentUser = user;
    req.session["currentUser"] = currentUser;
    res.json(user);
  };
  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    // if (currentUser) {
    res.json(currentUser);
    // } else {
    //   res.sendStatus(403);
    // }
  };

  app.post("/api/users/signin", signIn);
  app.post("/api/users/account", account);
  app.post("/api/users/signout", signOut);
  app.post("/api/users/signup", signUp);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findUserByUsername);

  // DONT DO THIS:
  app.get("/api/users/:username/:password", findUserByCredentials);
  app.get("/api/users/:username/:password/:firstName/:lastName", createUser);
  // app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
}

export default UserRoutes;
