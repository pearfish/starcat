Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Fourway, Color, 2D, Canvas, Keyboard,  Collision')
		.fourway(2)
		.color('rgb(70, 20, 70)');
		this.bind('KeyDown', this.Shoot);
		this.onHit('Vacuum', this.Spawn)
	},
	Shoot: function() {
		if( this.isDown('SPACE')){
			var p = Crafty.e('Proj');
			p.x= this.x+30;
			p.y = this.y;
		}
	},
	Spawn: function(){
		this.x=300
		this.y=150
		this.w=30
		this.h=20
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
		this.move('w', 1)
		if (this.x<0 || this.x>900 || this.y<0 || this.y>300) {
			this.destroy();
		}
	},
	Boom: function(hits) {
		console.log("boom! " +hits);
		//fireball sprite!
		this.destroy();
		//hits[0].destroy()
	}
});


Game = {
	start: function(){
		Crafty.init(800,300);
		Crafty.background("url('assets/img/starcat_background.png')"); 
		var pc = Crafty.e('PlayerCat')
		pc.Spawn()
		pc.bind('EnterFrame', Game.spawnVac);
	},
	spawnVac: function(data){
		if( data['frame'] % 100 == 0){
			var vroom = Crafty.e('Vacuum');
			vroom.y=Math.random()*250+25;
		}
	}
	//logic to spawn vaccums

}
		
