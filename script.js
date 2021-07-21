//set batch as 1 or 2
var batch = '1'

var branch='C'

var now = new Date();
var h = [0, 8, 9, 10, 12, 14, 14, 16];
var m = [0, 30, 40, 50, 0, 0, 0, 45];
var thatClassLink = ['', '', '', '', '', '', '', '']
var thatClassName = ['', '', '', '', '', '', '', '']
var millisOfThatClass = [0, 0, 0, 0, 0, 0, 0, 0]
$.getJSON('http://www.vishal-lokare.co/AutoJoomer/index.html', function(links) {
        alert('AutoJoomer Started!!!');

        var day = now.getDay();
        var thatDay = links.links[day]
        for(let i=1; i<8; i++) {
            var thatClass = thatDay[i];
            if(i!=5){
                if(branch=='E'){
                    thatClassName[i]=thatClass['class_name2'];
                    thatClassLink[i]=thatClass['class_link2'];
                }
                else{
                    thatClassName[i] = thatClass['class_name'];
                    thatClassLink[i] = thatClass['class_link'];
                }
            }
            else{
                if(batch==thatClass['class_name'][0]){
                    thatClassName[i]=thatClass['class_name'];
                    thatClassLink[i] = thatClass['class_link'];
                }
                else if(batch==thatClass['class_name2'][0]){
                    thatClassName[i]=thatClass['class_name2'];
                    thatClassLink[i]=thatClass['class_link2'];
                }
            }
            if(branch=='E' && (thatClassName[i]=="1_ICS123_LAB" || thatClassName[i]=="2_ICS123_LAB")){
                thatClassName[i]='';
            }
            if(thatClassName[i] == '')continue;
            millisOfThatClass[i] = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h[i], m[i], 0, 0) - now;
            if(millisOfThatClass[i] > 0) {
                    setTimeout(function() {
                        alert( 'Now the class is ' + thatClassName[i] + ' at ' + millisOfThatClass + ' ' + i);
                        window.open(thatClassLink[i],"_blank");
                    }, millisOfThatClass[i]);
            }
            else if(millisOfThatClass[i] > -2400000) {
                alert( 'Now the class is ' + thatClassName[i] + ' at ' + millisOfThatClass + ' ' + i);
                window.open(thatClassLink[i],"_blank");
            }
        }
});
