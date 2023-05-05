import { resizeCanvas, loadCanvas, killCanvas } from './burst.js';

var sideBar = $('#sideBar');
var siteNav = $('#siteNav');
var pullTabWrapper = $('#pullTab-Wrapper');
var font = $('.mainNav');
var newDoc = document.implementation.createHTMLDocument('doc').documentElement;
var head = 4;
var lastScrollTop = 0;
var touchStartPosX = 0;
var touchStartPosY = 0;
var revert;

window.addEventListener('scroll', function() {
	let state = window.scrollY || document.documentElement.scrollTop;
	if (state <= lastScrollTop || state == 0) {
		$('#mainHeader').fadeIn(1000);
	} else if (state > lastScrollTop) {
		$('#mainHeader').fadeOut(1000);
	}
	lastScrollTop = state <= 0 ? 0 : state;
}, false);

function enableNav() {
	if ($('body').hasClass('no-js')) {
		$('body').removeClass('no-js');
	};

	siteNav.find('li').each(function() {
		if ($(this).find('ul').length > 0 ) {
			$(this).off();
			$(this).mouseenter(function() {
				$(this).find('a').addClass('current');
			  $(this).find('ul').stop(true, true).fadeIn(1000);
			});
			$(this).mouseleave(function() {
			  $(this).find('ul').stop(true, true).fadeOut(1000);
				$(this).find('a').removeClass('current');
			});
			$(this).on('click', function() {
				$(this).find('a').addClass('current');
			  $(this).find('ul').stop(true, true).fadeIn(1000);
			});
		};
	});
	sideBar.find('li').each(function() {
		if ($(this).find('ul').length > 0 ) {
			$(this).off();
			$(this).mouseenter(function() {
				$(this).find('a').addClass('current');
			});
			$(this).mouseleave(function() {
				$(this).find('a').removeClass('current');
			});
		};
	});
};

function changeFont(element, size, margin) {
	var onePage = document.getElementsByClassName('onePage');
	element.style.fontSize = size;
	element.style.transitionDuration = '0s';
	element.parentElement.children[0].children[1].style.transition = '0s';
	element.parentElement.children[1].children[0].style.marginTop = margin;
	element.parentElement.children[1].style.fontSize = size == '0.7rem' || size == '0.8rem' ? '.5rem' : '0.7rem';
	element.parentElement.parentElement.style.height = 'fit-content';
	element.parentElement.parentElement.style.padding = '.5em 0em';
	if (document.getElementsByClassName('burstBox').length > 0) {
		onePage[0].style.marginTop = 28 + (2 * parseFloat(margin)) + 'px';
	}
	setTimeout(function() {
		element.style.transitionDuration = '1s';
		element.parentElement.children[0].children[1].style.transition = '1s';
	}, 5);
};

function bannerJustify() {
	if (document.getElementsByClassName('hero').length != 0) {
		var div = $('.hero');
		if (window.innerWidth < 600) {
			div[0].style.justifyContent = 'center';
		} else {
			div[0].style.justifyContent = 'left';
		}
	}
}

function sideBarNav() {
	setTimeout(function() {
		sideBar[0].style.transition = '0s';
		sideBar[0].style.top = '4px';
	}, 0);
	sideBarNavPullTabClick();
	sideBarNavPullTabSwipe();
	sideBarNavPullTabPosition();
};

function sideBarNavPullTabPosition() {
	pullTabWrapper[0].style.transition = '0s';
	if (window.innerWidth < 635) {
		pullTabWrapper[0].style.left = '-11px';
	} else {
		pullTabWrapper[0].style.left = '55px';
	}
	if (window.innerHeight < 512) {
		if (head == 4) {
			let sideBarNavPullTabPosition = (((window.innerHeight - 80) / 2) / window.innerHeight) * 100;
			pullTabWrapper[0].style.top = sideBarNavPullTabPosition + '%';
		}
	} else {
		let sideBarNavPullTabPosition = (((512 - 80) / 2) / window.innerHeight) * 100;
		pullTabWrapper[0].style.top = sideBarNavPullTabPosition + '%';
	}
	setTimeout(function() {
		pullTabWrapper[0].style.transition = '1s';
	}, 0);
};

