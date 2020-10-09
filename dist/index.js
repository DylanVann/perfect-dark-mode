window.__perfect_color_mode__ = (() => {
  const colorModes = ["light", "dark"];
  const colorModeKey = "perfect-color-mode";
  const supportsMatchMedia = matchMedia !== void 0;
  let mediaQuery;
  let mediaQueryHasListener;
  const parseColorMode = (mode) => colorModes.includes(mode) ? mode : colorModes[0];
  const matchesToMode = (matches) => matches ? "dark" : "light";
  const getSavedMode = () => {
    const colorModeSaved = localStorage.getItem(colorModeKey);
    return colorModeSaved !== null ? parseColorMode(colorModeSaved) : void 0;
  };
  const getOSMode = () => {
    if (!supportsMatchMedia) {
      return void 0;
    }
    mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    return matchesToMode(mediaQuery.matches);
  };
  const getInitialMode = () => {
    const colorModeSaved = getSavedMode();
    if (colorModeSaved !== void 0) {
      return colorModeSaved;
    }
    const colorModeOS = getOSMode();
    if (colorModeOS) {
      addMediaQueryListener();
      return colorModeOS;
    }
    return colorModes[0];
  };
  const onChangeMediaQuery = (e) => internalSet(matchesToMode(e.matches), false);
  const addEventListener = "addEventListener";
  const addMediaQueryListener = () => {
    if (!mediaQueryHasListener && supportsMatchMedia) {
      mediaQueryHasListener = true;
      mediaQuery[addEventListener] ? mediaQuery[addEventListener]("change", onChangeMediaQuery) : mediaQuery.addListener(onChangeMediaQuery);
    }
  };
  const removeEventListener = "removeEventListener";
  const removeMediaQueryListener = () => {
    if (mediaQueryHasListener && supportsMatchMedia) {
      mediaQueryHasListener = false;
      mediaQuery[removeEventListener] ? mediaQuery[removeEventListener]("change", onChangeMediaQuery) : mediaQuery.removeListener(onChangeMediaQuery);
    }
  };
  let currentMode;
  const htmlElement = document.documentElement;
  const internalSet = (mode, save) => {
    htmlElement.classList.remove(currentMode);
    htmlElement.classList.add(mode);
    if (save) {
      if (mode === void 0) {
        localStorage.removeItem(colorModeKey);
        addMediaQueryListener();
      } else {
        localStorage.setItem(colorModeKey, mode);
        removeMediaQueryListener();
      }
    }
    currentMode = mode;
    listeners.forEach((l) => l(mode));
  };
  const listeners = new Set();
  internalSet(getInitialMode(), false);
  return {
    mode: {
      get: () => currentMode,
      subscribe: (listener) => {
        listener(currentMode);
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      set: (mode) => {
        internalSet(mode, true);
      },
      update: (updater) => {
        internalSet(updater(currentMode), true);
      }
    },
    colorModes
  };
})();
