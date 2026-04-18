const { withAndroidManifest } = require('expo/config-plugins');
const { writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const DATA_EXTRACTION_RULES = `<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
  <cloud-backup>
    <include domain="file" path="mmkv/" />
  </cloud-backup>
  <device-transfer>
    <include domain="file" path="mmkv/" />
  </device-transfer>
</data-extraction-rules>`;

const BACKUP_RULES = `<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
  <include domain="file" path="mmkv/" />
</full-backup-content>`;

/** @type {import('expo/config-plugins').ConfigPlugin} */
const withBackupRules = (config) => {
  return withAndroidManifest(config, async (config) => {
    const app = config.modResults.manifest.application?.[0];
    if (!app) return config;

    // Write XML resource files
    const resXmlDir = resolve(
      config.modRequest.platformProjectRoot,
      'app/src/main/res/xml',
    );
    mkdirSync(resXmlDir, { recursive: true });
    writeFileSync(
      resolve(resXmlDir, 'data_extraction_rules.xml'),
      DATA_EXTRACTION_RULES,
    );
    writeFileSync(resolve(resXmlDir, 'backup_rules.xml'), BACKUP_RULES);

    // Set manifest attributes
    app.$['android:allowBackup'] = 'true';
    app.$['android:dataExtractionRules'] = '@xml/data_extraction_rules';
    app.$['android:fullBackupContent'] = '@xml/backup_rules';

    return config;
  });
};

module.exports = withBackupRules;
