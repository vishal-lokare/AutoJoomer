const slider =document.getElementById("earlyjoin");
const slider_value =document.getElementById("slider_value")
var texts =JSON.parse(window.localStorage.getItem("AutoJoomerearlyjoin"))+" minute";
if(texts=="null minute"){
slider_value.textContent="0 minute";}
else{
slider_value.textContent=JSON.parse(window.localStorage.getItem("AutoJoomerearlyjoin"))+" minute";}
slider.oninput = function(){
 slider_value.textContent = this.value+" minute"; }