function sideBarNavPullTabClick() {
	clearTimeout(revert);
	pullTabWrapper.off('click');
	if (window.innerWidth < 635) {
		pullTabWrapper.on('click', pullTabWrapper.fn = function clicked(element) {
			element.stopPropagation();
			element.preventDefault();
			if (sideBar.hasClass('toggle')) {
				sideBar.removeClass('toggle');
				sideBar[0].style.transition = '1s';
				sideBar[0].style.left = '-62px';
				sideBar[0].style.top = '4px';
				pullTabWrapper[0].style.transition = '1s left';
				pullTabWrapper[0].style.left = '-11px';
			} else if (!sideBar.hasClass('toggle')) {
				sideBar.addClass('toggle');
				sideBarNavSwipe();
				sideBar[0].style.transition = '1s';
				sideBar[0].style.left = '4px';
				pullTabWrapper[0].style.transition = '1s';
				pullTabWrapper[0].style.left = '55px';
				clearTimeout($.data(this));
				let highestId = window.setTimeout(() => {
					for (let i = highestId; i >= 0; i--) {
						window.clearInterval(i);
					}
				}, 0);
				revert = setTimeout(function() {
					if (window.innerWidth < 635) {
						if (sideBar.hasClass('toggle')) {
							sideBar.removeClass('toggle');
							sideBar[0].style.transition = '1s';
							sideBar[0].style.left = '-62px';
							sideBar[0].style.top = '4px';
							pullTabWrapper[0].style.transition = '1s';
							pullTabWrapper[0].style.left = '-11px';
							head = 4;
						}
					}
				}, 5000);
			}
		});
	} else if (window.innerWidth >= 635 && !sideBar.hasClass('toggle')) {
		sideBar.addClass('toggle');
		sideBar[0].style.transition = '1s';
		sideBar[0].style.left = '4px';
		sideBar[0].style.top = '4px';
		pullTabWrapper[0].style.transition = '1s left';
		pullTabWrapper[0].style.left = '55px';
		pullTabWrapper[0].style.opacity = '0';
		pullTabWrapper.off('click');
		pullTabWrapper.off('touchmove');
	} else if (window.innerWidth >= 635 && sideBar.hasClass('toggle')) {	
		sideBar[0].style.transition = '1s';
		sideBar[0].style.left = '4px';
		sideBar[0].style.top = '4px';
		pullTabWrapper[0].style.transition = '1s left';
		pullTabWrapper[0].style.opacity = '0';
		pullTabWrapper[0].style.left = '55px';
		pullTabWrapper.off('click');
		pullTabWrapper.off('touchmove');
	}
	if (window.innerWidth < 635) {
		if (sideBar.hasClass('toggle')) {
			sideBar.removeClass('toggle');
			sideBar[0].style.transition = '1s';
			sideBar[0].style.left = '-62px';
			sideBar[0].style.top = '4px';
			pullTabWrapper[0].style.opacity = '1';
			pullTabWrapper[0].style.transition = '1s left';
			pullTabWrapper[0].style.left = '-11px';
		}
	}
};

