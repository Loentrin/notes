var months = ['студзеня', "лютага", "сакавіка", "красавіка", "траўня", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"]
var date = new Date()
var currentDate = String(date.getDate()) + " " + months[String(date.getMonth())] + " " + String(date.getFullYear())

if(localStorage.getItem("dream_date") == null) localStorage.setItem("dream_date", "")
if(localStorage.getItem("dream_text") == null) localStorage.setItem("dream_text", "")

var dates = localStorage.getItem("dream_date").split(",")
var texts = localStorage.getItem("dream_text").split("[|||]")

//dates = []
//texts = []

if(!dates.includes(currentDate)){
	dates.unshift(currentDate)
	texts.unshift('...')
}

for(var i = 0; i < dates.length; i++){
	document.getElementById("body").innerHTML += "<button class='date'>" + dates[i] + "</button> <div class='dreams' contenteditable='true'>" + texts[i]  + "</div>"
}

var d = document.getElementsByClassName("date");
var scrollHeights = []

setInterval(function(){
	var s = ""
	var dt = ""
	var t = document.getElementsByClassName("dreams")
	for(var i = 0; i < t.length; i++){
		s += t[i].innerHTML
		dt += dates[i]
		if(i != t.length-1){
			s += "[|||]"
			dt += ","
		}
	}
	localStorage.setItem("dream_text", s)
	localStorage.setItem("dream_date", dt)

	for (var i = 0; i < d.length; i++) {
		var next = d[i].nextElementSibling
    	if(next.style.maxHeight){
    		scrollHeights[i] = next.scrollHeight
    		next.style.maxHeight = scrollHeights[i] + "px";
    	} 
    }
}, 100)



for (var i = 0; i < d.length; i++) {
  d[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    scrollHeights[i] = content.scrollHeight
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = scrollHeights[i] + "px";
    }
  });
}
