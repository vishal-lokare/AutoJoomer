const slider =document.getElementById("earlyjoin");
const slider_value =document.getElementById("slider_value")
slider.oninput = function(){
 slider_value.textContent = this.value+" minute"; }