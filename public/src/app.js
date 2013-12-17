var sc = new SlidesCollection();
              
$.get('/slide/', function (slides){
	console.log('slides retreived');
	sc.add(slides);
	var pv = new ActivePresentationView({collection: sc});
	pv.render();
	console.log(sc);
});

console.log(sc);


