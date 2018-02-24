/*!
 * zonShareCountBox 1.0 (2014.05)
 * Copyright (C) 2014 - Zon Saja - zonsaja@gmail.com - http://zonsaja.blogspot.com
 * License: CC-BY-SA 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 */

/*
 * Before minification:
 * change sCssFileUrl to use .min version
 */


//jquery.documentReady.js - https://github.com/addyosmani/jquery.parts/blob/master/jquery.documentReady.js
//For IE8 - HTML Parsing Error: Unable to modify the parent container element before the child element is closed (KB927917)
(function(window) {
	try {
		window.$.fn.jquery;
		return;
	} catch(e) {
	}
	var $ = function(callback) {
			readyBound = false;
			$.isReady = false;
			if (typeof callback === "function") {
				DOMReadyCallback = callback;
			}
			bindReady();
		},
		document = window.document,
		readyBound = false,
		DOMReadyCallback = function() {},
		DOMContentLoaded = function() {
			if (document.addEventListener) {
					document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
			} else {
					document.detachEvent("onreadystatechange", DOMContentLoaded);
			}
			DOMReady();
		},
		DOMReady = function() {
			if (!$.isReady) {
				if (!document.body) {
					return setTimeout(DOMReady, 1);
				}
				$.isReady = true;
				DOMReadyCallback();
			}
		},
		bindReady = function() {
			var toplevel = false;
			if (readyBound) {
				return;
			}
			readyBound = true;
			if (document.readyState !== "loading") {
				DOMReady();
			}
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
				window.addEventListener("load", DOMContentLoaded, false);
			} else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", DOMContentLoaded);
				window.attachEvent("onload", DOMContentLoaded);
				try {
					toplevel = window.frameElement == null;
				} catch (e) {}
				if (document.documentElement.doScroll && toplevel) {
					doScrollCheck();
				}
			}
		},
		doScrollCheck = function() {
			if ($.isReady) {
				return;
			}
			try {
				document.documentElement.doScroll("left");
			} catch (error) {
				setTimeout(doScrollCheck, 1);
				return;
			}
			DOMReady();
		};
	$.isReady = false;
	window.$ = $;
})(window);



