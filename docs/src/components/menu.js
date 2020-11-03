const nav = document.querySelector('nav')
const navContentContainer = document.querySelector('.nav-content-container')
const navContent = document.querySelector('.nav-content')
const navBar = document.querySelector('.nav-bar')

const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.width = '100px'
  scrollDiv.style.height = '100px'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.position = 'absolute'
  scrollDiv.top = '-9999px'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

const scrollbarWidth = getScrollbarWidth()
let scrollY = 0

const showDialog = () => {
  const body = document.body
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}`
  body.style.right = `${scrollbarWidth}px`
  navBar.style.right = `${scrollbarWidth}px`
  nav.classList.add('bg-white')
  navContentContainer.classList.remove('hidden')
  navContentContainer.classList.remove('pointer-events-none')
  navContent.scrollTop = 0
  open = true
}

const closeDialog = () => {
  const body = document.body
  const scrollY = body.style.top
  body.style.position = ''
  body.style.top = ''
  body.style.right = ''
  navBar.style.right = ``
  document.documentElement.style.scrollBehavior = 'auto'
  window.scrollTo({
    left: 0,
    top: parseInt(scrollY || '0') * -1,
    behavior: 'auto',
  })
  requestAnimationFrame(() =>
    requestAnimationFrame(
      () => (document.documentElement.style.scrollBehavior = 'smooth'),
    ),
  )
  nav.classList.remove('bg-white')
  navContentContainer.classList.add('hidden')
  navContentContainer.classList.add('pointer-events-none')
  open = false
}

let open = false
const menuButton = document.querySelector('.pdm-menu')
menuButton.addEventListener('click', () => {
  if (open) {
    closeDialog()
  } else {
    showDialog()
  }
})

const getLinkInContent = (el) => {
  const [_, id] = el.href.split('#')
  const element = document.querySelector(`[id="${id}"]`)
  const level = parseInt(element.tagName[1])
  return { navElement: el, element, level, id }
}

const linksInSidebar = [...document.querySelectorAll('.toc a')]
const linksInContent = linksInSidebar.map(getLinkInContent)

const map = linksInContent.map(({ navElement, element, level, id }, i, arr) => {
  const offsetTop = element.offsetTop
  let nextEl
  for (let j = i + 1; j < arr.length; j++) {
    const item = arr[j]
    if (item.level <= level) {
      nextEl = item.element
      break
    }
  }
  const offsetBottom =
    nextEl?.offsetTop || document.documentElement.offsetHeight
  return { offsetTop, offsetBottom, element, id, level, navElement }
})

const onScroll = () => {
  scrollY = `${window.scrollY}px`
  const scrollTop = window.scrollY
  const height = document.documentElement.clientHeight
  const scrollBottom = scrollTop + height
  map.forEach((el) => {
    if (el.offsetTop < scrollBottom && el.offsetBottom > scrollTop) {
      el.navElement.classList.add('active')
    } else {
      el.navElement.classList.remove('active')
    }
  })
}

window.addEventListener('scroll', onScroll, { passive: true })

onScroll()

linksInSidebar.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (open) {
      closeDialog()
    }
  })
})
