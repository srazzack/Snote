var sc = {};
var slide = {title: "ewdwefsfwf", header: "sadasd", content: "ta tol 3)." };
              
$.get('/slide/', function (slides){
	console.log('slides retreived');
	sc = new SlidesCollection();
	sc.add(slides);
	var pv = new ActivePresentationView({collection: sc});
	pv.render();
	console.log(sc);
});

$.post('/slide/', function (slides){
	sc.add(slides);
	pv.render();
	console.log('slide posted');
	console.log(slides);
});

console.log(sc);


