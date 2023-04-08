// desktop version sliding menus

//enable menu animation if the screen is set to desktop
function enableMenus() {
	//create shortcut for nav element
	var menu = $('#siteNav');
	var sideMenu = $('#sideBar');
	//check to see if we are on desktop .vs tablet or mobile
	if ($(document).width() > 768) {
	//strip out no-js class if jQuery is running the animation
	if($('body').hasClass('no-js')) {
		$('body').removeClass('no-js');
	};
	//attach a listener to each li that has a child ul, and then slide submenus down or up depending upon mouse position
	menu.find('li').each(function() {
		if ($(this).find('ul').length > 0 ) {
			// strip any existing events
			$(this).unbind();
			$(this).mouseenter(function() {
				$(this).find('a').addClass('current');
			  $(this).find('ul').stop(true, true).fadeIn(1000);
			});
			$(this).mouseleave(function() {
			  $(this).find('ul').stop(true, true).fadeOut(1000);
				$(this).find('a').removeClass('current');
			});
		};
	});
	sideMenu.find('li').each(function() {
		if ($(this).find('ul').length > 0 ) {
			// strip any existing events
			$(this).unbind();
			$(this).mouseenter(function() {
				$(this).find('a').addClass('current');
			  // $(this).find('div').stop(true, true).slideRight(1000);
			});
			$(this).mouseleave(function() {
			  // $(this).find('div').stop(true, true).slideLeft(1000);
				$(this).find('a').removeClass('current');
			});
		};
	});
	} else {
		menu.find('li').each(function() {
      if ($(this).find('ul').length > 0 ) {
      	// strip any existing events
      	$(this).unbind();
      };
		});
		if($('body').hasClass('no-js') == false) {
			$('body').addClass('no-js');
		};
	};
};

function sideBarNav() {
	var menu = $('#sideBar');
	menu.find('a').each(function() {
		if($(this).hasClass('sideBarHome')) {
			let nav = document.getElementsByClassName('sideBarHome')[0];
			let flash = document.getElementsByClassName('fas fa-house-user')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					if($(this).hasClass('selected')) {
						// console.log(this);
						$(this).removeClass('selected');
					}
				});
				console.log("Clicked Home");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).addClass('selected');
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					// console.log(str)
					document.getElementById("mainContent").outerHTML = str;
					document.getElementById('secondaryContent').innerHTML = "";
				});
			});
		}
		if($(this).hasClass('sideBarCode')) {
			let nav = document.getElementsByClassName('sideBarCode')[0];
			let flash = document.getElementsByClassName('fa fa-code')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					if($(this).hasClass('selected')) {
						console.log(this);
						$(this).removeClass('selected');
					}
				});
				console.log("Clicked HTML Tags");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).addClass('selected');
				document.getElementById('secondaryContent').innerHTML = "";
				document.getElementById('mainContent').innerHTML = "";
			});
		}
		if($(this).hasClass('sideBarLinkedIn')) {
			var nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			var flash = document.getElementsByClassName('fa fa-linkedin')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					// if($(this).hasClass('selected')) {
					// 	console.log(this);
					// 	$(this).removeClass('selected');
					// }
				});
				console.log("Clicked LinkedIn");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				// $(flash).addClass('selected');
				window.open("https://www.linkedin.com/in/chris-hren/", '_blank');
			});
		}

		if($(this).hasClass('sideBarReddit')) {
			var nav = document.getElementsByClassName('sideBarReddit')[0];
			var flash = document.getElementsByClassName('fa fa-reddit-alien')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					// if($(this).hasClass('selected')) {
					// 	console.log(this);
					// 	$(this).removeClass('selected');
					// }
				});
				console.log("Clicked Reddit");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				// $(flash).addClass('selected');
				window.open("https://www.reddit.com/user/Richard_Musk/", '_blank');
			});
		}		
		if($(this).hasClass('sideBarGitHub')) {
			var nav = document.getElementsByClassName('sideBarGitHub')[0];
			var flash = document.getElementsByClassName('fa fa-github-alt')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					// if($(this).hasClass('selected')) {
					// 	console.log(this);
					// 	$(this).removeClass('selected');
					// }
				});
				console.log("Clicked GitHub");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				// $(flash).addClass('selected');
				window.open("https://github.com/Maven158", '_blank');
			});
		}		
		if($(this).hasClass('sideBarStackOverflow')) {
			var nav = document.getElementsByClassName('sideBarStackOverflow')[0];
			var flash = document.getElementsByClassName('fa fa-stack-overflow')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					// if($(this).hasClass('selected')) {
					// 	console.log(this);
					// 	$(this).removeClass('selected');
					// }
				});
				console.log("Clicked Stack Overflow");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				// $(flash).addClass('selected');
				window.open("https://stackoverflow.com/users/18815704/maven", '_blank');
			});
		}
		if($(this).hasClass('sideBarEmail')) {
			var nav = document.getElementsByClassName('sideBarEmail')[0];
			var flash = document.getElementsByClassName('fa fa-send')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					if($(this).hasClass('selected')) {
						console.log(this);
						$(this).removeClass('selected');
					}
				});
				console.log("Clicked Paper Airplane");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).addClass('selected');
				fetch('contact.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
					str = newDoc.querySelector('#secondaryContent').outerHTML;
					document.getElementById("secondaryContent").outerHTML = str;
					loadScript("app.js");
				});
			});
		}
		if($(this).hasClass('sideBarResume')) {
			var nav = document.getElementsByClassName('sideBarResume')[0];
			var flash = document.getElementsByClassName('fa fa-file-alt')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					console.log($(this));
					if($(this).hasClass('selected')) {
						console.log(this);
						$(this).removeClass('selected');
					}
				});
				console.log("Clicked Resume");
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).addClass('selected');
				fetch('resume.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					// console.log(str)
					document.getElementById("mainContent").outerHTML = str;
					// document.getElementById("mainContent").style.float = "none";
					// document.getElementById("mainContent").style.display = "flex";
					// document.getElementById("mainContent").style.margin = "80px auto 0px auto";
					// document.getElementById("field").style.padding = "40px 20px 40px 20px";
					document.getElementById("secondaryContent").style.display = "none";
				});
			});
		}
	});
}

