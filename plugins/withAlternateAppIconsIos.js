const {
  withAlternateAppIconsGenerator,
} = require('expo-alternate-app-icons/plugin/build/ios/withAlternateAppIconsGenerator');
const {
  withXcodeProjectUpdate,
} = require('expo-alternate-app-icons/plugin/build/ios/withXcodeProjectUpdate');
const {
  generateTypeIconsFile,
  toPascalCaseIconName,
} = require('expo-alternate-app-icons/plugin/build/utils');

const withAlternateAppIconsIos = (config, icons = []) => {
  if (icons.length === 0) return config;
  const alternateIcons = icons.map(toPascalCaseIconName);
  const names = alternateIcons.map((icon) => icon.name);
  generateTypeIconsFile(names);
  return withXcodeProjectUpdate(withAlternateAppIconsGenerator(config, alternateIcons), names);
};

module.exports = withAlternateAppIconsIos;
