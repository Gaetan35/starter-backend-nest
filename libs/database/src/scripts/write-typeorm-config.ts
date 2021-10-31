/**
 * This script generates a ormconfig.json file
 * in the project root. This is needed for the typeorm cli
 * to work, but not by the rest of the app.
 * In order to avoid code duplication, we generate the conf file on the fly
 * using the scripts in package json before running the migrations.
 * The generated file is ignored in the version control
 */

import { dbConfigService } from '../config/dbConfig.service';

import fs = require('fs');

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(dbConfigService.getTypeOrmCliConfig(), null, 2),
);
