// Unistyles crashes Jest ("Failed to get NitroModules"): jpudysz/react-native-unistyles#394

let themes = {};
let currentThemeName = 'light';

const StyleSheet = {
  configure: (config) => {
    if (config?.themes) {
      themes = config.themes;
    }
  },
  create: (styles) => {
    const theme = themes[currentThemeName] || {};
    if (typeof styles === 'function') {
      return styles(theme, {});
    }
    return styles;
  },
};

const useUnistyles = () => ({
  theme: themes[currentThemeName] || {},
  themeName: currentThemeName,
  breakpoint: 'sm',
});

const UnistylesRuntime = {
  hasAdaptiveThemes: false,
  themeName: currentThemeName,
  setTheme: (name) => {
    currentThemeName = name;
  },
  setAdaptiveThemes: (enabled) => {
    UnistylesRuntime.hasAdaptiveThemes = enabled;
  },
  colorScheme: 'light',
};

module.exports = {
  StyleSheet,
  useUnistyles,
  UnistylesRuntime,
};
