module.exports = [
  `CREATE TABLE IF NOT EXISTS publishers (
  identifier VARCHAR(500) NOT NULL,
  name VARCHAR(1000),
  logo VARCHAR(500),
  description VARCHAR(500),
  contactPoint VARCHAR(500),
  memberOf VARCHAR(500),
  deliveryLeadTime VARCHAR(500),
  accessService VARCHAR(1000),
  accessRequestCost VARCHAR(1000),
  PRIMARY KEY (identifier)
  );
  `,
  `CREATE TABLE IF NOT EXISTS accessRights (
  id INT NOT NULL AUTO_INCREMENT,
  accessRight VARCHAR(1000),
  publisher VARCHAR(500),
  PRIMARY KEY (id),
  FOREIGN KEY (publisher) REFERENCES publishers(identifier)
);

`,
  `CREATE TABLE IF NOT EXISTS keywords (
  id INT NOT NULL AUTO_INCREMENT,
  keyword VARCHAR(1000),
  PRIMARY KEY (id)
);

-- Main table
`,
  `CREATE TABLE IF NOT EXISTS summary (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(5000),
  abstract VARCHAR(5000),
  publisher VARCHAR(500),
  contactPoint VARCHAR(500),
  keywords INT,
  doiName VARCHAR(1000),
  PRIMARY KEY (id),
  FOREIGN KEY (publisher) REFERENCES publishers(identifier)
  );
  
`,
  `CREATE TABLE IF NOT EXISTS keywords_summary (
  id INT NOT NULL AUTO_INCREMENT,
  summary INT,
  keywords INT,
  PRIMARY KEY (id),
  FOREIGN KEY (summary) REFERENCES summary(id),
  FOREIGN KEY (keywords) REFERENCES keywords(id)
);
 
`,
  `CREATE TABLE IF NOT EXISTS alternateIdentifiers(
  id INT NOT NULL AUTO_INCREMENT,
  alternateIdentifier VARCHAR(1000),
  summary INT,
  PRIMARY KEY (id),
  FOREIGN KEY (summary) REFERENCES summary(id)
);

-- Main table
`,
  `CREATE TABLE IF NOT EXISTS documentation (
  id INT NOT NULL AUTO_INCREMENT,
  description TEXT,
  isPartOf INT,
  PRIMARY KEY (id)
  );
  
-- many to many with documentation <-> associatedMedia  

 `,
  `CREATE TABLE IF NOT EXISTS associatedMedia (
  id INT NOT NULL AUTO_INCREMENT,
  associatedMedia VARCHAR(1000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS documentation_associatedMedia (
  id INT NOT NULL AUTO_INCREMENT,
  associatedMedia INT,
  documentation INT,
  PRIMARY KEY (id),
  FOREIGN KEY (associatedMedia) REFERENCES associatedMedia(id),
  FOREIGN KEY (documentation) REFERENCES documentation(id)
);

 -- many to many with documentation <-> isPartOf

 `,
  `CREATE TABLE IF NOT EXISTS isPartOf (
  id INT NOT NULL AUTO_INCREMENT,
  associatedMedia VARCHAR(1000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS documentation_isPartOf (
  id INT NOT NULL AUTO_INCREMENT,
  isPartOf INT,
  documentation INT,
  PRIMARY KEY (id),
  FOREIGN KEY (isPartOf) REFERENCES isPartOf(id),
  FOREIGN KEY (documentation) REFERENCES documentation(id)
);

-- Main table coverage
 `,
  `CREATE TABLE IF NOT EXISTS coverage (
  id INT NOT NULL AUTO_INCREMENT,
  spatials INT,
  typicalAgeRange INT,
  followup INT,
  pathway INT,
  PRIMARY KEY (id)

);
  
   -- many to many with coverage <-> physicalSampleAvailability

 `,
  `CREATE TABLE IF NOT EXISTS physicalSampleAvailability (
  id INT NOT NULL AUTO_INCREMENT,
  physicalSampleAvailability VARCHAR(2000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS coverage_physicalSampleAvailability (
  id INT NOT NULL AUTO_INCREMENT,
  coverage INT,
  physicalSampleAvailability INT,
  PRIMARY KEY (id),
  FOREIGN KEY (coverage) REFERENCES coverage(id),
  FOREIGN KEY (physicalSampleAvailability) REFERENCES physicalSampleAvailability(id)
);
  
-- main table provenance
 `,
  `CREATE TABLE IF NOT EXISTS origin (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);
  
   -- many to many with origin <-> purpose

 `,
  `CREATE TABLE IF NOT EXISTS purpose (
  id INT NOT NULL AUTO_INCREMENT,
  purpose VARCHAR(2000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS purpose_origin (
  id INT NOT NULL AUTO_INCREMENT,
  origin_id INT,
  purpose_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (origin_id) REFERENCES origin(id),
  FOREIGN KEY (purpose_id) REFERENCES purpose(id)
);
  -- many to many with origin <-> sources

 `,
  `CREATE TABLE IF NOT EXISTS sources (
  id INT NOT NULL AUTO_INCREMENT,
  sourceValue VARCHAR(2000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS sources_origin (
  id INT NOT NULL AUTO_INCREMENT,
  source_id INT,
  origin_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (source_id) REFERENCES sources(id),
  FOREIGN KEY (origin_id) REFERENCES origin(id)
);
  -- many to many with origin <-> collectionSituation

 `,
  `CREATE TABLE IF NOT EXISTS collectionSituation (
  id INT NOT NULL AUTO_INCREMENT,
  collectionSituation VARCHAR(2000),
  PRIMARY KEY (id)
);

`,
  `CREATE TABLE IF NOT EXISTS collection_situation_origin (
  id INT NOT NULL AUTO_INCREMENT,
  collectionSituation INT,
  origin INT,
  PRIMARY KEY (id),
  FOREIGN KEY (collectionSituation) REFERENCES collectionSituation(id),
  FOREIGN KEY (origin) REFERENCES origin(id)
);

`,
  `CREATE TABLE IF NOT EXISTS temporal (
  id INT NOT NULL AUTO_INCREMENT,
  accrualPeriodicity VARCHAR(1000),
  distributionReleaseDate VARCHAR(1000),
  startDate VARCHAR(1000),
  endDate VARCHAR(1000),
  timeLag VARCHAR(1000),
  PRIMARY KEY (id)
);

-- main table Provenance

`,
  `CREATE TABLE IF NOT EXISTS provenance (
	id INT NOT NULL,
	origin_id INT,
	temporal_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (origin_id) REFERENCES origin(id),
    FOREIGN KEY (temporal_id) REFERENCES temporal(id)
);

--  main table enrichmentAndLinkage
`,
  `CREATE TABLE IF NOT EXISTS enrichmentAndLinkage (
	id INT NOT NULL,
    PRIMARY KEY (id)
);


`,
  `CREATE TABLE IF NOT EXISTS qualifiedRelation (
	id INT NOT NULL,
	qualifiedRelation INT,
	enrichmentAndLinkage_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (enrichmentAndLinkage_id) REFERENCES enrichmentAndLinkage(id)
);
  
`,
  `CREATE TABLE IF NOT EXISTS derivation (
	id INT NOT NULL,
	derivation INT,
	enrichmentAndLinkage_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (enrichmentAndLinkage_id) REFERENCES enrichmentAndLinkage(id)
);   
 
`,
  `CREATE TABLE IF NOT EXISTS tools (
	id INT NOT NULL,
	tools INT,
	enrichmentAndLinkage_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (enrichmentAndLinkage_id) REFERENCES enrichmentAndLinkage(id)
);  

-- main table revisions
 `,
  `CREATE TABLE IF NOT EXISTS revisions (
  id INT NOT NULL AUTO_INCREMENT,
  version VARCHAR(50),
  url VARCHAR(500),
  PRIMARY KEY (id)
);
 -- main table observations
`,
  `CREATE TABLE IF NOT EXISTS observations (
  id INT NOT NULL AUTO_INCREMENT,
  observedNode VARCHAR(500),
  measuredValue INT,
  disambiguatingDescription VARCHAR(5000),
  observationDate VARCHAR(100),
  measuredProperty VARCHAR(1000),
  PRIMARY KEY (id)
);

-- main table datasetv2
  `,
  `CREATE TABLE IF NOT EXISTS datasetv2 (
  id INT NOT NULL ,
  identifier VARCHAR(5000),
  version VARCHAR(500),
  issued VARCHAR(500),
  modified VARCHAR(500),
  summary INT,
  documentation INT,
  coverage INT,
  provenance INT,
  enrichmentAndLinkage INT,
  PRIMARY KEY (id),
  FOREIGN KEY (summary) REFERENCES summary(id),
  FOREIGN KEY (documentation) REFERENCES documentation(id),
  FOREIGN KEY (coverage) REFERENCES coverage(id),
  FOREIGN KEY (provenance) REFERENCES provenance(id),
  FOREIGN KEY (enrichmentAndLinkage) REFERENCES enrichmentAndLinkage(id)
  );
 
 -- many to many relation datasetv2 <-> observation
 `,
  `CREATE TABLE IF NOT EXISTS observations_datasetv2 (
  id INT NOT NULL AUTO_INCREMENT,
  observationId INT NOT NULL,
  datasetv2Id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (observationId) REFERENCES observations(id),
  FOREIGN KEY (datasetv2Id) REFERENCES datasetv2(id)
);

 -- many to many relation datasetv2 <-> revisions
 `,
  `CREATE TABLE IF NOT EXISTS revisions_datasetv2 (
  id INT NOT NULL AUTO_INCREMENT,
  revisionsId INT NOT NULL,
  datasetv2Id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (revisionsId) REFERENCES revisions(id),
  FOREIGN KEY (datasetv2Id) REFERENCES datasetv2(id)
);
 
  
  `,
];
