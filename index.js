const server = require("./server");

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
