window.__perfect_dark_mode__=(()=>{const l=["light","dark"],s="perfect-dark-mode",M=(()=>{const a=o=>o?"dark":"light",t=new Set,d=matchMedia("(prefers-color-scheme: dark)");let n;const r=o=>{const e=a(o.matches);n=e,t.forEach(b=>b(e))};return d.addEventListener?d.addEventListener("change",r):d.addListener(r),r(d),{subscribe(o){return o(n),t.add(o),()=>{t.delete(o)}}}})(),c=(()=>{const a=e=>e?l.includes(e)?e:l[0]:void 0,t=new Set;let d;const n=e=>{e!==void 0?localStorage.setItem(s,e):localStorage.removeItem(s),t.forEach(b=>b(e)),d=e},r=localStorage.getItem(s),o=a(r);return d=o,{subscribe:e=>(e(o),t.add(e),()=>t.delete(e)),set:n,update:e=>n(e(d))}})(),f=(()=>{let a,t;const d=()=>a||t,n=new Set;return c.subscribe(r=>{a=r,n.forEach(o=>o(d()))}),M.subscribe(r=>{t=r,n.forEach(o=>o(d()))}),{subscribe:r=>(n.add(r),r(d()),()=>n.delete(r)),set:c.set,update:c.update}})(),i=document.documentElement;let u;return f.subscribe(a=>{u&&i.classList.remove(u),a&&i.classList.add(a),u=a}),i.classList.add("pdm"),{mode:f,colorModes:l}})();
//# sourceMappingURL=index.js.map
