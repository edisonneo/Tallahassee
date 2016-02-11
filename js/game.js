//Sprite Collision Detection 
function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};



//
//Sounds
//
function zombieSound(){
	var zsound = document.createElement("audio");
	zsounds = ['audio/zombie1.wav','audio/zombie2.wav','audio/zombie3.wav','audio/zombie4.wav','audio/zombie5.ogg'];
	var randzsound = zsounds[Math.floor(Math.random() * zsounds.length)];
	zsound.src = randzsound;
	zsound.addEventListener('ended',function(){
		document.removeChild(this);
	},false);
	zsound.volume = 0.3;
	zsound.play();
}


function gunShot(){
        var gunshot = document.createElement("audio");
        gunshot.src = "audio/gunshot.wav";
        gunshot.addEventListener("ended", function () {
            document.removeChild(this);
        }, false);
        gunshot.volume = 0.2;
        gunshot.play();   
    }






//
//Bullets
//
//Create Bullet Object
function Bullet(x, y, vely, w, h, color) {
	this.x = x;
	this.y = y;
	this.vely = vely;
	this.width = w;
	this.height = h;
	this.color = color;
};
//Update Bullet Position
Bullet.prototype.update = function() {
	this.y += this.vely;
};
//Draw Bullet to canvas
Screen.prototype.drawBullet = function(bullet) {
	// set the current fillstyle and draw bullet
	this.ctx.fillStyle = bullet.color;
	this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
};





//
//Player Sprite
//
//Create Player Object
function Player(x,y,w,h,color){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
}
//Draw Player to canvas
Screen.prototype.drawPlayer = function(player){
	this.ctx.fillStyle = player.color;
	this.ctx.fillRect (player.x,player.y,player.w,player.h);
}





//
//Enemy Sprite
//
//Create Enemy Object
function Enemy(x, y, vely, velx, w, h, color) {
	this.x = x;
	this.y = y;
	this.vely = vely;
	this.velx = velx;
	this.width = w;
	this.height = h;
	this.color = color;
};
//Update Enemy Position
Enemy.prototype.update = function() {
	this.y += this.vely;
	this.x += this.velx;
};
//Draw Enemy to canvas
Screen.prototype.drawEnemy = function(enemy) {
	// set the current fillstyle and draw enemy
	this.ctx.fillStyle = enemy.color;
	this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
};








//Create Safezone object
function Safezone(x, y, w, h, color){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
}
//Draw Safezone to canvas
Screen.prototype.drawSafezone = function(safezone){
	this.ctx.fillStyle = safezone.color;
	this.ctx.fillRect(safezone.x,safezone.y,safezone.w,safezone.h);
}









//Create Canvas object
function Screen(width, height) {
	// create canvas and grab 2d context
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.ctx = this.canvas.getContext("2d");
	// append canvas to body of document
	document.body.appendChild(this.canvas);
};
//Clear Canvas 
Screen.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};






//
//Input Handler (handles inputs of keyboard keys)
//
//Create Input handler object
function InputHandler() {
	this.down = {};
	this.pressed = {};
	// capture key presses
	var _this = this;
	document.addEventListener("keydown", function(evt) {
		_this.down[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete _this.down[evt.keyCode];
		delete _this.pressed[evt.keyCode];
	});
};
//Check if key input is being held down (continuous)
InputHandler.prototype.isDown = function(code) {
	return this.down[code];
};
//Check if key input is pressed (once)
InputHandler.prototype.isPressed = function(code) {
	// if key is registered as pressed return false else if
	// key down for first time return true else return false
	if (this.pressed[code]) {
		return false;
	} else if (this.down[code]) {
		return this.pressed[code] = true;
	}
	return false;
};

