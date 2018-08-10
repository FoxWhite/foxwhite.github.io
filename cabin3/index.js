const image = new Image()
image.src="./bg.jpg"
setTimeout(() => {
  if (!image.complete) {
    document.getElementById('loader').classList.add('active')
  }
}, 500)


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
    document.getElementById('loader').classList.remove('active')
    document.getElementById('music').play()
    document.getElementById('bg').style['background-image'] = `url(${image.src})`
    setTimeout(() => {
      document.getElementById('bg').style['opacity'] = '1'
    }, 4)
    document.getElementsByTagName('main')[0].classList.remove('loading')
  }
}

image.onload = () => {
  loading.setImageLoaded()
  checkLoading()
}

music.addEventListener('canplaythrough', () => {
  loading.setMusicLoaded()
  checkLoading()
})