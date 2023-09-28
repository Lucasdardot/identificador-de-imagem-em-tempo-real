function setup() {
  canvas = createCanvas(350, 350);
  video = createCapture(VIDEO);
  video.hide()
  classifier = ml5.imageClassifier('MobileNet',modelLoaded)
}

function modelLoaded(){
  console.log("MobileNet foi carregado!")
}

function draw(){
  image(video,0,0, 350,350)
  classifier.classify(video, gotResult)
}

var resultadoanterior = ""

function gotResult(error, results){
  if (error){
    console.log(error)
  }
  else{
    if((results[0].confidence > 0.5)&&(resultadoanterior != results[0].label)){
      console.log(results)
      resultadoanterior = results[0].label
      var synth = window.speechSynthesis
      speakData = "O objeto detectado é " +results[0].label
      var Faleisso = new SpeechSynthesisUtterance(speakData)
      synth.speak(Faleisso)
      document.getElementById("resultObjectName").innerHTML = results[0].label
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(2)

    }
  }
}

