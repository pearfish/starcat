Crafty.c('PlayerCat', {
	init: function() {
		this.requires('Actor, Fourway, Color, 2D, Canvas')
		.fourway(3)
		.color('rgb(70, 20, 70)');
	}
});

Game = {
	start: function(){
		Crafty.init(800,600);
		Crafty.background('green');
		var pc = Crafty.e('PlayerCat')
		pc.x=400
		pc.y=300
		pc.w=10
		pc.h=20
	}
}
		
