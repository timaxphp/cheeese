$(function(){

	var paths = $('#preloader path[clip-path]'),
	tl = new TimelineMax({delay: 1.1, repeat: -1, repeatDelay:0.5});

	for (var i = 0; i < paths.length; i++) {
		paths[i].style.strokeDasharray = paths[i].style.strokeDashoffset
		= paths[i].getTotalLength();
	}

	tl.to(paths[0], 0.35, {strokeDashoffset: 0, ease: Power1.easeIn}) //C
	.to(paths[1], 0.1, {strokeDashoffset: 0}) //h
	.to(paths[2], 0.1, {strokeDashoffset: 0}) //h
	.to(paths[3], 0.27, {strokeDashoffset: 0, ease: Power1.easeOut}) //h
	.to(paths[4], 0.1, {strokeDashoffset: 0}) //e1
	.to(paths[5], 0.2, {strokeDashoffset: 0}) //e1
	.to(paths[6], 0.1, {strokeDashoffset: 0}) //e2
	.to(paths[7], 0.2, {strokeDashoffset: 0}) //e2
	.to(paths[8], 0.1, {strokeDashoffset: 0}) //e3
	.to(paths[9], 0.2, {strokeDashoffset: 0}) //e3
	.to(paths[10], 0.1, {strokeDashoffset: 0}) //s
	.to(paths[11], 0.2, {strokeDashoffset: 0}) //s
	.to(paths[12], 0.2, {strokeDashoffset: 0}) //s
	.to(paths[13], 0.1, {strokeDashoffset: 0}) //e
	.to(paths[14], 0.2, {strokeDashoffset: 0}) //e
});

$(window).on('load', function(){
	$('#preloader').hide();
})
