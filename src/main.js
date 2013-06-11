Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Actor, Fourway, Color, 2D, Canvas, Keyboard')
		.fourway(3)
		.color('rgb(70, 20, 70)');
		this.bind('KeyDown', this.Shoot);
	},
	Shoot: function() {
		console.log("PEW PEW PEW");
	}
	//on collide : lots of stuff
});

Crafty.c('Proj', {
	init: function() {
		
	},
	//on collide : stop existing
});

Crafty.c('Vaccum', {
	//BLAKE!	 
});


Game = {
	start: function(){
		Crafty.init(800,600);
		Crafty.background('green');
		var pc = Crafty.e('PlayerCat')
		pc.x=400
		pc.y=300
		pc.w=30
		pc.h=20
	}

	//logic to spawn vaccums

}
		
