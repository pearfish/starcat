// psuedo-statics
CANVAS_WIDTH = 800
CANVAS_HEIGHT = 300
OOB_DOWN = CANVAS_HEIGHT * 1.5
OOB_UP = CANVAS_HEIGHT * -.5
OOB_LEFT = 0
OOB_RIGHT = CANVAS_WIDTH * 1.3

//
Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Fourway, Color, 2D, Canvas, Keyboard, Image, Collision')
		.fourway(2)
		this.bind('KeyDown', this.Shoot);
		this.hitbox = Crafty.e("Fourway, 2D, DOM, Collision").attr({ w: 4, h: 4, x: 313, y:158})
			.fourway(2)
			.onHit('Enemy', this.GameOver);
		this.image('assets/img/spacecat_tiny.png');
		
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
		this.requires('2D, Canvas, Color, Collision, Image')//DOM, Image,
		this.image('assets/img/Fish.png')
		//this.attr({w: 10, h: 10})
		this.bind('EnterFrame', this.Move)
	}, 
	Move: function(){
		this.move('e', 2)
		
		if (this.x<0 || this.x>800 || this.y<0 || this.y>300) {
			this.destroy();
		}
	}
});

Crafty.c('Enemy', {
	init: function(){
		this.requires('Color, 2D, Canvas, Collision');
		this.x=850;
		this.onHit('Proj', this.Boom);
		//this.bind('EnterFrame', function(){this.Move});
		this.score = 'Error no score'
		this.bind('EnterFrame', this.OutOfBoundsSelfDestruct);
		
	},
	Boom: function(hits) {
		console.log("boom! " +hits);
		//fireball sprite!
		this.destroy();
		//hits[0].destroy()
		scoreboard.increaseKills();
		scoreboard.increaseScore(this.score);
	},
	OutOfBoundsSelfDestruct: function(){
		//destroy it if it goes off screen
		if (this.x<OOB_LEFT || this.x>OOB_RIGHT || this.y<OOB_UP || this.y>OOB_DOWN) {
			this.destroy();
		}
	}
	
});

Crafty.c('Vacuum', {
	init: function(){
		this.requires('Color, 2D, Canvas, Collision, Enemy, Image');
		this.w=20;
		this.h=20;
		this.x=850;
		this.y=Math.random()*250+25;
		this.score = 500;
		this.bind('EnterFrame', function(){
			this.move('w', 1);
		});
		this.image('assets/img/starcat_vacuum_tiny.png');
	},
});

Crafty.c('Asteroid', {
	init: function(){
		this.requires('Color, 2D, Canvas, Collision, Enemy');
		this.w=(Math.random()+Math.random()) * 20;
		this.h=(Math.random()+Math.random()) * this.h;
		this.x=850;
		this.y=Math.random()*250+25;
		this.bind('EnterFrame', function(){
			this.move('w', 1);
		});
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
	increaseScore: function(amount) {
		this.score+=amount
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

Crafty.scene("gameover", function() {
	Crafty.e("2D, DOM, Text").attr({ w: 200, h: 200, x: 300, y:100})
		.text("<em>YOU DIED.  Yay!</em><br><br>Score:<br>"+scoreboard.kills+" vacuums annihilated")
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



Game = {
	start: function(){
		Crafty.init(CANVAS_WIDTH,CANVAS_HEIGHT);
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
		}
	}
}
		
