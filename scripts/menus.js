
// desktop version sliding menus
var tabToggle = false;

//enable menu animation if the screen is set to desktop
function enableMenus() {
	//create shortcut for nav element
	var menu = $('#siteNav');
	var sideMenu = $('#sideBar');
	//check to see if we are on desktop .vs tablet or mobile
	// if ($(document).width() > 300) {
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
	// } else {
	// 	menu.find('li').each(function() {
  //     if ($(this).find('ul').length > 0 ) {
  //     	// strip any existing events
  //     	$(this).unbind();
  //     };
	// 	});
	// 	if($('body').hasClass('no-js') == false) {
	// 		$('body').addClass('no-js');
	// 	};
	// };
};

function changeFont(element, size, margin){
	// console.log(element.parentElement.children[1].children[0]);
	element.style.fontSize = size;
	element.style.transition = '1s';
	element.parentElement.children[1].children[0].style.marginTop = margin;
	element.parentElement.children[1].children[0].style.fontSize = '.7rem';
}
function pullTabClick() {
	var pullTab = document.getElementsByClassName('pulltab')[0];
	pullTab.addEventListener('click', function () {
		$(sideBar)[0].style.transition = 'all 1s';
		if (tabToggle) {
			$(sideBar)[0].style.left = '4px';
		} else {
			$(sideBar)[0].style.left = '-60px';
		}
		tabToggle = !tabToggle;
	});
};
function sideBarNav() {
	var menu = $('#sideBar');
	if ($(document).width() < 600 && tabToggle == false) {
		$(sideBar)[0].style.transition = 'all 1s';
		$(sideBar)[0].style.left = '-60px';
	} else {
		if ($(document).width() >= 600) {
			$(sideBar)[0].style.transition = 'all 1s';
			$(sideBar)[0].style.left = '4px';
		} 
	}
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
				toolTip = flash.getElementsByClassName('tt');
				toolTip[0].style.opacity = '0';
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
				});
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
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
				toolTip = flash.getElementsByClassName('tt');
				toolTip[0].style.opacity = '0';
				fetch('/site/code.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
				});
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
			});
		}
		if($(this).hasClass('sideBarLinkedIn')) {
			var nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			var flash = document.getElementsByClassName('fa fa-linkedin')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
				});
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
				window.open("https://www.linkedin.com/in/chris-hren/", '_blank');
			});
		}

		if($(this).hasClass('sideBarReddit')) {
			var nav = document.getElementsByClassName('sideBarReddit')[0];
			var flash = document.getElementsByClassName('fa fa-reddit-alien')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
				});
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
				window.open("https://www.reddit.com/user/Richard_Musk/", '_blank');
			});
		}		
		if($(this).hasClass('sideBarGitHub')) {
			var nav = document.getElementsByClassName('sideBarGitHub')[0];
			var flash = document.getElementsByClassName('fa fa-github-alt')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
				});
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
				window.open("https://github.com/Maven158", '_blank');
			});
		}		
		if($(this).hasClass('sideBarStackOverflow')) {
			var nav = document.getElementsByClassName('sideBarStackOverflow')[0];
			var flash = document.getElementsByClassName('fa fa-stack-overflow')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
				});
				$(flash).addClass('flash');
				setTimeout(function() {
					$(flash).removeClass('flash');
				}, 600);
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
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
				toolTip = flash.getElementsByClassName('tt');
				toolTip[0].style.opacity = '0';
				fetch('/site/contact.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
					loadScript("app.js");
				});
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
			});
		}
		if($(this).hasClass('sideBarResume')) {
			var nav = document.getElementsByClassName('sideBarResume')[0];
			var flash = document.getElementsByClassName('fa fa-file-alt')[0];
			// console.log($(this));
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
				toolTip = flash.getElementsByClassName('tt');
				toolTip[0].style.opacity = '0';
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
				});
				$(flash).mouseleave(function() {
					toolTip[0].style.opacity = null;
				});
			});
		}
	});
}

function siteNav() {
	var menu = $('#siteNav');
	if ($(document).width() >= 435) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '1.1rem', '3px');
				}
			}
		});
	}
	if ($(document).width() < 435) {
		menu.find('a').each(function() {
		if($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '1.0rem', '2px');
				}
			}
		});
	}
	if ($(document).width() < 400) {
		menu.find('a').each(function() {
		if($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '.9rem', '0px');
				}
			}
		});
	}
	if ($(document).width() < 360) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '.8rem', '-2px');
				}
			}
		});
	}
	if ($(document).width() < 325) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	if ($(document).width() <= 280) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(var i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	menu.find('a').each(function() {
		if($(this).hasClass('accolades')) {
			// console.log(menu);
			var nav = document.getElementsByClassName('accolades')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/accolades.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('biography')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/biography.html')
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
		if($(this).hasClass('main')) {
			// console.log(menu);
			var nav = document.getElementsByClassName('main')[0];
			nav.addEventListener('click', function (){
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					var flash = document.getElementsByClassName('main')[0];
					$(flash).addClass('flash');
					setTimeout(function() {
						$(flash).removeClass('flash');
					}, 600);
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					document.getElementById("mainContent").outerHTML = str;
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
			// console.log(menu);
			var nav = document.getElementsByClassName('future')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/future.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('core')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/core.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('hrenovator')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/hrenovator.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('neirman')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/neirman.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('maven')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/maven.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('linkedin')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('reddit')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('github')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('stackoverflow')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('contract')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/contract.html')
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
			// console.log(menu);
			var nav = document.getElementsByClassName('email')[0];
			// console.log(nav)
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
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
	pullTabClick();
	
});
$(window).resize(function() {
 	enableMenus();
	sideBarNav();
	siteNav();
	pullTabClick();
});