Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Actor, Fourway, Color, 2D, Canvas')
		.fourway(3)
		.color('rgb(70, 20, 70)');
	},
	
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

Crafty.c()


Game = {
	start: function(){
		Crafty.init(800,600);
		Crafty.background('green');
		var pc = Crafty.e('PlayerCat')
		pc.x=400
		pc.y=300
		pc.w=15
		pc.h=30
	}

	//logic to spawn vaccums

}
		
