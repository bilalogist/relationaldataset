const revisionsTable =
  await executeQuery(`CREATE TABLE IF NOT EXISTS revisions (
  id INT NOT NULL AUTO_INCREMENT,
  version VARCHAR(50),
  url VARCHAR(500),
  PRIMARY KEY (id)
)`);
const observationTable =
  await executeQuery(`CREATE TABLE IF NOT EXISTS observations (
  id INT NOT NULL AUTO_INCREMENT,
  observedNode VARCHAR(500),
  measuredValue INT,
  disambiguatingDescription VARCHAR(5000),
  observationDate VARCHAR(100),
  measuredProperty VARCHAR(1000),
  PRIMARY KEY (id)
)`);

const datasetv2Table =
  await executeQuery(`CREATE TABLE IF NOT EXISTS datasetv2 (
  id INT NOT NULL ,
  identifier VARCHAR(5000),
  version VARCHAR(500),
  issued VARCHAR(500),
  modified VARCHAR(500),
  revisions INT,
  summary INT,
  documentation INT,
  coverage INT,
  provenance INT,
  enrichmentAndLinkage INT,
  observations INT,
  PRIMARY KEY (id)
  )`);

const observation_datasetv2_table =
  await executeQuery(`CREATE TABLE IF NOT EXISTS observations_datasetv2 (
  id INT NOT NULL AUTO_INCREMENT,
  observationId INT NOT NULL,
  datasetv2Id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (observationId) REFERENCES observations(id),
  FOREIGN KEY (datasetv2Id) REFERENCES datasetv2(id)
)`);

const revisions_datasetv2_table =
  await executeQuery(`CREATE TABLE IF NOT EXISTS revisions_datasetv2 (
  id INT NOT NULL AUTO_INCREMENT,
  revisionsId INT NOT NULL,
  datasetv2Id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (revisionsId) REFERENCES revisions(id),
  FOREIGN KEY (datasetv2Id) REFERENCES datasetv2(id)
)`);
