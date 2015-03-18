(function () {
    // Allow a click anywhere to close the menu
    var menud = document.querySelector('.menu');
    var menub = document.querySelector('#menubtn');
    var menuc = document.querySelector('.menuclose');
    menub.addEventListener('click', function () {
        if (menud.classList.contains('active')) {
            menud.classList.remove('active');
            menuc.style.display = 'none';
        } else {
            menud.classList.add('active');
            menuc.style.display = 'block';
        }
    });
    menuc.addEventListener('click', function () {
        if (menud.classList.contains('active')) {
            menud.classList.remove('active');
            menuc.style.display = 'none';
        } else {
            menud.classList.add('active');
            menuc.style.display = 'block';
        }
    });
})();

(function () {
    document.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            document.querySelector('.nav').setZ(2);
            document.querySelector('.pagetitle').style.opacity = 0;
        } else {
            document.querySelector('.nav').setZ(1);
            document.querySelector('.pagetitle').style.opacity = 100;
        }
    });
})();

(function () {
    var footer = document.createElement('paper-shadow');
    footer.classList.add('content');
    footer.z = "1";

    var footerbody = document.createElement('div');
    footerbody.classList.add('cardbody');
    footerbody.innerHTML = "&copy; 2015 MatterPhase Inc.<br />Website created by Noah Shuart"
    footerbody.style.textAlign = "center";

    footer.appendChild(footerbody);

    document.querySelector('main').appendChild(footer);
})();

(function () {
	navigator.browserVersion = (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
	});
	
	if (navigator.browserVersion().match(/(IE [0-9]*)/g).length > 0) {
		alert("This website looks best in Chrome and Firefox");
	}
})();