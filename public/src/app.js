var sc = {};

$.get('/slide/', function (slides){
	console.log('slides retreived');
	sc = new SlidesCollection();
	sc.add(slides);
	var pv = new ActivePresentationView({collection: sc});
	pv.render();
	console.log(sc);
});

console.log(sc);

/*
var slides = [{title: "this is the first slide", header: "this is the first header", content: "this is finally the content" },
              {title: "this is the second slide", header: "this is the second header", content: "this is second the content" },
              {title: "this is the third slide", header: "this is the third header", content: "this is third the content" },
              {title: "this is the fourth slide", header: "this is the fourth header", content: "this fourth the content" }, 
              {title: "this is the fourth slide", header: "this is the fourth header", content: "this fifth content" }];

sc = new SlidesCollection();
	sc.add(slides);
	var pv = new ActivePresentationView({collection: sc});
	pv.render();
	console.log(sc);
*/


