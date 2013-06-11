Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Actor, Fourway, Color, 2D, Canvas, Keyboard, Collision')
		.fourway(3)
		.color('rgb(70, 20, 70)');
		this.bind('KeyDown', this.Shoot);
		this.onHit('Proj', this.Spawn)
	},
	Shoot: function() {
		if( this.isDown('SPACE')){
			console.log("PEW PEW PEW");
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
		this.requires('2D, Collision, Color, Canvas')
		this.x=20
		this.y=30
		this.w=10
		this.h=10
		this.color('blue')
		//on collide : stop existing
		this.onHit('Collision', function() {
			this.destroy();
		});
		this.bind('EnterFrame', this.Move)
		console.log("Ima shoot you")
	},
	Move: function(){
		this.move('e', 1)
		if (this.x<0 || this.x>800 || this.y<0 || this.y>300) {
			this.destroy();
			console.log("It's gone");
		}
	}
	
	
});

Crafty.c('Vaccum', {
	init: function(){
		this.requires('Collision')
	}
	
});


Game = {
	start: function(){
		Crafty.init(800,300);
		Crafty.background('green');
		var pc = Crafty.e('PlayerCat')
		pc.Spawn()
		Crafty.e('Proj')
	}

	//logic to spawn vaccums

}
		
