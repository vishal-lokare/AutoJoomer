var subjects = [
    /*Sem 1*/
    'IHS111,#08415c','ICS111,#cc2936','IEC111,#2e933c','IMA111,#a06cd5','IHS112,#2e1f27','ICS112,#dd7230','IEC112,#cc2936','TCA,#29274c','IPT111,#2e1f27',
    'CCA,#012a36','ICS111-LAB,#cc2936','IEC111-LAB,#2e933c','ICS112-LAB,#dd7230','Sem./Colloq,#93092E',
    
    /*Sem 3*/
    'IMA221,#08415c','ICS221,#cc2936','ICS222,#2e933c','ICS223,#a06cd5','ICS224,#2e1f27','IHS221,#759aab','IHS222,#1E392A','ICS225,#a87532','IEC221,#cc2936','IEC222,#2e933c',
    'IEC223,#a06cd5','ICS222-LAB,#2e933c','ICS224-LAB,#2e1f27','ICS225-LAB,#a87532','ICS223-LAB,#a06cd5','IEC223-LAB,#a06cd5','IEC221-LAB,#cc2936',
    
    /*Sem 6*/
    'CSE321,#08415c','CSE322,#cc2936','ICS321,#2e933c','ICS322,#a06cd5','ISC321,#2e1f27','IOE321,#759aab','CSE321-LAB,#08415c','ICS321-LAB,#2e933c','CSE322-LAB,#cc2936',
    'Honours-1,#dd7230','CCA/TPA,#2e1f27','TPA,#2e1f27']

var tooltip_sub = [
    /*Sem 1*/
    'Communication Skills','IT Workshop','Electrical Circuits and Measurements','Discrete Mathematics','French','C Progamming','Network Theory','Technical Club Activities',
    'Physical Training','Coding Club Activities','IT Workshop LAB','Electronic Circuits and Measurements LAB','C Programming LAB','Seminars',
    
    /*Sem 3*/
    'Differential Equations and Transforms','Theory of Computation','Object Oriented Analysis and Design','Compiler Design','Computer Networks','Fundamentals of Economics',
    'Principles of Management','Data Structures','Digital Design with Hardware','Digital Communication','Electromagnetic Theory','Object Oriented Analysis and Design LAB',
    'Computer Networks LAB','Data Structures LAB','Compiler Design LAB','Electromagnetic Theory LAB','Digital Design with Hardware LAB',
    
    /*Sem 6*/
    'Microprocessors','Cloud Computing','Data Warehousing and Data Mining','Machine Learning','High Performance and Scientific Computing','Software Design Patterns',
    'Microprocessors-LAB','High Performance and Scientific Computing LAB','Cloud Computing LAB','Honours-1','Coding Club Activities/Training and Placement Activities',
    'Training and Placement Activities']


//Timetables
var y1cscyb1 = [[2,0,5,3,12,9],[1,3,5,0,-1,9],[5,3,1,3,10,13],[4,1,2,5,11,9],[2,1,0,2,7,8]]
var y1cscyb2 = [[2,3,5,0,12,9],[1,0,5,2,-1,9],[5,0,1,4,11,13],[2,1,3,5,10,9],[3,1,3,2,7,8]]
var y1ecb1 =   [[2,0,5,3,12,9],[6,3,5,0,-1,9],[5,3,6,3,-1,13],[4,6,2,5,11,9],[2,6,0,2,7,8]]
var y1ecb2 =   [[2,3,5,0,12,9],[6,0,5,2,-1,9],[5,0,6,4,11,13],[2,6,3,5,-1,9],[3,6,3,2,7,8]]
var y2cscyb1 = [[17,18,15,14,25,9],[15,14,18,16,26,9],[18,14,16,14,27,13],[17,16,19,15,28,9],[16,20,18,21,7,8]]
var y2cscyb2 = [[17,18,15,14,25,9],[15,14,18,16,26,9],[14,19,19,14,27,13],[17,16,20,15,28,9],[16,18,18,21,7,8]]
var y2ecb1 =   [[22,18,24,15,29,9],[24,14,26,24,26,9],[18,14,23,15,27,13],[23,22,19,23,30,9],[23,20,22,21,7,8]]
var y2ecb2 =   [[22,18,24,15,29,9],[24,14,26,24,26,9],[14,19,23,15,27,13],[23,22,20,23,30,9],[23,18,22,21,7,8]]
var y3cs =     [[34,32,31,35,37,40],[32,31,34,35,38,9],[35,36,33,40,39,13],[33,32,31,36,40,41],[36,33,40,34,7,42]]

//Collection
var classes =  [y1cscyb1,y1cscyb2,y1ecb1,y1ecb2,y2cscyb1,y2cscyb2,y2ecb1,y2ecb2,y3cs]
var days = ['M','T','W','TH','F'];


//Changes the table element and the data tooltip attribute
function display(selected){
    for(var i=1;i<6;i++){
        for(var j=1;j<7;j++){
            var index = [classes[selected][i-1][j-1]];
            var target = document.getElementById(days[i-1]+String(j));
            if(index!=-1){
                target.innerHTML = subjects[index].split(',')[0];
                target.style.backgroundColor = subjects[index].split(',')[1];
                target.setAttribute('data-tooltip',tooltip_sub[index]);
            } else {
                target.innerHTML = 'NONE';
                target.style.backgroundColor = 'rgb(88, 82, 74)';
                target.setAttribute('data-tooltip','None');
            }
        }
    }
}


