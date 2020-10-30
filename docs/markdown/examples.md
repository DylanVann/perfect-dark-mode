## Examples

These are plain JavaScript examples of using `perfect-dark-mode`, if you're using a framework like React/Vue/Svelte then you can skip to that documentation.

### Label

Display a label showing the mode.

<span class="pdm-label" style="visibility: hidden;">Light</span>

<include lang="js" src="./components/label.js" />

### Emoji

Display an emoji showing the mode.

<i class="pdm-emoji emoji light" style="visibility: hidden;"></i>

<include lang="js" src="./components/emoji.js" />

### Toggle

You can toggle the color mode.

<button class="pdm-toggle min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  <i class="pdm-emoji emoji light" style="visibility: hidden;"></i>
  <span class="pdm-label ml-1" style="visibility: hidden;">Light</span>
</button>

<include lang="js" src="./components/toggle.js" />

### Select

You can use a select for the color mode.

Perfect Dark Mode allows for more than just `light` and `dark` color modes.

On initialization PDM will read a list of modes from the `<html>` element's `data-pdm` attribute.
These become available on `.modes`.
`.modes` is a `Writable` like `.mode`, so it can also be `set` or `update`ed.

<select class="pdm-select min-w-1 form-select bg-color text-background focus:outline-none focus:shadow-outline border-0 focus:border-0">
  Light
</select>

<include lang="js" src="./components/select.js" />

### Cycle

You can use the `.update` method to cycle through color modes.

<button class="pdm-cycle min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  <i class="pdm-emoji emoji light" style="visibility: hidden;"></i>
  <span class="pdm-label ml-1" style="visibility: hidden;">Light</span>
</button>

<include lang="js" src="./components/cycle-button.js" />

### Reset

You can reset the color mode and fallback to system color mode.

<button class="pdm-reset min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  Reset
</button>

<include lang="js" src="./components/reset-button.js" />

### Mode

For debugging/understanding here is the saved color mode and the system color mode.

The displayed color mode is `SavedColorMode || SystemColorMode`.

<pre>
  <code class="pdm-mode-saved">Saved:</code>
</pre>

<pre>
  <code class="pdm-mode-system">System:</code>
</pre>

<include lang="js" src="./components/mode.js" />

### Syntax Highlighting

You may wish to switch syntax highlighting themes based on the mode.

```html
<link
  class="codestyle light blue"
  rel="stylesheet"
  href="/syntax/prism-base16-ateliersulphurpool.light.css"
  media="(prefers-color-scheme: light)"
/>
<link
  class="codestyle dark"
  rel="stylesheet"
  href="/syntax/prism-nord.css"
  media="(prefers-color-scheme: dark)"
/>
```

<include lang="js" src="./components/syntax-highlight.js" />

### Animating Transitions

You should add the transition property with JS to avoid a transition between no-js and js.

<include lang="js" src="./components/root.js" />

### Toggle with System Mode

This is a toggle that includes showing when we are using the system color mode.

<button class="pdm-toggle-with-system-mode min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  <i class="pdm-emoji emoji light" style="visibility: hidden;"></i>
  <span class="pdm-label-with-system-mode ml-1" style="visibility: hidden;">Light</span>
</button>

<include lang="js" src="./components/toggle-with-system-mode.js" />
