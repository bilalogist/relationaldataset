const mongoose = require("mongoose");
const mysql = require("mysql2/promise");
const query = require("./tableSql");

let connection;

async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connected"); // mongoose.disconnect();
  } catch (err) {
    console.log("Coulnt connect mongodb");
  }
}

async function connectMySQL() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "bilalnasir",
      password: "Admin!23",
      database: "test",
    });
    console.log("My sql connected");
    await runSqlCommands();
  } catch (e) {
    console.log("Couldnt connect sql", e);
  }
}
async function executeQuery(query) {
  try {
    // execute a query using async/await
    const [result] = await connection.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function closeDb() {
  connection.end();
  mongoose.disconnect();
}

async function createTables() {
  // creating revision table
  console.log("Creating schemas");
  for (let i = 0; i < query.length; i++) {
    console.log(query[i]);
    const result = await connection.execute(query[i]);
  }
  console.log("Tables creation completed");
}

async function readData() {
  const MyModel = mongoose.model(
    "test",
    new mongoose.Schema({}, { strict: false }),
    "dataset"
  );

  const documents = await MyModel.find({});

  // looping through each document [dataset entry]
  documents.forEach(async (doc, index) => {
    let datasetv2_id = doc.id;
    let summary,
      documentation,
      coverage,
      provenance,
      enrichmentAndLinkageidentifier,
      version,
      issued;
    if (doc.datasetv2) {
      if (doc.datasetv2?.summary) {
        if (doc.datasetv2?.summary?.publisher) {
          const {
            identifier,
            name,
            logo,
            description,
            contactPoint,
            memberOf,
            deliveryLeadTime,
            accessService,
            accessRequestCost,
          } = doc.datasetv2?.summary?.publisher;

          // CHECK if exists

          const exists = checkIfExists("publishers", "identifier", identifier);
        }
      }
    }
  });
}

connectDb();
connectMySQL();
async function runSqlCommands() {
  const res = await checkIfExists();
  console.log("===========", res);
  // await createTables();
  // closeDb();
}

async function checkIfExists(table, key, value, pk = "id") {
  const result = await executeQuery(
    `SELECT ${pk} FROM ${table} WHERE ${key} = ${value}`
  );
  console.log(result);
  if (result.length > 0) return result[0][pk];
  else return false;
  // accept a call back to insert if not exists
}
