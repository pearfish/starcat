Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Fourway, Color, 2D, Canvas, Keyboard,  Collision')
		.fourway(2)
		.color('rgb(70, 20, 70)');
		this.bind('KeyDown', this.Shoot);
		this.onHit('Vacuum', this.GameOver);
	},
	Shoot: function() {
		if( this.isDown('SPACE')){
			var p = Crafty.e('Proj');
			p.x= this.x+30;
			p.y = this.y+5;
		}
	},
	Spawn: function(){
		this.x=300
		this.y=150
		this.w=30
		this.h=20
	},
	GameOver: function() {
		Crafty.scene("gameover");
	}
	//on collide : lots of stuff
});

Crafty.c('Proj', {
	init: function() {
		this.requires('2D, Canvas, Color, Collision')//DOM, Image,
		//this.image('assets/img/Fish.png')
		this.color('red')
		this.w=10
		this.h=10
		this.bind('EnterFrame', this.Move)
	},
	Move: function(){
		this.move('e', 2)
		if (this.x<0 || this.x>800 || this.y<0 || this.y>300) {
			this.destroy();
		}
	}
});

Crafty.c('Vacuum', {
	init: function(){
		this.requires('Color, 2D, Canvas, Collision');
		this.w=20;
		this.h=20;
		this.x=850;
		this.y=150;
		this.color('blue');
		this.onHit('Proj', this.Boom);
		this.bind('EnterFrame', this.Move);
	},
	Move: function(){
		//move to the left (west) by 1 each frame
		this.move('w', 1);
		
		//destroy it if it goes off screen
		if (this.x<0 || this.x>900 || this.y<0 || this.y>300) {
			this.destroy();
		}
	},
	Boom: function(hits) {
		console.log("boom! " +hits);
		//fireball sprite!
		this.destroy();
		//hits[0].destroy()
		scoreboard.increaseKills();
		scoreboard.increaseScore('vacuum');
	}
});

Crafty.c('Score', {
	init: function() {
		this.requires('2D, DOM, Text');
		
		this.kills = 0;
		this.score = 0;
		
		this.textColor('#FFFFFFF');
		this.x=735;
		this.y=10;
		this.h=20;
		this.w=100;
		this.text("kills-   "+this.kills+"<br>score- "+this.score);
		console.log('quack');
	},
	increaseKills: function() {
		this.kills++;
		this.text("kills-   "+this.kills+"<br>score- "+this.score);
		console.log(this.kills);
	},
	increaseScore: function(enemy) {
		switch (enemy) {
		case 'asteroid':
			this.score+=100;
			break;
		case 'vacuum':
			this.score+=500;
			break;
		case 'boss':
			this.score+=5000;
			break;
		}
		this.text("kills-   "+this.kills+"<br>score- "+this.score);
		console.log(this.score);
	},
	nextlvl: function() {
		this.kills = 0;
		this.score += 5000;
	}

});

Crafty.scene("start", function() {
	//add a title to DOM
	Crafty.e("2D, DOM, Text").attr({ w: 150, h: 50, x: 150, y: 120 })
            .text("S T A R C A T")
            .css({ "text-align": "center", "color": "white", "font-size": "25px"});
	
	//add instructions to DOM
	Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 400, y: 100 })
            .text("control the cat with <em>WASD</em> or <em>arrow keys</em><br>fire your anti-vacuum munitions with the <em>space key</em><br>defeat the <em>vacuum menace</em>")
            .css({ "color": "white", "font-size": "10px"});
	
	//should eventually set the background to a funny starcat picture, but when this happens, make sure to set background to something else in scene(game)
	
	//add more instructions, bind a listener to switch scene
	var startbox = Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 600, y: 250 })
            .text("Click here to start!")
            .css({ "text-align": "center", "color": "white" });
	//this could probably be done more smoothly but whatever
	startbox.switchScene = function() {
		Crafty.scene("game");
	};
	Crafty.addEvent(startbox, Crafty.stage.elem, "mousedown", startbox.switchScene);
});

Crafty.scene("gameover", function() {
	Crafty.e("2D, DOM, Text").attr({ w: 200, h: 200, x: 300, y:100})
		.text("<em>YOU DIED.  Yay!</em><br><br>Score:<br>"+"13"+" vacuums annihilated")
		.css({ "text-align": "center", "color": "white" });
	
	var startbox = Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 600, y: 250 })
            .text("Click here to try again!")
            .css({ "text-align": "center", "color": "white" });
	//this could probably be done more smoothly but whatever
	startbox.switchScene = function() {
		Crafty.scene("game");
	};
	Crafty.addEvent(startbox, Crafty.stage.elem, "mousedown", startbox.switchScene);	
});

Crafty.scene("game", function() {
	//generate the player's avatar

	pc = Crafty.e('PlayerCat');
	pc.Spawn();

	scoreboard = Crafty.e('Score');
	scoreboard.init();
	//bind vaccum spawning to the game tick
	pc.bind('EnterFrame', Game.spawnVac);
	
	
	Crafty.e("2D,DOM,FPS,Text").attr({maxValues:10, x:0, y:0}).textColor('#ffff00').bind("MessureFPS",function(fps){ 
			this.text("FPS"+fps.value); //Display Current FPS 
	})
});

Game = {
	start: function(){
		Crafty.init(800,300);
		Crafty.background("url('assets/img/starcat_background.png')"); 
		Crafty.scene("start");		
		//generate the player's avatar
		var pc = Crafty.e('PlayerCat')
		pc.Spawn();		
	},
	
	//vacuums are spawned every 100 frames at a random Y coordinate 
	spawnVac: function(data){
		if( data['frame'] % 100 == 0){
			var vroom = Crafty.e('Vacuum');
			vroom.y=Math.random()*250+25;
		}
	}
}
		
