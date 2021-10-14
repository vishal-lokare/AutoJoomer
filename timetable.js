window.onload=function(){
		var fetchLink = "https://autojoomer-45dc2-default-rtdb.asia-southeast1.firebasedatabase.app/links/CSE.json";
		$.getJSON(fetchLink, function (links){
			for(j=1;j<=5;j++){
				var thatDay = (links[j])
				var nooflec = Object.keys(thatDay).length-1;  
				for (let i = 1; i <= nooflec-1; i++) {
					if(i==5){
						var thatClass = thatDay[i];
						var thatClassName = thatClass['class_name'];
						var thatClassLink = thatClass['class_link'];  
						id='d'+j+'l'
						str='<a href='+thatClassLink+'>'+thatClassName+'</a>'
                		document.getElementById(id).innerHTML=str;
					}
					else{
						var thatClass = thatDay[i];
						var thatClassName = thatClass['class_name'];
						var thatClassLink = thatClass['class_link'];  
						id='d'+j+'p'+i
						str='<a href='+thatClassLink+'>'+thatClassName+'</a>'
                		document.getElementById(id).innerHTML=str;
					}
            	}
			}
        });
}