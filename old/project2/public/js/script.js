var lastLabel = ''
const video = document.getElementById('video')
var labels = []
var shots = 8;

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  labels = username()
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  play()
}

async function play() {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  const displaySize = { width: video.width, height: video.height }
  setInterval(async () => {
    const image = faceapi.createCanvasFromMedia(video)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      console.log(result)
      checkUser(result.label)
    })
  }, 1000)
}

function username() {
  $.get("/usernames", (data) => labels = data)
}

function loadLabeledImages() {
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`../../labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

function checkUser(face) {
  // if face in users show personal page
  // else show not face after a while
  if (labels.indexOf(face) == -1) {
    $('#login-display').html('not recognized')
    shots = 8
  } else {
    $('#login-display').html('recognized || '+ face + " || " + shots)
    if (face === lastLabel) {
      shots -= 1
      if (shots === 0) {
         $('#login-display').html('welcome ' + face) 
         window.open("/personal-page.html","_self")
        }
    } else {
      lastLabel = face
      shots = 8
    }
  }
}