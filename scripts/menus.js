
// desktop version sliding menus
var lastScrollTop = 0;

//enable menu animation if the screen is set to desktop
function enableMenus() {
	//create shortcut for nav element
	let siteNav = $('#siteNav');
	let sideBar = $('#sideBar');
	//check to see if we are on desktop .vs tablet or mobile
	// if (screen.availWidth > 300) {
	//strip out no-js class if jQuery is running the animation
	if ($('body').hasClass('no-js')) {
		$('body').removeClass('no-js');
	};

	//attach a listener to each li that has a child ul, and then slide submenus down or up depending upon mouse position
	siteNav.find('li').each(function() {
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
	sideBar.find('li').each(function() {
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
	// 	siteNav.find('li').each(function() {
  //     if ($(this).find('ul').length > 0 ) {
  //     	// strip any existing events
  //     	$(this).unbind();
  //     };
	// 	});
	// 	if ($('body').hasClass('no-js') == false) {
	// 		$('body').addClass('no-js');
	// 	};
	// };
};

window.addEventListener('scroll', function() {
	let state = window.pageYOffset || document.documentElement.scrollTop;
	if (state > lastScrollTop && (state - lastScrollTop) > 5) {
		$('.fixedBanner').fadeOut(1000);
	}  else if (state < lastScrollTop) {
		$('.fixedBanner').fadeIn(1000);
	} 
	lastScrollTop = state <= 0 ? 0 : state;
	// clearTimeout($.data(this, 'scrollTimer'));
	// $.data(this, 'scrollTimer', setTimeout(function() {
	// 	$('.fixedBanner').fadeIn(1000);
	// }, 750));
}, false);

function changeFont(element, size, margin){
	element.style.fontSize = size;
	element.style.transition = '0s';
	element.parentElement.children[1].children[0].style.marginTop = margin;
	element.parentElement.children[1].children[0].style.fontSize = '.7rem';
}

function pullTabClick() {
	clearTimeout($.data(this));
	let pullTabWrapper = document.getElementsByClassName('pullTab-Wrapper')[0];
	if ((screen.availWidth < 635 || $(window).width() < 635) ) {
		$(pullTabWrapper).on('click', pullTabWrapper.fn = function clicked() {
			if ($(sideBar).hasClass('toggle')) {
				$(sideBar).removeClass('toggle');
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '-62px';
			} else if (!$(sideBar).hasClass('toggle')) {
				$(sideBar).addClass('toggle');
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '4px';
				clearTimeout($.data(this));
				setTimeout(function() {
					if ((screen.availWidth < 635 || $(window).width() < 635)) {
						if ($(sideBar).hasClass('toggle')) {
							$(sideBar).removeClass('toggle');
							$(sideBar)[0].style.transition = '1s';
							$(sideBar)[0].style.left = '-62px';
						}
					}
				}, 5000);
			}
		});
	}
};

function sideBarNav() {
	let sideBar = $('#sideBar');
	let pullTabWrapper = $('#pullTab-Wrapper');
	let touchStartPosY = 0;
	let touchStartPosX = 0;
	let head = 4;
	let highestId = window.setTimeout(() => {
		for (let i = highestId; i >= 0; i--) {
			window.clearTimeout(i);
		}
	}, 0);
	setTimeout(function() {
		$(sideBar)[0].style.transition = '0s';
		$(sideBar)[0].style.top = head + 'px';
	}, 0);
	if ((screen.availWidth < 635 || $(window).width() < 635)) {	
		pullTabWrapper.on('touchmove', (element) => {
			element.stopPropagation();
			element.preventDefault();
			const currentPageX = Math.round(element.originalEvent.touches[0].screenX);
			if (touchStartPosX === currentPageX) return;
			if (touchStartPosX - currentPageX > 0) {
				if ($(sideBar).hasClass('toggle')) {
					$(sideBar).removeClass('toggle');
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '-62px';
				}
			} else {
				if (!$(sideBar).hasClass('toggle')) {
					$(sideBar).addClass('toggle');
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '4px';
					let highestId = window.setTimeout(() => {
						for (let i = highestId; i >= 0; i--) {
							window.clearInterval(i);
						}
					}, 0);
					setTimeout(function() {
						if ((screen.availWidth < 635 || $(window).width() < 635)) {
							if ($(sideBar).hasClass('toggle')) {
								$(sideBar).removeClass('toggle');
								$(sideBar)[0].style.transition = '1s';
								$(sideBar)[0].style.left = '-62px';
							}
						}
					}, 5000);
				}
			}
			touchStartPosX = currentPageX;
		});
		$(sideBar).off('touchmove');
	}
	if (screen.availHeight < 510) {
		sideBar.on('touchmove', (element) => {
			element.stopPropagation();
			element.preventDefault();
			const currentPageY = Math.round(element.originalEvent.touches[0].screenY);
			if (touchStartPosY === currentPageY) return;
			if (touchStartPosY - currentPageY > 0) {
				$(sideBar)[0].style.transition = '.2s';
				head = screen.availHeight - 504;
				$(sideBar)[0].style.top = head + 'px';
			} else {
				$(sideBar)[0].style.transition = '.2s';
				head = 4;		
				$(sideBar)[0].style.top = head + 'px';
			}
			touchStartPosY = currentPageY;
		});
	}
	if ((screen.availWidth < 635 || $(window).width() < 635) && !$(sideBar).hasClass('toggle')) {
		let pullTab = document.getElementsByClassName('pullTab')[0];
		pullTab.style.opacity = '1';
		pullTabClick();
	}  
	if ((screen.availWidth < 635 || $(window).width() < 635) && $(sideBar).hasClass('toggle')) {
		$(sideBar).removeClass('toggle');
		$(sideBar)[0].style.transition = '1s';
		$(sideBar)[0].style.left = '-62px';
		let pullTab = document.getElementsByClassName('pullTab')[0];
		pullTab.style.opacity = '1';
		pullTabClick();
	 } else {
		if ((screen.availWidth < 635 || $(window).width() >= 635) && !$(sideBar).hasClass('toggle')) {
			$(sideBar).addClass('toggle');
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '4px';
			if ((screen.availWidth < 635 || $(window).width() >= 635)) {
				let pullTab = document.getElementsByClassName('pullTab')[0];
				let pullTabWrapper = document.getElementsByClassName('pullTab-Wrapper')[0];
				pullTab.style.opacity = '0';
				$(pullTabWrapper).off('click', pullTabWrapper.fn);
			}
		}
		if ((screen.availWidth < 635 || $(window).width() >= 635) && $(sideBar).hasClass('toggle')) {
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '4px';
			if ((screen.availWidth < 635 || $(window).width() >= 635)) {
				let pullTab = document.getElementsByClassName('pullTab')[0];
				let pullTabWrapper = document.getElementsByClassName('pullTab-Wrapper')[0];
				pullTab.style.opacity = '0';
				$(pullTabWrapper).off('click', pullTabWrapper.fn);
			}
		} 
	}
	sideBar.find('a').each(function() {
		if ($(this).hasClass('sideBarHome')) {
			let nav = document.getElementsByClassName('sideBarHome')[0];
			let flash = document.getElementsByClassName('fas fa-house-user')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
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
				if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
		if ($(this).hasClass('sideBarCode')) {
			let nav = document.getElementsByClassName('sideBarCode')[0];
			let flash = document.getElementsByClassName('fa fa-code')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
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
				if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
		if ($(this).hasClass('sideBarLinkedIn')) {
			let nav = document.getElementsByClassName('sideBarLinkedIn')[0];
			let flash = document.getElementsByClassName('fa fa-linkedin')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
				window.open("https://www.linkedin.com/in/chris-hren/");
			});
		}
		if ($(this).hasClass('sideBarReddit')) {
			let nav = document.getElementsByClassName('sideBarReddit')[0];
			let flash = document.getElementsByClassName('fa fa-reddit-alien')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
				window.open("https://www.reddit.com/user/Richard_Musk/");
			});
		}		
		if ($(this).hasClass('sideBarGitHub')) {
			let nav = document.getElementsByClassName('sideBarGitHub')[0];
			let flash = document.getElementsByClassName('fa fa-github-alt')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
				window.open("https://github.com/Maven158");
			});
		}		
		if ($(this).hasClass('sideBarStackOverflow')) {
			let nav = document.getElementsByClassName('sideBarStackOverflow')[0];
			let flash = document.getElementsByClassName('fa fa-stack-overflow')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					toolTip = flash.getElementsByClassName('tt');
					toolTip[0].style.opacity = '0';
					if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
				window.open("https://stackoverflow.com/users/18815704/maven");
			});
		}
		if ($(this).hasClass('sideBarEmail')) {
			let nav = document.getElementsByClassName('sideBarEmail')[0];
			let flash = document.getElementsByClassName('fa fa-send')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
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
				if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
		if ($(this).hasClass('sideBarResume')) {
			let nav = document.getElementsByClassName('sideBarResume')[0];
			let flash = document.getElementsByClassName('fa fa-file-alt')[0];
			$(nav).on('click', function (){
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
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
				if ((screen.availWidth < 635 || $(window).width() < 635)) {
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
	let siteNav = $('#siteNav');
	if (screen.availWidth >= 435) {
		siteNav.find('a').each(function() {
			if ($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '1.1rem', '3px');
				}
			}
		});
	}
	if (screen.availWidth < 435) {
		siteNav.find('a').each(function() {
		if ($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '1.0rem', '2px');
				}
			}
		});
	}
	if (screen.availWidth < 400) {
		siteNav.find('a').each(function() {
		if ($(this).hasClass('mainNav')) {
			let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.9rem', '0px');
				}
			}
		});
	}
	if (screen.availWidth < 360) {
		siteNav.find('a').each(function() {
			if ($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.8rem', '-2px');
				}
			}
		});
	}
	if (screen.availWidth < 325) {
		siteNav.find('a').each(function() {
			if ($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	if (screen.availWidth <= 280) {
		siteNav.find('a').each(function() {
			if ($(this).hasClass('mainNav')) {
				let font = document.getElementsByClassName('mainNav');
				for(let i = 0; i < font.length; i++){
					changeFont(font[i], '.7rem', '-4px');
				}
			}
		});
	}
	siteNav.find('a').each(function() {
		if ($(this).hasClass('accolades')) {
			let nav = document.getElementsByClassName('accolades')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('biography')) {
			let nav = document.getElementsByClassName('biography')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('main')) {
			let nav = document.getElementsByClassName('main')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('future')) {
			let nav = document.getElementsByClassName('future')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('core')) {
			let nav = document.getElementsByClassName('core')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('hrenovator')) {
			let nav = document.getElementsByClassName('hrenovator')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('neirman')) {
			let nav = document.getElementsByClassName('neirman')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('maven')) {
			let nav = document.getElementsByClassName('maven')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('linkedin')) {
			let nav = document.getElementsByClassName('linkedin')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('reddit')) {
			let nav = document.getElementsByClassName('reddit')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('github')) {
			let nav = document.getElementsByClassName('github')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('stackoverflow')) {
			let nav = document.getElementsByClassName('stackoverflow')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('contract')) {
			let nav = document.getElementsByClassName('contract')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
			});
		}
		if ($(this).hasClass('email')) {
			let nav = document.getElementsByClassName('email')[0];
			$(nav).on('click', function (){
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
				.then(() => {
					let siteNav = $('#siteNav');
					siteNav.find('li').each(function() {
						$(this).find('a').each(function() {
							setTimeout(function() {
								$(this).removeClass('current');
							}, 600);
						});
						if ($(this).find('ul').length > 0 ) {
							$(this).find('ul').fadeOut(1000);
						};
					});
				});
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
	let highestId = window.setTimeout(() => {
		for (let i = highestId; i >= 0; i--) {
			window.clearTimeout(i);
		}
	}, 0);
 	enableMenus();
	sideBarNav();
	siteNav();
});