function siteNav() {
	var menu = $('#siteNav');
	menu.find('a').each(function() {
		if($(this).hasClass('sideBarHome')) {
			var nav = document.getElementsByClassName('sideBarHome')[0];
			nav.addEventListener('click', function (){
				console.log("Clicked Home");
				document.getElementById('secondaryContent').innerHTML = "";
				document.getElementById('mainContent').innerHTML = "";
			});
		}
		if($(this).hasClass('sideBarCode')) {
			var nav = document.getElementsByClassName('sideBarCode')[0];
			nav.addEventListener('click', function (){
				console.log("Clicked HTML Tags");
				document.getElementById('secondaryContent').innerHTML = "";
				document.getElementById('mainContent').innerHTML = "";
			});
		}
		if($(this).hasClass('sideBarLinkedIn')) {
			var nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			nav.addEventListener('click', function (){
				console.log("Clicked LinkedIn");
				document.getElementById('secondaryContent').innerHTML = "";
				document.getElementById('mainContent').innerHTML = "";
			});
		}
		if($(this).hasClass('resume')) {
			var nav = document.getElementsByClassName('resume')[0];
			nav.addEventListener('click', function (){
				console.log("Clicked Resume");
				fetch('resume.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('resume')[0];
					$(flash).addClass('flash');
					setTimeout(function() {
						$(flash).removeClass('flash');
					}, 600);
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
					document.getElementById("mainContent").style.float = "none";
					document.getElementById("mainContent").style.display = "flex";
					document.getElementById("mainContent").style.margin = "80px auto 0px auto";
					document.getElementById("field").style.padding = "40px 20px 40px 20px";
					document.getElementById("secondaryContent").style.display = "none";
				});
			});
		}
	});
}
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    if ($("script[src='" + src + "']").length === 0) {
        var script = document.createElement('script');
        script.onload = function () {
            resolve();
        };
        script.onerror = function () {
            reject();
        };
        script.src = src;
        document.body.appendChild(script);
    } else {
			console.log("RESOLVE")
    		reload_js(src);
        resolve();
    }
	});
}
function reload_js(src) {
	$('script[src="' + src + '"]').remove();
	$('<script>').attr('src', src).appendTo('head');
}
$(document).ready(function(){
	enableMenus();
	sideBarNav();
	siteNav();
});
$(window).resize(function() {
 	enableMenus();
	sideBarNav();
	siteNav();
});