const getLinkInContent = (el) => {
  const [_, id] = el.href.split('#')
  const element = document.querySelector(`a.markdownIt-Anchor[href="#${id}"]`)
  const level = parseInt(element.parentElement.tagName[1])
  return { navElement: el, element, level, id }
}

const linksInSidebar = [...document.querySelectorAll('.markdownIt-TOC a')]
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

document.addEventListener('scroll', onScroll, { passive: true })

onScroll()
