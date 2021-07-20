var batch = ''

var now = new Date();
var h = [0, 8, 9, 10, 12, 14, 14, 16];
var m = [0, 30, 40, 50, 0, 0, 0, 45];
var thatClassLink = ['', '', '', '', '', '', '', '']
var thatClassName = ['', '', '', '', '', '', '', '']
var millisOfThatClass = [0, 0, 0, 0, 0, 0, 0, 0]
$.getJSON('http://www.vishal-lokare.co/AutoJoomer/index.html', function(links) {
        alert('AutoJoomer Started!!!');
        var not_batch = '';
        if(batch == '2')
            not_batch = '1';
        else
            not_batch = '2';
        var day = now.getDay();
        var thatDay = links.links[day]
        for(let i=1; i<8; i++) {
            var thatClass = thatDay[i];
            thatClassName[i] = thatClass['class_name'];
            thatClassLink[i] = thatClass['class_link'];
            console.log('inside loop');
            if(not_batch == ''){alert('skipped');continue;}
            if(thatClassName[i][0] == not_batch)continue;
            if(thatClassName[i] == '')continue;
            millisOfThatClass[i] = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h[i], m[i], 0, 0) - now;
            if(millisOfThatClass[i] > 0) {
                    // alert(thatClassName[i] + ' at ' + h[i] + m[i] + ' ' + thatClassLink[i]);
                    setTimeout(function() {
                        if(window.confirm( 'Now the class is ' + thatClassName[i] + ' at ' + millisOfThatClass + ' ' + i)){
                           window.open(thatClassLink[i],"_blank");
                        }
                    }, millisOfThatClass[i]);
            }
            else if(millisOfThatClass[i] > -2400000) {
                if(window.confirm( 'Now the class is ' + thatClassName[i] + ' at ' + millisOfThatClass + ' ' + i)){
                     window.open(thatClassLink[i],"_blank");
                }
            }
        }
});
