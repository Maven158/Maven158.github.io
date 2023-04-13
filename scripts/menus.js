
// desktop version sliding menus

//enable menu animation if the screen is set to desktop
function enableMenus() {
	//create shortcut for nav element
	let menu = $('#siteNav');
	let sideMenu = $('#sideBar');
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

// let lastScrollPosition = 0;
// let homeState = 0;
// let box = document.getElementsByClassName('box')[0];
// document.addEventListener('scroll', function(e) {
//   if (window.scrollY > lastScrollPosition) {
// 		let temp = $(box)[0].style.top;
//   	$(box)[0].style.top = '-50';
// 		// state.showNav = false;
// 		console.log(temp);
//   } else {
//     // state.showNav = true;
//   }
//   lastScrollPosition = window.scrollY;
// }, { passive: true });

function changeFont(element, size, margin){
	// console.log(element.parentElement.children[1].children[0]);
	element.style.fontSize = size;
	element.style.transition = '0s';
	element.parentElement.children[1].children[0].style.marginTop = margin;
	element.parentElement.children[1].children[0].style.fontSize = '.7rem';
}
function pullTabClick() {
	let pullTab = document.getElementsByClassName('pullTab-Wrapper')[0];
	if ($(document).width() < 635 ) {
		pullTab.addEventListener('click', pullTab.fn = function clicked() {
			if ($(sideBar).hasClass('toggle')) {
				$(sideBar).removeClass('toggle');
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '-62px';
			} else if (!$(sideBar).hasClass('toggle')) {
				$(sideBar).addClass('toggle');
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '4px';
				// $(sideBar)[0].style.background = '#000000d9';
				// $(sideBar)[0].style.borderRadius = '10px';
				// $(sideBar)[0].style.border = '2px solid #000000d9';
				// setTimeout(function() {
				// 	pullTabClick();
				// }, 100);
			}
		});
	}
};
function sideBarNav() {
	let menu = $('#sideBar');
	if ($(document).width() < 600 && $(sideBar).hasClass('toggle')) {
		$(sideBar).removeClass('toggle');
		$(sideBar)[0].style.transition = '1s';
		$(sideBar)[0].style.left = '-62px';
		let pT = document.getElementsByClassName('pullTab')[0];
		let pTW = document.getElementsByClassName('pullTab-Wrapper')[0];
		pT.style.opacity = '1';
		pTW.addEventListener('click', pTW.fn);
		} else {
		if ($(document).width() >= 600 && !$(sideBar).hasClass('toggle')) {
			$(sideBar).addClass('toggle');
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '4px';
			if ($(document).width() >= 635) {
				let pT = document.getElementsByClassName('pullTab')[0];
				let pTW = document.getElementsByClassName('pullTab-Wrapper')[0];
				pT.style.opacity = '0';
				pTW.removeEventListener('click', pTW.fn);
			}
		}
		if ($(document).width() >= 600 && $(sideBar).hasClass('toggle')) {
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '4px';
			if ($(document).width() >= 635) {
				let pT = document.getElementsByClassName('pullTab')[0];
				let pTW = document.getElementsByClassName('pullTab-Wrapper')[0];
				pT.style.opacity = '0';
				pTW.removeEventListener('click', pTW.fn);
			}
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
				if ($(document).width() < 600) {
					$(sideBar)[0].style.left = '-62px';
					$(sideBar).removeClass('toggle');
				}
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
				if ($(document).width() < 600) {
					$(sideBar)[0].style.left = '-62px';
					$(sideBar).removeClass('toggle');
				}
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
			let nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			let flash = document.getElementsByClassName('fa fa-linkedin')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ($(document).width() < 600) {
						$(sideBar)[0].style.left = '-62px';
						$(sideBar).removeClass('toggle');
					}
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
			let nav = document.getElementsByClassName('sideBarReddit')[0];
			let flash = document.getElementsByClassName('fa fa-reddit-alien')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ($(document).width() < 600) {
						$(sideBar)[0].style.left = '-62px';
						$(sideBar).removeClass('toggle');
					}
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
			let nav = document.getElementsByClassName('sideBarGitHub')[0];
			let flash = document.getElementsByClassName('fa fa-github-alt')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ($(document).width() < 600) {
						$(sideBar)[0].style.left = '-62px';
						$(sideBar).removeClass('toggle');
					}
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
			let nav = document.getElementsByClassName('sideBarStackOverflow')[0];
			let flash = document.getElementsByClassName('fa fa-stack-overflow')[0];
			nav.addEventListener('click', function (){
				menu.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ($(document).width() < 600) {
						$(sideBar)[0].style.left = '-62px';
						$(sideBar).removeClass('toggle');
					}
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
			let nav = document.getElementsByClassName('sideBarEmail')[0];
			let flash = document.getElementsByClassName('fa fa-send')[0];
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
				if ($(document).width() < 600) {
					$(sideBar)[0].style.left = '-62px';
					$(sideBar).removeClass('toggle');
				}
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
			let nav = document.getElementsByClassName('sideBarResume')[0];
			let flash = document.getElementsByClassName('fa fa-file-alt')[0];
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
				if ($(document).width() < 600) {
					$(sideBar)[0].style.left = '-62px';
					$(sideBar).removeClass('toggle');
				}
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
	let menu = $('#siteNav');
	if ($(document).width() >= 435) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '1.1rem', '3px');
				}
			}
		});
	}
	if ($(document).width() < 435) {
		menu.find('a').each(function() {
		if($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '1.0rem', '2px');
				}
			}
		});
	}
	if ($(document).width() < 400) {
		menu.find('a').each(function() {
		if($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.9rem', '0px');
				}
			}
		});
	}
	if ($(document).width() < 360) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.8rem', '-2px');
				}
			}
		});
	}
	if ($(document).width() < 325) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	if ($(document).width() <= 280) {
		menu.find('a').each(function() {
			if($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	menu.find('a').each(function() {
		if($(this).hasClass('accolades')) {
			let nav = document.getElementsByClassName('accolades')[0];
			nav.addEventListener('click', function (){
				fetch('/site/accolades.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('accolades')[0];
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
			let nav = document.getElementsByClassName('biography')[0];
			nav.addEventListener('click', function (){
				fetch('/site/biography.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('biography')[0];
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
			let nav = document.getElementsByClassName('main')[0];
			nav.addEventListener('click', function (){
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('main')[0];
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
			let nav = document.getElementsByClassName('future')[0];
			nav.addEventListener('click', function (){
				fetch('/site/future.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('future')[0];
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
			let nav = document.getElementsByClassName('core')[0];
			nav.addEventListener('click', function (){
				fetch('/site/core.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('core')[0];
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
			let nav = document.getElementsByClassName('hrenovator')[0];
			nav.addEventListener('click', function (){
				fetch('/site/hrenovator.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('hrenovator')[0];
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
			let nav = document.getElementsByClassName('neirman')[0];
			nav.addEventListener('click', function (){
				fetch('/site/neirman.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('neirman')[0];
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
			let nav = document.getElementsByClassName('maven')[0];
			nav.addEventListener('click', function (){
				fetch('/site/maven.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('maven')[0];
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
			let nav = document.getElementsByClassName('linkedin')[0];
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('linkedin')[0];
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
			let nav = document.getElementsByClassName('reddit')[0];
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('reddit')[0];
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
			let nav = document.getElementsByClassName('github')[0];
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('github')[0];
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
			let nav = document.getElementsByClassName('stackoverflow')[0];
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('stackoverflow')[0];
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
			let nav = document.getElementsByClassName('contract')[0];
			nav.addEventListener('click', function (){
				fetch('/site/contract.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('contract')[0];
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
			let nav = document.getElementsByClassName('email')[0];
			nav.addEventListener('click', function (){
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					const newDoc = document.implementation.createHTMLDocument('doc').documentElement;
					let flash = document.getElementsByClassName('email')[0];
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
        let script = document.createElement('script');
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
});