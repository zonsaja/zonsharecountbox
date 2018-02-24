/*
 * Before minification:
 * change zonsharecountbox.js to zonsharecountbox.min.js
 */
javascript:
(function(o,d,h,s,t,c,i,u) {
	/* OPTIONS begin */
	o.Facebook = 'yes';
	o.Twitter = 'yes';
	o.Google = 'yes';
	o.Pinterest = 'no';
	o.Reddit = 'no';
	o.ColorTheme = 'dark';
	o.Position = 'right-middle';
	o.Orientation = 'vertical';
	o.zIndex = '1234567890';
	/* OPTIONS end */
	window.zscbOptions = o;
	var f = d.getElementsByTagName(s)[0], h = d.head || d.getElementsByTagName(h)[0], z = d.createElement(s);
	z.type = t;
	z.charset = c;
	z.id = i;
	z.src = u;
	try {
		f.parentNode.insertBefore(z, f);
	} catch(e) {
		h.appendChild(z);
	}
})({},document,'head','script','text/javascript','utf-8','zscb-app','https://zonsaja.github.io/zonsharecountbox/js/zonsharecountbox.js');