function sideBarNavPullTabSwipe() {
	pullTabWrapper.off('touchmove');
	pullTabWrapper.off('touchend');
	if (window.innerWidth < 635) {
		pullTabWrapper.on('touchmove', pullTabWrapper.fn = function swipe(element) {
			element.stopPropagation();
			element.preventDefault();
			const currentPageX = Math.round(element.originalEvent.touches[0].screenX);
			if (touchStartPosX === currentPageX) return;
			if (touchStartPosX - currentPageX > 0) {
				if (sideBar.hasClass('toggle')) {
					sideBar.removeClass('toggle');
					sideBar[0].style.transition = '1s';
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					pullTabWrapper[0].style.transition = '1s';
					pullTabWrapper[0].style.left = '-11px';
				}
			} else if (!sideBar.hasClass('toggle')) {
					sideBar.addClass('toggle');
					sideBarNavSwipe();
					sideBar[0].style.transition = '1s';
					sideBar[0].style.left = '4px';
					pullTabWrapper[0].style.transition = '1s';
					pullTabWrapper[0].style.left = '55px';
				}
			touchStartPosX = currentPageX;
		});
		pullTabWrapper.on('touchend', pullTabWrapper.fn = function swipeEnd(element) {
			clearTimeout(revert);
			revert = setTimeout(function() {
				if (window.innerWidth < 635) {
					if (sideBar.hasClass('toggle')) {
						sideBar.removeClass('toggle');
						sideBar[0].style.transition = '1s';
						sideBar[0].style.left = '-62px';
						sideBar[0].style.top = '4px';
						pullTabWrapper[0].style.transition = '1s';
						pullTabWrapper[0].style.left = '-11px';
						head = 4;
					}
				}
			}, 5000);
		});
	} else if (window.innerWidth >= 635 && !sideBar.hasClass('toggle')) {
		sideBar.addClass('toggle');
		sideBar[0].style.transition = '1s';
		sideBar[0].style.left = '4px';
		sideBar[0].style.top = '4px';
		pullTabWrapper[0].style.transition = '1s left';
		pullTabWrapper[0].style.left = '55px';
		pullTabWrapper[0].style.opacity = '0';
		pullTabWrapper.off('click');
		pullTabWrapper.off('touchmove');
	} else if (window.innerWidth >= 635 && sideBar.hasClass('toggle')) {
		sideBar[0].style.transition = '1s';
		sideBar[0].style.left = '4px';
		sideBar[0].style.top = '4px';
		pullTabWrapper[0].style.transition = '1s left';
		pullTabWrapper[0].style.left = '55px';
		pullTabWrapper[0].style.opacity = '0';
		pullTabWrapper.off('click');
		pullTabWrapper.off('touchmove');
	}
	if (window.innerWidth < 635) {
		if (sideBar.hasClass('toggle')) {
			sideBar.removeClass('toggle');
			sideBar[0].style.transition = '1s';
			sideBar[0].style.left = '-62px';
			sideBar[0].style.top = '4px';
			pullTabWrapper[0].style.opacity = '1';
			setTimeout(function() {
				pullTabWrapper[0].style.transition = '1s';
				pullTabWrapper[0].style.left = '-11px';
			}, 0);
		}
	}
	sideBarNavSwipe();
};

function sideBarNavSwipe() {
	sideBar.off('touchmove');
	sideBar.off('touchend');
	if (window.innerHeight < 512 && sideBar.hasClass('toggle')) {
		sideBar.on('touchmove', sideBar.fn = function swipe(element) {
			element.stopPropagation();
			element.preventDefault();
			const currentPageY = Math.round(element.originalEvent.touches[0].screenY);
			if (touchStartPosY === currentPageY) return;
			if (touchStartPosY - currentPageY > 0) {
				head = window.innerHeight - 508;
				sideBar[0].style.transition = '.2s';
				sideBar[0].style.top = head + 'px';
			} else {
				head = 4;
				sideBar[0].style.transition = '.2s';
				sideBar[0].style.top = head + 'px';
			}
			touchStartPosY = currentPageY;
		});
		sideBar.on('touchend', sideBar.fn = function swipeEnd(element) {
			clearTimeout(revert);
			revert = setTimeout(function() {
				if (window.innerWidth >= 635) {
					sideBar[0].style.transition = '1s';
					sideBar[0].style.top = '4px';
					pullTabWrapper[0].style.transition = '0s left';
					pullTabWrapper[0].style.left = '55px';
					pullTabWrapper[0].style.opacity = '0';
					head = 4;
				} else {
					if (sideBar.hasClass('toggle')) {
						sideBar.removeClass('toggle');
						sideBar[0].style.transition = '1s';
						sideBar[0].style.left = '-62px';
						sideBar[0].style.top = '4px';
						pullTabWrapper[0].style.opacity = '1';
						pullTabWrapper[0].style.transition = '1s left !important';
						pullTabWrapper[0].style.left = '-11px';
						head = 4;
					}
				}
			}, 5000);
		});
	}
	else if (window.innerHeight < 512 && !sideBar.hasClass('toggle')) {
		sideBar.off('touchmove');
	}
};

