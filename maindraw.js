
var NOTINIT = -100
var mousex=100,mousey=100,fmousex=NOTINIT,fmousey=NOTINIT,fcmousex=NOTINIT,fcmousey=NOTINIT,fmmousex=NOTINIT,fmmousey=NOTINIT
var if_ctrl=false;inbtn_line=false;ifline=false;mouse_in_change_linewidth = false;in_canvas=false
var paint_method='none',mousestatus='up'
var paint_blank_r = 30,line_width = 2,line_width_movex=0,mouse_move_x = 0,mouse_move_y = 0
var line_width_fx=1255.6+14.4*2


function move(ev) {
	
	// console.log(ev);
	mousex = ev.offsetX;
	mousey = ev.offsetY;
	draw_canvas_border()
	in_canvas = if_in_square(mousex,mousey,10,10,1240,670)

	if (mouse_in_change_linewidth) {move_linewidth()}

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
			// console.log(fmousex,fmousey)
			ifin = if_in_square(mousex,mousey,1425-paint_blank_r,680-paint_blank_r,paint_blank_r,paint_blank_r)
			if (ifin) {break;}
			if (mousestatus=='down') {
				paint_blank(fmousex,fmousey,1)
				paint_blank(mousex,mousey)
			}
			break;
	}
	mouse_move_x = mousex-fmousex
	if (mouse_in_change_linewidth) {line_width_movex+=mouse_move_x}
	mouse_move_y = mousey-fmousey
	fmousex = mousex;
	fmousey = mousey;
}

function paint_mouse() {
	if (!in_canvas) {return;}
	if (fmousex==NOTINIT) {
		fmousex = mousex;
		fmousey = mousey;
	}
	if (mousex>=1240||mousex<=10||mousey<=10||mousey>=670||fmousex>=1240||fmousex<=10||fmousey<=10||fmousey>=670){
		fmmousex = NOTINIT
		return;
	}

	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.beginPath();

	c.moveTo(fmousex,fmousey);
	c.lineTo(mousex,mousey);
	c.closePath();
	c.lineWidth = line_width;
	c.stroke();
	fmousex = mousex
	fmousey = mousey
}

function paint_line() {
	if (!in_canvas) {return}
	if (fcmousey==NOTINIT) {fcmousex=mousex;fcmousey=mousey}
	else {
		var canvas = document.getElementById('main');
		var c = canvas.getContext("2d");
		c.beginPath();

		c.moveTo(fcmousex,fcmousey);
		c.lineTo(mousex,mousey);
		c.closePath();
		c.lineWidth = line_width;
		c.stroke();
		fcmousex = NOTINIT
		fcmousey = NOTINIT
	}
}

function paint_blank(x,y,type=0) {
	if (!in_canvas){return;}
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.beginPath()
	c.lineWidth = 2;
	if (type==1) {
		var r = parseInt(paint_blank_r)+2
		c.arc(x,y,r,0,2*Math.PI);
		c.fillStyle = '#dedede';
		c.fill();
	}
	else{
		c.arc(x,y,paint_blank_r,0,2*Math.PI);
		c.fillStyle = '#dedede';
		c.fill();

		c.stroke();
	}
	change_lineWidth()
	
}

function move_linewidth() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.clearRect(1270,180,200,100)

	c.beginPath();
	c.moveTo(1270,230);
	c.lineTo(1400,230);
	c.closePath();
	c.stroke();
	var nowx = line_width_fx + line_width_movex
	// console.log(nowx,line_width_movex)
	c.fillStyle = 'blue';
	if (nowx<=1270) {nowx=1270}
	else if (nowx>=1400) {nowx=1400}
	
	c.fillRect(nowx,220,10,20);
	
	var now_line_width = Math.round((nowx-1255.6)/14.4)
	c.font = "20px bold 黑体";
	c.fillStyle = 'black';
	c.fillText('lineWidth:'+now_line_width,1280,200);
	c.font = "15px bold 黑体";
	c.fillText('1',1270,260);
	c.fillText('10',1390,260);
	
	
}

function change_lineWidth() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.clearRect(1270,180,200,100)
	c.font = "20px bold 黑体";
	c.fillStyle = 'black';
	c.fillText('lineWidth:'+line_width,1280,200);
	c.font = "15px bold 黑体";
	c.fillText('1',1270,260);
	c.fillText('10',1390,260);

	c.beginPath();
	c.moveTo(1270,230);
	c.lineTo(1400,230);
	c.closePath();
	c.stroke();

	c.fillStyle = 'blue';
	c.fillRect(1255.6+14.4*line_width,220,10,20)
}

function change_clear_size() {
	paint_blank_r = prompt('newsize?')
}

function mousedown(ev) {
	mousestatus = 'down';
	if (if_in_square(mousex,mousey,1255.6+14.4*line_width,220,1265.6+14.4*line_width,240)){
		// console.log('in');
		mouse_in_change_linewidth = true
		line_width_movex = 0
	}
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
	if (mouse_in_change_linewidth) {
		mouse_in_change_linewidth = false;
		var nowx = line_width_fx+ line_width_movex
		if (nowx<=1270) {nowx=1270}
		else if (nowx>=1400) {nowx=1400}
		line_width = Math.round((nowx-1255.6)/14.4)
		// console.log(line_width)
		line_width_fx = nowx
		change_lineWidth()
	}
	switch(paint_method){
		case 'paint_blank':
			paint_blank(mousex,mousey,1)
			draw_canvas_border()
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
	case 67://c
		if (if_ctrl==true) {clear_canvas();}
		else {change_clear_size()}
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
	c.lineWidth = 2;
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
change_lineWidth()
draw_button_line(1300,100)











