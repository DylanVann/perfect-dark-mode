const buttons = document.querySelectorAll('button.copy-code')

const selectEl = (el) => {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(el)
  selection.removeAllRanges()
  selection.addRange(range)
}

buttons.forEach((el) => {
  let timeout
  el.addEventListener('click', () => {
    const codeEl = document.querySelector(`code.${el.dataset.code}`)
    selectEl(codeEl)
    document.execCommand('copy')
    el.textContent = 'Copied!'
    clearTimeout(timeout)
    timeout = setTimeout(() => (el.textContent = 'Copy'), 1000)
  })
})

const code = document.querySelectorAll('code.copy-code')

code.forEach((el) => el.addEventListener('click', () => selectEl(el)))