(function($) {

	// var,helper,common
	var oWin = window,
		oDoc = document,
		eHead = oDoc.head || oDoc.getElementsByTagName('head')[0],
		eBody = oDoc.body || oDoc.getElementsByTagName('body')[0],
		eRoot = oDoc.documentElement || eBody.parentNode || eBody,
		eFirstScript = oDoc.getElementsByTagName('script')[0],
		eFirstImg = oDoc.getElementsByTagName('img')[0],
		sFirstImgSrc,
		sFirstImgEncSrc,
		sDocTitle = oDoc.title || '',
		sDocEncTitle = encodeURIComponent(sDocTitle),
		sDocLoc = location.href,
		sShareUrl,
		sEncShareUrl,
		sProtocol = document.location.protocol,
		bSupportedProtocol = Boolean( (sProtocol === 'http:') || (sProtocol === 'https:') || (sProtocol === 'ftp:')  || (sProtocol === 'ftps:') ),
		bSecureProtocol = Boolean( (sProtocol === 'https:') || (sProtocol === 'ftps:') ),
		sZscbWrapperId = 'zscb-wrapper',
		eZscbWrapper,
		sCssLinkId = 'zscb-style',
		sCustomCssLinkId = 'zscb-custom-style',
		bFacebook,
		bTwitter,
		bGoogle,
		bReddit,
		bPinterest,
		sColorTheme,
		sPosition,
		sOrientation,
		iZIndex,
		bShowScroll,
		sCustomCssFileUrl,
		sCssFileUrl,
		aSBSeps = [],
		aSBBoxes = [],
		iTotalBoxWidth = 0,
		iTotalBoxHeight = 0,
		L = unescape('%3C'),
		G = unescape('%3E'),
		Q = unescape('%22'),
		A = unescape('%27'),
		zZ;
	sFirstImgSrc = (eFirstImg) ? eFirstImg.src : '';
	sFirstImgEncSrc = encodeURIComponent(sFirstImgSrc);

	function doGetShareUrl() {
		var sCanoHref, eLink, oLinks = document.getElementsByTagName('link');
		for (var i = 0; eLink = oLinks[i]; i++) {
			if (eLink.getAttribute('rel') === 'canonical') {
				sCanoHref = eLink.getAttribute("href");
			}
		}
		sShareUrl = (sCanoHref) ? sCanoHref : sDocLoc;
		sEncShareUrl = encodeURIComponent(sShareUrl);
	}

	function doCreateLinkElement(sHref,sRel,sType,sId,sMedia) {
		var eLink = document.createElement('link');
		eLink.href = sHref;
		eLink.rel = sRel;
		eLink.type = sType;
		if (sId) { eLink.id = sId; }
		if (sMedia) { eLink.media = sMedia; }
		eFirstScript.parentNode.insertBefore(eLink,eFirstScript);
	}
	function doRemoveElement(eElm) {
		try {
			eElm.parentNode.removeChild(eElm);
		} catch (e) {
			eElm.style.display = 'none';
		}
	}
	function doMakeObjectTransparent() {
		function doDoMakeObjectTransparent(sObject) {
			var i, eObject;
			for (i = 0; eObject = oDoc.getElementsByTagName(sObject)[i]; i++) {
				eObject.allowTransparency = 'true';
				eObject.setAttribute('allowTransparency','true');
			}
		}
		var aObject = ['iframe','embed','object'], i, sObject;
		for (i = 0; sObject = aObject[i]; i++) {
			doDoMakeObjectTransparent(sObject);
		}
	}
	function doCreateSBSeparator(sSBSepId) {
		var eSBSep = oDoc.createElement('div');
		eSBSep.id = sSBSepId;
		eSBSep.className = 'zscb-sb-sep';
		eZscbWrapper.appendChild(eSBSep);
		aSBSeps.push(eSBSep);
	}
	function doCreateSBOuterInnerBox(sSBOuterboxId,sSBInnerboxId) {
		var eSbOuterbox = oDoc.createElement('div');
		eSbOuterbox.id = sSBOuterboxId;
		eSbOuterbox.className = 'zscb-sb-outerbox';
		eZscbWrapper.appendChild(eSbOuterbox);
		aSBBoxes.push(eSbOuterbox);
		var eSbInnerbox = oDoc.createElement('div');
		eSbInnerbox.id = sSBInnerboxId;
		eSbInnerbox.className = 'zscb-sb-innerbox';
		eSbOuterbox.appendChild(eSbInnerbox);
		return eSbInnerbox;
	}



	// wrapper
	function doCreateWrapper() {
		if (oDoc.getElementById(sZscbWrapperId)) {
			doRemoveElement(oDoc.getElementById(sZscbWrapperId));
		}
		eZscbWrapper = oDoc.createElement('div');
		eZscbWrapper.id = 'zscb-wrapper';
		eZscbWrapper.className = 'zscb-'+sColorTheme+' zscb-'+sPosition+' zscb-'+sOrientation;
		eZscbWrapper.style.position = 'absolute';
		eZscbWrapper.style.position = 'fixed';
		eZscbWrapper.style.zIndex = iZIndex;
		eBody.insertBefore(eZscbWrapper,eBody.firstChild);
	}

	// close
	function doCreateCloseButton() {
		var eZscbClose = oDoc.createElement('div');
		eZscbClose.id = 'zscb-close';
		eZscbWrapper.appendChild(eZscbClose);
		eZscbClose.innerHTML = ''+L+'span class='+Q+'zscb-abs-center'+Q+''+G+'X'+L+'/span'+G+'';
		eZscbClose.title = 'Close';
		eZscbClose.onclick = function() {
			doRemoveElement(eZscbWrapper);
		};
	}

	// credit
	function doCreateCreditButton() {
		var eZscbCredit = oDoc.createElement('div');
		eZscbCredit.id = 'zscb-credit';
		eZscbWrapper.appendChild(eZscbCredit);
		eZscbCredit.innerHTML = ''+L+'span class='+Q+'zscb-abs-center'+Q+''+G+'?'+L+'/span'+G+'';
		eZscbCredit.title = ' zonShareCountBox \n Share this widget/bookmarklet ';
		eZscbCredit.onclick = function() {
			window.open('http://www.zonsaja.blogspot.com/p/zonsharecountbox.html');
		};
	}

	// Facebook
	function doCreateFacebookButton() {
		//doCreateSBSeparator('zscb-fbk-sb-sep');
		var eFbkInnerbox = doCreateSBOuterInnerBox('zscb-fbk-outerbox','zscb-fbk-innerbox');
		eFbkInnerbox.style.width = '50px';
		eFbkInnerbox.style.height = '86px';
		if (sOrientation === 'vertical') {
			iTotalBoxWidth = 10 + 70 + 10;
			iTotalBoxHeight = iTotalBoxHeight + 10 + 5+86+5;
		} else {
			iTotalBoxWidth = iTotalBoxWidth + 10 + 70 + 10;
			iTotalBoxHeight = 10 + 100 + 10;
		}
		var eFbkBtn = oDoc.createElement('iframe');
		eFbkBtn.src = 'https://www.facebook.com/plugins/like.php?href='+sEncShareUrl+'&locale=en_US&width=&layout=box_count&action=like&show_faces=false&share=true&height=';
		eFbkBtn.scrolling = 'no';
		eFbkBtn.setAttribute('scrolling','no');
		eFbkBtn.allowTransparency = 'true';
		eFbkBtn.setAttribute('allowTransparency','true');
		eFbkBtn.frameborder = '0';
		eFbkBtn.setAttribute('frameborder','0');
		var oFbkBtnStyle = eFbkBtn.style;
		oFbkBtnStyle.width = '50px';
		oFbkBtnStyle.height = '86px';
		eFbkInnerbox.appendChild(eFbkBtn);
	}

	// Twitter
	function doCreateTwitterButton() {
		//doCreateSBSeparator('zscb-twt-sb-sep');
		var eTwtInnerbox = doCreateSBOuterInnerBox('zscb-twt-outerbox','zscb-twt-innerbox');
		eTwtInnerbox.style.width = '60px';
		eTwtInnerbox.style.height = '62px';
		if (sOrientation === 'vertical') {
			iTotalBoxWidth = 10 + 70 + 10;
			iTotalBoxHeight = iTotalBoxHeight + 10 + 5+62+5;
		} else {
			iTotalBoxWidth = iTotalBoxWidth + 10 + 70 + 10;
			iTotalBoxHeight = 10 + 100 + 10;
		}
		var eTwtBtn = oDoc.createElement('iframe');
		eTwtBtn.src = 'https://platform.twitter.com/widgets/tweet_button.html?url='+sEncShareUrl+'&text='+sDocEncTitle+'&lang=en&count=vertical';
		eTwtBtn.scrolling = 'no';
		eTwtBtn.setAttribute('scrolling','no');
		eTwtBtn.allowTransparency = 'true';
		eTwtBtn.setAttribute('allowTransparency','true');
		eTwtBtn.frameborder = '0';
		eTwtBtn.setAttribute('frameborder','0');
		var oTwtBtnStyle = eTwtBtn.style;
		oTwtBtnStyle.width = '60px';
		oTwtBtnStyle.height = '62px';
		eTwtInnerbox.appendChild(eTwtBtn);
	}

	// Google
	function doCreateGoogleButton() {
		//doCreateSBSeparator('zscb-ggl-sb-sep');
		var eGglInnerbox = doCreateSBOuterInnerBox('zscb-ggl-outerbox','zscb-ggl-innerbox');
		eGglInnerbox.style.width = '50px';
		eGglInnerbox.style.height = '60px';
		if (sOrientation === 'vertical') {
			iTotalBoxWidth = 10 + 70 + 10;
			iTotalBoxHeight = iTotalBoxHeight + 10 + 5+60+5;
		} else {
			iTotalBoxWidth = iTotalBoxWidth + 10 + 70 + 10;
			iTotalBoxHeight = 10 + 100 + 10;
		}
		window.___gcfg = {lang:'en-US'};
		var eGglBtn = oDoc.createElement('div');
		eGglBtn.className = 'g-plusone';
		eGglBtn.setAttribute('data-size','tall');
		eGglInnerbox.appendChild(eGglBtn);
		(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/platform.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();
	}

	// Pinterest
	function doCreatePinterestButton() {
		//doCreateSBSeparator('zscb-pnt-sb-sep');
		var ePntInnerbox = doCreateSBOuterInnerBox('zscb-pnt-outerbox','zscb-pnt-innerbox');
		ePntInnerbox.style.width = '56px';
		ePntInnerbox.style.height = '68px';
		if (sOrientation === 'vertical') {
			iTotalBoxWidth = 10 + 70 + 10;
			iTotalBoxHeight = iTotalBoxHeight + 10 + 5+68+5;
		} else {
			iTotalBoxWidth = iTotalBoxWidth + 10 + 70 + 10;
			iTotalBoxHeight = 10 + 100 + 10;
		}
		var ePntVspacer = oDoc.createElement('span'), oPntVspacerStyle = ePntVspacer.style;
		ePntVspacer.id = 'zscb-pnt-vspacer';
		oPntVspacerStyle.display = 'inline-block';
		oPntVspacerStyle.verticalAlign = 'bottom';
		oPntVspacerStyle.width = '0';
		oPntVspacerStyle.height = '68px';
		ePntInnerbox.appendChild(ePntVspacer);
		var ePntBtn = oDoc.createElement('a');
		ePntBtn.href = 'https://www.pinterest.com/pin/create/button/?url='+sEncShareUrl+'&media='+sFirstImgEncSrc+'&description='+sDocEncTitle+'';
		ePntBtn.setAttribute('data-pin-do','buttonPin');
		ePntBtn.setAttribute('data-pin-config','above');
		ePntBtn.setAttribute('data-pin-color','red');
		ePntBtn.setAttribute('data-pin-height','28');
		ePntBtn.innerHTML = ''+L+'img src='+Q+'https://assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png'+Q+' /'+G+'';
		ePntInnerbox.appendChild(ePntBtn);
		(function() {
			var sPntScriptId = 'zscb-pnt-script';
			//if (oDoc.getElementById(sPntScriptId)) { return; }
			var p = document.createElement('script');
			p.id = sPntScriptId;
			p.type = 'text/javascript';
			p.async = true;
			p.src = 'https://assets.pinterest.com/js/pinit.js';
			var f = document.getElementsByTagName('script')[0];
			f.parentNode.insertBefore(p, f);
		})();
	}

	//	Reddit
	function doCreateRedditButton() {
		//doCreateSBSeparator('zscb-rdt-sb-sep');
		var eRdtInnerbox = doCreateSBOuterInnerBox('zscb-rdt-outerbox','zscb-rdt-innerbox');
		eRdtInnerbox.style.width = '50px';
		eRdtInnerbox.style.height = '68px';
		if (sOrientation === 'vertical') {
			iTotalBoxWidth = 10 + 70 + 10;
			iTotalBoxHeight = iTotalBoxHeight + 10 + 5+68+5;
		} else {
			iTotalBoxWidth = iTotalBoxWidth + 10 + 70 + 10;
			iTotalBoxHeight = 10 + 100 + 10;
		}
		var sRdtBaseUrl = (bSecureProtocol) ? 'https://redditstatic.s3.amazonaws.com' : 'http://www.reddit.com/static';
		var eRdtBtn = oDoc.createElement('iframe');
		eRdtBtn.src = ''+sRdtBaseUrl+'/button/button2.html?width=51&url='+sEncShareUrl+'&newwindow=1';
		eRdtBtn.scrolling = 'no';
		eRdtBtn.setAttribute('scrolling','no');
		eRdtBtn.allowTransparency = 'true';
		eRdtBtn.setAttribute('allowTransparency','true');
		eRdtBtn.frameborder = '0';
		eRdtBtn.setAttribute('frameborder','0');
		var oRdtBtnStyle = eRdtBtn.style;
		oRdtBtnStyle.width = '50px';
		oRdtBtnStyle.height = '68px';
		eRdtInnerbox.appendChild(eRdtBtn);
	}

	// reveal
	function doRevealWrapper() {
			/*
		var iBoxElementsLength = aSBBoxes.length,
		if ( (iBoxElementsLength > 1) && (sOrientation === 'horizontal') ) {
			for (var i = 0, eBoxElement; eBoxElement = aSBBoxes[i]; i++) {
				eBoxElement.style.marginRight = '5px';
				eBoxElement.style.marginLeft = '5px';
			}
			aSBBoxes[0].style.marginLeft = '10px';
			aSBBoxes[aSBBoxes.length-1].style.marginRight = '10px';
		}
		//	*/
		var oZscbWrapperStyle = eZscbWrapper.style;
		if (sPosition === 'right-top') {
			oZscbWrapperStyle.width = 'auto';
			oZscbWrapperStyle.height = 'auto';
		} else if (sPosition === 'right-middle') {
			oZscbWrapperStyle.width = 'auto';
			if (sOrientation === 'vertical') {
				oZscbWrapperStyle.height = 1 + iTotalBoxHeight + 10 + 1 + 'px';
			} else if (sOrientation === 'horizontal') {
				oZscbWrapperStyle.height = 1 + iTotalBoxHeight + 1 + 'px';
			}
		} else if (sPosition === 'right-bottom') {
			oZscbWrapperStyle.width = 'auto';
			oZscbWrapperStyle.height = 'auto';
		}
		eZscbWrapper.style.display = 'block';
	}

	// generate
	function doGenerate() {
		if (! oDoc.getElementById(sCssLinkId)) {
			doCreateLinkElement(sCssFileUrl,'stylesheet','text/css',sCssLinkId);
		}
		if (sCustomCssFileUrl) {
			doCreateLinkElement(sCustomCssFileUrl,'stylesheet','text/css',sCustomCssLinkId);
		}
		doMakeObjectTransparent();
		doCreateWrapper();
		doGetShareUrl();
		if (bFacebook) { doCreateFacebookButton(); }
		if (bTwitter) { doCreateTwitterButton(); }
		if (bGoogle) { doCreateGoogleButton(); }
		if (bPinterest) { doCreatePinterestButton(); }
		if (bReddit) { doCreateRedditButton(); }
		doCreateCloseButton();
		doCreateCreditButton();
		doRevealWrapper();
	}

	// global
	window.zonShareCountBox = function(o) {

		if (! bSupportedProtocol) {
			return;
		}

		var o = (typeof o === 'object') ? o : {},
			bOptFbk = o.Facebook || o.facebook,
			bOptTwt = o.Twitter || o.twitter,
			bOptGgl = o.Google || o.google,
			bOptRdt = o.Reddit || o.reddit,
			bOptPnt = o.Pinterest || o.pinterest,
			sOptColor = o.Color_Theme || o.ColorTheme || o.colorTheme,
			sOptPos = o.Position || o.position,
			sOptOrient = o.Orientation || o.orientation,
			iOptZ = o.Z_Index || o.zIndex || o.ZIndex,
			//bOptScroll = o.Scroll_Buttons || o.scrollButtons || o.ScrollButtons,
			sOptCustCss = o.Custom_CSS_File || o.customCSSFile || o.CustomCSSFile || o.customCssFile,
			sOptCss = o.CSS_File || o.CSSFile || o.cssFile || o.CssFile,
			zZ;

		bFacebook = Boolean(! (bOptFbk === false || bOptFbk === 'false' || bOptFbk === 'no') );
		bTwitter = Boolean(! (bOptTwt === false || bOptTwt === 'false' || bOptTwt === 'no') );
		bGoogle = Boolean(! (bOptGgl === false || bOptGgl === 'false' || bOptGgl === 'no') );
		bReddit = Boolean(bOptRdt === true || bOptRdt === 'true' || bOptRdt === 'yes');
		bPinterest = Boolean(bOptPnt === true || bOptPnt === 'true' || bOptPnt === 'yes');

		sColorTheme = (sOptColor === 'light') ? sOptColor : 'dark';
		sPosition = ( (sOptPos === 'right-top') || (sOptPos === 'right-bottom') ) ? sOptPos : 'right-middle';
		sOrientation = (sOptOrient === 'horizontal') ? sOptOrient : 'vertical';

		iZIndex = (parseInt(iOptZ,10)) ? iOptZ : 1234567890;

		//bShowScroll = Boolean(bOptScroll === true || bOptScroll === 'true' || bOptScroll === 'yes');

		sCustomCssFileUrl = sOptCustCss || '';
		sCssFileUrl = sOptCss || 'https://zonsaja.github.io/zonsharecountbox/css/zonsharecountbox.css';
			/* cssfile
		sCssFileUrl = o.CSS_File_URL || (function() {
			var sZscbJsFilename = 'zonsharecountbox.js', sZscbCssFilename = 'zonsharecountbox.css';
			for (var i = 0, eScript; eScript = oDoc.getElementsByTagName('script')[i]; i++) {
				if (eScript.src.indexOf(''+sZscbJsFilename+'')) {
					return eScript.src.replace('js/'+sZscbJsFilename+'','css/'+sZscbCssFilename+'').replace(''+sZscbJsFilename+'',''+sZscbCssFilename+'');
				}
			}
		})();
		// */

		if (sCssFileUrl) {
			if ( (bFacebook) || (bTwitter) || (bGoogle) || (bPinterest) || (bReddit) ) {
				$(function() {
					doGenerate();
				});
			}
		}

	};

})(window.$);


// execution
if (typeof zscbOptions === 'object') {
	zonShareCountBox(zscbOptions);
	zonShareCountBox.executed = true;
}
