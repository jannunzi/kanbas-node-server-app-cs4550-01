const HelloRoutes = (app) => {
  const hello = (req, res) => {
    res.send("Life is good 123!");
  };

  app.get("/hello", hello);
  app.get("/", (req, res) => {
    res.send("Welcome to Assignment 5 !!!!");
  });
};
export default HelloRoutes;