function sideBarNavLinks() {
	sideBar.find('i').each(function() {
		if ($(this).hasClass('fa-solid fa-sun')) {
			let nav = $('.fa-solid.fa-sun');
			nav.off('click');
			nav.on('click', function() {
				document.documentElement.setAttribute('data-theme', 'dark');
				$(this).off('mouseenter');
				$(this).off('mouseout');
				$(this).removeClass('fa-sun selectedLight');
				$(this).addClass('fa-moon flashMode');
				$(this).addClass('flashMode');
				let nav = $('.fa-solid.fa-moon');
				nav.on('mouseout', nav.fn = function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', nav.fn = function(e) {
					toolTip.style.opacity = 1;
				});
				setTimeout(function() {
					let navNew = document.getElementsByClassName('flashMode')[0];
					$(navNew).removeClass('flashMode');
				}, 600);
				$(this).addClass('selectedDark');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s';
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					pullTabWrapper[0].style.transition = '1s';
					pullTabWrapper[0].style.left = '-11px';
					sideBar.removeClass('toggle');
				}
				sideBarNavLinks();
			});
		}
		if ($(this).hasClass('fa-solid fa-moon')) {
			let nav = $('.fa-solid.fa-moon');
			nav.off('click');
			nav.on('click', function() {
				document.documentElement.setAttribute('data-theme', 'light');
				$(this).off('mouseenter');
				$(this).off('mouseout');
				$(this).removeClass('fa-moon selectedDark');
				$(this).addClass('fa-sun');
				$(this).addClass('flashMode');
				let nav = $('.fa-solid.fa-sun');
				nav.on('mouseout', nav.fn = function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', nav.fn = function(e) {
					toolTip.style.opacity = 1;
				});
				setTimeout(function() {
					let navNew = document.getElementsByClassName('flashMode')[0];
					$(navNew).removeClass('flashMode');
				}, 600);
				$(this).addClass('selectedLight');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s';
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					pullTabWrapper[0].style.transition = '1s';
					pullTabWrapper[0].style.left = '-11px';
					sideBar.removeClass('toggle');
				}
				sideBarNavLinks();
			});
		}
		if ($(this).hasClass('fas fa-house-user')) {
			let nav = $('.fas.fa-house-user');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.addClass('selected');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s';
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					sideBar.removeClass('toggle');
				}
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					if ($(document).find('canvas').length != 0) {
						killCanvas();
					}
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					topBarNav();
					sideBarNav();
					setTimeout(function() {
						loadCanvas();
					}, 5);
					bannerJustify();
					window.scrollTo(0, 0);
				});
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
			});
		}
		if ($(this).hasClass('fa fa-code')) {
			let nav = $('.fa.fa-code');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.addClass('selected');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s'
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					sideBar.removeClass('toggle');
				}
				fetch('/site/code.html')
				.then((response) => response.text())
				.then((text) => {
					if ($(document).find('canvas').length != 0) {
						killCanvas();
					}
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
				});
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
			});
		}
		if ($(this).hasClass('fa fa-linkedin')) {
			let nav = $('.fa.fa-linkedin');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = nav[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						sideBar[0].style.transition = '1s'
						sideBar[0].style.left = '-62px';
						sideBar.removeClass('toggle');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.mouseleave(function() {
					toolTip.style.opacity = null;
				});
				window.open("https://www.linkedin.com/in/chris-hren/");
			});
		}
		if ($(this).hasClass('fa fa-reddit-alien')) {
			let nav = $('.fa.fa-reddit-alien')[0];
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = nav[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						sideBar[0].style.transition = '1s'
						sideBar[0].style.left = '-62px';
						sideBar[0].style.top = '4px';
						sideBar.removeClass('toggle');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
				window.open("https://www.reddit.com/user/Richard_Musk/");
			});
		}		
		if ($(this).hasClass('fa fa-github-alt')) {
			let nav = $('.fa.fa-github-alt');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = nav[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						sideBar[0].style.transition = '1s'
						sideBar[0].style.left = '-62px';
						sideBar[0].style.top = '4px';
						sideBar.removeClass('toggle');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.mouseleave(function() {
					toolTip.style.opacity = null;
				});
				window.open("https://github.com/Maven158");
			});
		}		
		if ($(this).hasClass('fa fa-stack-overflow')) {
			let nav = $('.fa.fa-stack-overflow');
			if (nav.fn != '') {
				nav.fn = '';
			}
			nav.on('click', function() {
				console.log(nav);
				window.open("https://stackoverflow.com/users/18815704/maven");
				sideBar.find('i').each(function() {
					let toolTip = nav[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						sideBar[0].style.transition = '1s'
						sideBar[0].style.left = '-62px';
						sideBar[0].style.top = '4px';
						sideBar.removeClass('toggle');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
			});
		}
		if ($(this).hasClass('fa fa-file-alt')) {
			let nav = $('.fa.fa-file-alt');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.addClass('selected');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s'
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					sideBar.removeClass('toggle');
				}
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
				});
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
			});
		}
		if ($(this).hasClass('.fa fa-send')) {
			let nav = $('.fa.fa-send');
			nav.off('click');
			nav.on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				nav.off('mouseout');
				nav.off('mouseenter');
				nav.addClass('selected');
				let toolTip = nav[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					sideBar[0].style.transition = '1s'
					sideBar[0].style.left = '-62px';
					sideBar[0].style.top = '4px';
					sideBar.removeClass('toggle');
				}
				fetch('/site/contact.html')
				.then((response) => response.text())
				.then((text) => {
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					loadScript("app.js");
				});
				nav.on('mouseout', function(e) {
					toolTip.style.opacity = 0;
				});
				nav.on('mouseenter', function(e) {
					toolTip.style.opacity = 1;
				});
			});
		}
	});
};

