const loader = document.getElementById('loader')
const bg = document.getElementById('bg')
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)


const loading = (() => {
  let imageLoaded = false
  let musicLoaded = false
  return {
    setImageLoaded: (newVal = true) => imageLoaded = newVal,
    setMusicLoaded: (newVal = true) => musicLoaded = newVal,
    isLoaded: () => imageLoaded && musicLoaded
  }
})()

const checkLoading = () => {
  if (loading.isLoaded()) {
    loader.classList.remove('animated')
    setTimeout(() => loader.classList.add('play'), 10)
  }
}

loader.onclick = (e) => {
  if (!loading.isLoaded()) {
    return
  }
  e.target.classList.remove('active')
  music.play()
  bg.style['background-image'] = `url(${image.src})`
  setTimeout(() => {
    bg.style['opacity'] = '1'
  }, 4)
  document.getElementsByTagName('main')[0].classList.remove('loading')
}


const image = new Image()
image.src="./bg.jpg"

image.onload = () => {
  loading.setImageLoaded()
  checkLoading()
}

const music = new Audio('./sonata.mp3')

if (isMobile) {
  loading.setMusicLoaded()
  checkLoading()
}

music.oncanplay = () => {
  console.info('music loaded..')
  loading.setMusicLoaded()
  checkLoading()
}