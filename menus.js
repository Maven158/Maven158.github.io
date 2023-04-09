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
			$(this).off();
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
			$(this).off();
			$(this).mouseenter(function() {
				$(this).find('a').addClass('current');
			});
			$(this).mouseleave(function() {
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
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
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
					document.getElementById("mainContent").outerHTML = str;
				});
			});
		}
		if($(this).hasClass('sideBarCode')) {
			let nav = document.getElementsByClassName('sideBarCode')[0];
			let flash = document.getElementsByClassName('fa fa-code')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).addClass('selected');
				fetch('code.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
				});
			});
		}
		if($(this).hasClass('sideBarLinkedIn')) {
			var nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			var flash = document.getElementsByClassName('fa fa-linkedin')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					// if($(this).hasClass('selected')) {
					// 	$(this).removeClass('selected');
					// }
				});
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
					// if($(this).hasClass('selected')) {
					// 	$(this).removeClass('selected');
					// }
				});
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
					// if($(this).hasClass('selected')) {
					// 	$(this).removeClass('selected');
					// }
				});
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
					// if($(this).hasClass('selected')) {
					// 	$(this).removeClass('selected');
					// }
				});
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
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
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
					loadScript("app.js");
				});
			});
		}
		if($(this).hasClass('sideBarResume')) {
			var nav = document.getElementsByClassName('sideBarResume')[0];
			var flash = document.getElementsByClassName('fa fa-file-alt')[0];
			console.log($(this));
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {

					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
					menu.find('li').each(function() {
						console.log($(this).find('tt'));
						$(this).find('tt').opacity = '0';
						// $(this).find('a').removeClass('current');
					});
				});
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
					document.getElementById("mainContent").outerHTML = str;
				});
			});
		}
	});
}

function siteNav() {
	var menu = $('#siteNav');
	menu.find('a').each(function() {
		if($(this).hasClass('accolades')) {
			console.log(menu);
			var nav = document.getElementsByClassName('accolades')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('accolades.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('accolades')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('biography')) {
			console.log(menu);
			var nav = document.getElementsByClassName('biography')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('biography.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('biography')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('resume')) {
			console.log(menu);
			var nav = document.getElementsByClassName('resume')[0];
			nav.addEventListener('click', function (){
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('future')) {
			console.log(menu);
			var nav = document.getElementsByClassName('future')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('future')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('core')) {
			console.log(menu);
			var nav = document.getElementsByClassName('core')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('core')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('hrenovator')) {
			console.log(menu);
			var nav = document.getElementsByClassName('hrenovator')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('hrenovator')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('neirman')) {
			console.log(menu);
			var nav = document.getElementsByClassName('neirman')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('neirman')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('maven')) {
			console.log(menu);
			var nav = document.getElementsByClassName('maven')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('maven')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('linkedin')) {
			console.log(menu);
			var nav = document.getElementsByClassName('linkedin')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('linkedin')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('reddit')) {
			console.log(menu);
			var nav = document.getElementsByClassName('reddit')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('reddit')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('github')) {
			console.log(menu);
			var nav = document.getElementsByClassName('github')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('github')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('stackoverflow')) {
			console.log(menu);
			var nav = document.getElementsByClassName('stackoverflow')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('stackoverflow')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('contract')) {
			console.log(menu);
			var nav = document.getElementsByClassName('contract')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('contract')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
			});
		}
		if($(this).hasClass('email')) {
			console.log(menu);
			var nav = document.getElementsByClassName('email')[0];
			console.log(nav)
			nav.addEventListener('click', function (){
				fetch('home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('email')[0];
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
				})
				.then((delayed) => {
					setTimeout(function() {
						if ($(this).find('ul').length > 0 ) {
							$(this).off();
							$(this).find('ul').stop(true, true).fadeOut(1000)
							$(this).find('a').removeClass('current');	
						}
					}, 600);
				})
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