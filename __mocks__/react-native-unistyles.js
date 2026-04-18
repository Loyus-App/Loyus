// Manual mock for react-native-unistyles 3.x (C++ Nitro Module core)
// Required because Unistyles crashes Jest with "Failed to get NitroModules"
// See: https://github.com/jpudysz/react-native-unistyles/issues/394

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
