const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});







// Our main GET home page route, pulls from src/pages/index.hbs
fastify.get("/", function (request, reply) {
  // request.query.paramName <-- a querystring example
  return reply.view("src/pages/login.html");
});


fastify.get("/login", function (request, reply) {
  // request.query.paramName <-- a querystring example
  return reply.view("src/pages/login.html");
});


// Login POST route to authenticate a user.
// fastify.post("/login", async function(request, reply) {
//   const query = 'SELECT * FROM user WHERE user.username = $1;'
//   db.any(query, [
//     request.body.username,
//   ])
//   .then(async(user) => {
//     console.log("A");
//   })
// });


// fastify.



// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);


//API 