const Status = require("./db/models/Status");

Status.create({ state: "open" }).then(state =>
  console.log(JSON.stringify(state))
);
Status.create({ state: "process" }).then(state =>
  console.log(JSON.stringify(state))
);
Status.create({ state: "close" }).then(state =>
  console.log(JSON.stringify(state))
);
Status.create({ state: "rejected" }).then(state =>
  console.log(JSON.stringify(state))
);