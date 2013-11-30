$.get('/slide/', function (slides){
	console.log('slides retreived');
	var sc = new SlidesCollection();
	sc.add(slides);
	var pv = new ActivePresentationView({collection: sc});
	pv.render();
});
	