function topBarNav() {
	siteNav.find('a').each(function() {	
		for(let i = 0; i < font.length; i++) {
			if ($(this).hasClass('mainNav')) {	
				if (window.innerWidth >= 435) {	
					changeFont(font[i], '1.1rem', '4px');
				}
				if (window.innerWidth < 435) {	
					changeFont(font[i], '1.0rem', '0px');
				}
				if (window.innerWidth < 400) {	
					changeFont(font[i], '0.9rem', '-4px');
				}
				if (window.innerWidth < 360) {	
					changeFont(font[i], '0.8rem', '-8px');
				}
				if (window.innerWidth < 325) {	
					changeFont(font[i], '0.7rem', '-10px');
				}
				if (window.innerWidth < 280) {	
					changeFont(font[i], '0.7rem', '-10px');
				}
			}
		}
	});
};

function topBarNavLinks() {
	siteNav.find('a').each(function() {
		if ($(this).hasClass('accolades')) {
			let nav = $('.accolades');
			nav.on('click', function() {
				fetch('/site/accolades.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[0];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('biography')) {
			let nav = $('.biography');
			nav.on('click', function() {
				fetch('/site/biography.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[0];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('resume')) {
			let nav = $('.resume');
			let sideNav = $('.fa.fa-file-alt');
			nav.on('click', function() {
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					sideBar.find('i').each(function() {
						if ($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						}
					});
					$(sideNav).addClass('flash');
					setTimeout(function() {
						$(sideNav).removeClass('flash');
					}, 600);
					$(sideNav).addClass('selected');
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						nav.closest('div > ul > li')[0].children[0].style.transitionDuration = '1s !important';
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[0];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('future')) {
			let nav = $('.future');
			nav.on('click', function() {
				fetch('/site/future.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[1];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('core')) {
			let nav = $('.core');
			nav.on('click', function() {
				fetch('/site/core.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[1];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('hrenovator')) {
			let nav = $('.hrenovator');
			let sideNav = $('.fa.fa-code');
			nav.on('click', function() {
				fetch('/site/hrenovator.html')
				.then((response) => response.text())
				.then((text) => {
					sideBar.find('i').each(function() {
						if ($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						}
					});
					$(sideNav).addClass('selected');
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[2];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('sandbox')) {
			let nav = $('.sandbox');
			let sideNav = $('.fa.fa-code');
			nav.on('click', function() {
				fetch('/site/sandbox.html')
				.then((response) => response.text())
				.then((text) => {
					sideBar.find('i').each(function() {
						if ($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						}
					});
					$(sideNav).addClass('selected');
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					loadSVG();
					responsiveSVG();
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[2];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('maven')) {
			let nav = $('.maven');
			let sideNav = $('.fa.fa-code');
			nav.on('click', function() {
				fetch('/site/maven.html')
				.then((response) => response.text())
				.then((text) => {
					sideBar.find('i').each(function() {
						if ($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						}
					});
					$(sideNav).addClass('selected');
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[2];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('linkedin')) {
			let nav = $('.linkedin');
			nav.on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('reddit')) {
			let nav = $('.reddit');
			nav.on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('github')) {
			let nav = $('.github');
			nav.on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('stackoverflow')) {
			let nav = $('.stackoverflow');
			nav.on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('contract')) {
			let nav = $('.contract');
			nav.on('click', function() {
				fetch('/site/contract.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
		if ($(this).hasClass('email')) {
			let nav = $('.email');
			nav.on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					nav.addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						nav.removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						siteNav.find('a').each(function() {
							$(this).removeClass('current');				
						});
						let list = $('.list')[3];
						$(list).fadeOut(600);
					}, 400);
				})
			});
		}
	});
};

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    if ($("script[src='" + src + "']").length === 0) {
        let script = document.createElement('script');
        script.onload = function() {
            resolve();
        };
        script.onerror = function() {
            reject();
        };
        script.src = src;
        document.body.appendChild(script);
    } else {
        resolve();
    }
	});
};

function loadSVG() {
	let injector = document.getElementsByClassName('svg-container')[0];
	var width = Math.floor(($(injector)[0].parentElement.parentElement.clientWidth) / 16);
	var numRowsCols
	injector.innerHTML = '';
	if (width > 40) {
		if ((width * 16 + 52) > (window.innerHeight - siteNav[0].clientHeight)) {
			console.log(window.innerHeight - siteNav[0].clientHeight);
			console.log((width * 16 + 52));
		}
		numRowsCols = 40;
	} else {
		if ((width * 16 + 52) > (window.innerHeight - siteNav[0].clientHeight)) {
			width = Math.floor((window.innerHeight - 80) / 16);
		}
		numRowsCols = width - 3;
	}
	let nodes = numRowsCols * numRowsCols;
	injector.setAttribute('style', `width: ${numRowsCols * 16}px; height: ${numRowsCols * 16}px`);
	for (let i = 0; i < nodes; i++) {
		injector.insertAdjacentHTML('beforeend',`<svg class="pinwheels" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 5 10 10" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="1em" height="1em" opacity="${(Math.random() * .75) + .25}" fill="#fd79a8" stroke="#e84393">
			<polygon points="0.006872,-4.766276 1.774639,-1.534043 5.006872,0.233724 1.774639,2.001491 0.006872,5.233724 -1.760895,2.001491 -4.993128,0.233724 -1.760895,-1.534043 0.006872,-4.766276" transform="matrix(.707107 0.707107-.707107 0.707107 10.167281 10.063597)" stroke-width="1"/>
			</svg>`);
	}
};

function responsiveSVG() {
	var palette = ['#fd79a8', '#55efc4', '#a29bfe', '#ffeaa7', '#81ecec', '#74b9ff'];
	var stroke = ['#e84393', '#00b894', '#6c5ce7', '#fdcb6e', '#00cec9', '#0984e3'];
	const feeler = document.getElementsByClassName('pinwheels');
	$(feeler).on('mouseenter', function(e) {
		$(this)[0].style.transition = '0s ease-in-out !important';
		$(this)[0].style.fill = `${palette[Math.floor(Math.random() * 6)]}`;
		$(this)[0].style.stroke = `${stroke[Math.floor(Math.random() * 6)]}`;
		$(this)[0].style.transform = `rotate(${Math.floor(Math.random() * 2160)}deg)`;
		$(this)[0].style.opacity = '1 !important';
	});
	$(feeler).on('mouseleave', function(e) {
		$(this)[0].style.transitionDelay = '.75s';
		$(this)[0].style.transform = '';
		$(this)[0].style.fill = '';
		$(this)[0].style.stroke = '';
	});
	$(feeler).on('touchmove', function(e) {
		e.preventDefault();
		const touches = e.changedTouches;
		const current = document.elementFromPoint(touches[0].pageX - window.scrollX, touches[0].pageY - window.scrollY);
		if ($(current).hasClass('pinwheels')) {
			$(current)[0].style.transition = '0s';
			$(current)[0].style.opacity = '1';
			$(current)[0].style.fill = `${palette[Math.floor(Math.random() * 6)]}`;
			$(current)[0].style.stroke = `${stroke[Math.floor(Math.random() * 6)]}`;
			$(current)[0].style.transform = `rotate(${Math.floor(Math.random() * 2160)}deg)`;
			setTimeout(function() {
				$(current)[0].style.transition = '2s';
				$(current)[0].style.transitionDelay = '.75s';
				$(current)[0].style.transform = '';
				$(current)[0].style.opacity = '';
				$(current)[0].style.fill = '';
				$(current)[0].style.stroke = '';
			}, 750);
		}
	});
	$(feeler).on('touchend', function(e) {
		e.preventDefault();
		$(this)[0].style.transitionDelay = '.75s';
		$(this)[0].style.transform = '';
		$(this)[0].style.opacity = '';
		$(this)[0].style.fill = '';
		$(this)[0].style.stroke = '';
	});
}

function initSparkling() {
	// settings
	// var stroke = ['#e84393', '#00b894', '#6c5ce7', '#fdcb6e', '#00cec9', '#0984e3'];
	const color = `#C0C0C0`;
	const stroke = '#D7EDE9';
	const svgPath = 'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';
	let sparkling = function() {
		$('.sparkling').each(function() {
			let sparklingElement = $(this);
			let stars = sparklingElement.find('.star');
			if (stars.length > 2) {
				stars.each(function(index) {
					if (index === 0) {
						$(this).remove();
					}
				});
			}
			sparklingElement.append(addStar());
		});
		let rand = Math.round(Math.random() * 1900) + 100;
		setTimeout(sparkling, rand);
	}
	let addStar = function() {
		let size = Math.floor(Math.random() * 20) + 10;
		let top = Math.floor(Math.random() * 100) - 5;
		let left = Math.floor(Math.random() * 100);
		return '<span class="star" style="top:' + top + '%; left:' + left + '%;">'
			+ '<svg width="' + size + '" height="' + size + '" viewBox="0 0 68 68" fill="none" stroke-width="2" stroke="' + stroke + '">'
			+ '<path d="' + svgPath + '" fill="' + color + '" /></svg></span>';
	}
	sparkling();
}

$(function() {
	initSparkling();
});

$(document).ready(function() {
	enableNav()
	topBarNav();
	topBarNavLinks();
	sideBarNav();
	sideBarNavLinks();
	bannerJustify();
	loadCanvas();
});

$(window).resize(function() {
	head = 4;
 	enableNav();
	bannerJustify();
	resizeCanvas();
	if ($(document).find('canvas').length != 0) {
		loadCanvas();
	}
	if ($(document).find('.svg-container').length != 0) {
		loadSVG();
		responsiveSVG();
	}
	topBarNav();
	topBarNavLinks();
	sideBarNav();
});