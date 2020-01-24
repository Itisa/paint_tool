
var NOTINIT = -100
var mousex=100,mousey=100,fmousex=NOTINIT,fmousey=NOTINIT,fcmousex=NOTINIT,fcmousey=NOTINIT
var if_ctrl=false;inbtn_line=false;ifline=false;
var paint_method='none',mousestatus='up'
var paint_blank_r = 20


function move(ev) {
	
	// console.log(ev);
	mousex = ev.offsetX;
	mousey = ev.offsetY;

	if (if_in_square(mousex,mousey,1300,100,1350,150)) {
		// console.log('hi')
		draw_button_shade(1300,100)
		draw_button_line(1300,100)
		inbtn_line = true
	}
	if (inbtn_line==true) {
		if (!if_in_square(mousex,mousey,1300,100,1350,150)){
			clear_button(1300,100)
			draw_button_line(1300,100)
		}
	}

	switch(paint_method) {
		case 'none':
			break;
		case 'paint_mouse':
			paint_mouse()
			break;
		case 'paint_line':

			// paint_line()
			break;
		case 'paint_blank':
			console.log(fmousex,fmousey)
			ifin = if_in_square(mousex,mousey,1425-paint_blank_r,680-paint_blank_r,paint_blank_r,paint_blank_r)
			if (ifin) {break;}
			if (mousestatus=='down') {
				paint_blank(fmousex,fmousey,1)
				paint_blank(mousex,mousey)
			}
			break;
	}
	fmousex = mousex;
	fmousey = mousey;	
}

function paint_mouse() {
	
	if (fmousex==NOTINIT) {
		fmousex = mousex;
		fmousey = mousey;
	}
	if (mousex>=1240||mousex<=10||mousey<=10||mousey>=670||fmousex>=1240||fmousex<=10||fmousey<=10||fmousey>=670){
		fmousex = NOTINIT
		return;
	}

	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.beginPath();

	c.moveTo(fmousex,fmousey);
	c.lineTo(mousex,mousey);
	c.closePath();
	c.lineWidth = 2;
	c.stroke();
	fmousex = mousex
	fmousey = mousey
}

function paint_line() {
	if (fcmousey==NOTINIT) {fcmousex=mousex;fcmousey=mousey}
	else {
		var canvas = document.getElementById('main');
		var c = canvas.getContext("2d");
		c.beginPath();

		c.moveTo(fcmousex,fcmousey);
		c.lineTo(mousex,mousey);
		c.closePath();
		c.lineWidth = 2;
		c.stroke();
		fcmousex = NOTINIT
		fcmousey = NOTINIT
	}
}

function paint_blank(x,y,type=0) {
	//1 no border
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.beginPath()
	c.lineWidth = 2;
	if (type==1) {
		c.arc(x,y,paint_blank_r+2,0,2*Math.PI);
		c.fillStyle = '#dedede';
		c.fill();
	}
	else{
		c.arc(x,y,paint_blank_r,0,2*Math.PI);
		c.fillStyle = '#dedede';
		c.fill();

		c.stroke();
	}
	
}

function mousedown(ev) {
	mousestatus = 'down';
	// if (if_in_square(mousex,mousey,10,10,1270,640)){
	// 	paint_method = 'paint_mouse';	
	// }
		if (inbtn_line) {
		draw_button_shade(1300,100,'#dddddd')
	}
	switch(paint_method){
		case 'paint_line':
			paint_line()
			break;
		case 'paint_blank':
			paint_blank(mousex,mousey)
			break;
	}
}

function mouseup(ev) {
	mousestatus = 'up';
	switch(paint_method){
		case 'paint_blank':
			paint_blank(mousex,mousey,1)
			break;
	}
	fmousex = NOTINIT;
}

function keydown(ev) {
	var c = ev.keyCode;
	// console.log(ev)
	switch(c){

	case 39:
	case 68://d
		if (paint_method=='none') {paint_method = 'paint_mouse'}
		else {paint_method = 'none'}
		fmousex = NOTINIT
		break;
	case 70://f
		paint_method = 'paint_line';
		break;
	case 69://e
		paint_method = 'paint_blank';
		break;
	case 91://command
		if_ctrl = true;
		break;
	case 67:
		if (if_ctrl==true) {clear_canvas();}
		break;
	}
}

function keyup(ev) {
	var c = ev.keyCode;
	switch(c){
		case 91:
			if_ctrl = false;
			break;

	}
}

function clear_canvas() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	var result = confirm('clear?');
	if (!result) {return;}
	c.clearRect(11,11,1228,658);
	
}

function clear_button(x,y) {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.clearRect(x-5,y-5,55,55)
}

function if_in_square(x,y,sx1,sy1,sx2,sy2) {
	if (x>=sx1&&x<=sx2&&y>=sy1&&y<=sy2) {
		return true;
	}
	else{
		return false;
	}
}


function draw_canvas_border() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.strokeRect(10,10,1230,660);
}	


function draw_button_line(x,y) {
	draw_button_border(x,y)
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.translate(x,y);
	c.beginPath();
	c.moveTo(10,40);
	c.lineTo(40,10);
	c.strokeStyle = 'black'
	c.lineWidth = 4;
	c.stroke();
	c.translate(-x,-y)
}

function draw_button_border(x,y) {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.translate(x,y)
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(0,50);
	c.lineTo(50,50);
	c.lineTo(50,0);
	c.closePath()
	c.strokeStyle = 'red';
	c.lineWidth = 5;
	c.stroke();
	c.translate(-x,-y)
}


function draw_button_shade(x,y,colour='#ffffff') {
	// console.log(x,y)
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	
	c.fillStyle = colour;
	c.fillRect(x,y,50,50);
	c.stroke();
}
draw_canvas_border()
draw_button_line(1300,100)











