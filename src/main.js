Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Actor, Fourway, Color, 2D, Canvas, Keyboard, Collision')
		.fourway(3)
		.color('rgb(70, 20, 70)');
		this.bind('KeyDown', this.Shoot);
		this.onHit('Proj', this.Spawn)
	},
	Shoot: function() {
		console.log("PEW PEW PEW");
	},
	Spawn: function(){
		this.x=400
		this.y=300
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
	}
	
	
	
});

Crafty.c('Vaccum', {
	init: function(){
		this.requires('Collision')
	}
	
});


Game = {
	start: function(){
		Crafty.init(800,600);
		Crafty.background('green');
		var pc = Crafty.e('PlayerCat')
		pc.Spawn()
		Crafty.e('Proj')
	}

	//logic to spawn vaccums

}
		
