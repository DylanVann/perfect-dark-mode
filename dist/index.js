window.__perfect_color_mode__ = (() => {
  const colorModes = ["light", "dark"];
  const colorModeKey = "perfect-color-mode";
  const colorModeOS = (() => {
    const matchesToMode = (matches) => matches ? "dark" : "light";
    const listeners = new Set();
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    let colorMode2;
    const onChangeMediaQuery = (e) => {
      const newMode = matchesToMode(e.matches);
      colorMode2 = newMode;
      listeners.forEach((cb) => cb(newMode));
    };
    mediaQuery.addEventListener ? mediaQuery.addEventListener("change", onChangeMediaQuery) : mediaQuery.addListener(onChangeMediaQuery);
    onChangeMediaQuery(mediaQuery);
    return {
      subscribe(cb) {
        cb(colorMode2);
        listeners.add(cb);
        return () => {
          listeners.delete(cb);
        };
      }
    };
  })();
  const colorModeSaved = (() => {
    const parseColorMode = (mode2) => mode2 ? colorModes.includes(mode2) ? mode2 : colorModes[0] : void 0;
    const listeners = new Set();
    let mode;
    const set = (colorMode3) => {
      if (colorMode3 !== void 0) {
        localStorage.setItem(colorModeKey, colorMode3);
      } else {
        localStorage.removeItem(colorModeKey);
      }
      listeners.forEach((cb) => cb(colorMode3));
    };
    const savedMode = localStorage.getItem(colorModeKey);
    const colorMode2 = parseColorMode(savedMode);
    mode = colorMode2;
    return {
      subscribe: (cb) => {
        cb(colorMode2);
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
      set,
      update: (updater) => set(updater(mode))
    };
  })();
  const colorModeSavedOrColorModeOS = (() => {
    let cmSaved;
    let cmOS;
    const getMerged = () => cmSaved || cmOS;
    const listeners = new Set();
    colorModeSaved.subscribe((v) => {
      cmSaved = v;
      listeners.forEach((cb) => cb(getMerged()));
    });
    colorModeOS.subscribe((v) => {
      cmOS = v;
      listeners.forEach((cb) => cb(getMerged()));
    });
    return {
      subscribe: (listener) => {
        listeners.add(listener);
        listener(getMerged());
        return () => listeners.delete(listener);
      },
      set: colorModeSaved.set,
      update: colorModeSaved.update
    };
  })();
  const htmlElement = document.documentElement;
  let colorMode;
  colorModeSavedOrColorModeOS.subscribe((v) => {
    if (colorMode) {
      htmlElement.classList.remove(colorMode);
    }
    if (v) {
      htmlElement.classList.add(v);
    }
    colorMode = v;
  });
  return {
    mode: colorModeSavedOrColorModeOS,
    colorModes
  };
})();
