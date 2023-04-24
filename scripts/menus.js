import { resizeCanvas, loadCanvas, killCanvas } from './burst.js';

var sideBar = $('#sideBar');
var siteNav = $('#siteNav');
var pullTabWrapper = $('#pullTab-Wrapper');
var pullTab = $('#pullTab');
var font = $('.mainNav');
var newDoc = document.implementation.createHTMLDocument('doc').documentElement;
var head = 4;
var lastScrollTop = 0;
var touchStartPosX = 0;
var touchStartPosY = 0;
var revert;

window.addEventListener('scroll', function() {
	let state = window.pageYOffset || document.documentElement.scrollTop;
	if (state > lastScrollTop && Math.abs(state - lastScrollTop) > 5) {
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
	element.parentElement.children[1].children[0].style.marginTop = margin;
	element.parentElement.children[1].children[0].style.fontSize = '.7rem';
	element.parentElement.parentElement.style.height = 'fit-content';
	element.parentElement.parentElement.style.padding = '.5em 0em';
	if (document.getElementsByClassName('burstBox').length > 0) {
		onePage[0].style.marginTop = 28 + (2 * parseFloat(margin)) + 'px';
	}
	setTimeout(function() {
		element.style.transitionDuration = '1s';
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
		$(sideBar)[0].style.transition = '0s';
		$(sideBar)[0].style.top = '4px';
	}, 0);
	sideBarNavPullTabClick();
	sideBarNavPullTabSwipe();
	sideBarNavPullTabPosition();
};

function sideBarNavPullTabPosition() {
	if (window.innerHeight < 508) {
		if (head == 4) {
			let sideBarNavPullTabPosition = (((window.innerHeight - 80) / 2) / 504) * 100;
			$(pullTabWrapper)[0].style.top = sideBarNavPullTabPosition + '%';
		} else {
			let sideBarNavPullTabPosition = ((((window.innerHeight - 80) / 2) / 504) * 100) + ((512 - window.innerHeight) / 504) * 100;
			$(pullTabWrapper)[0].style.top = sideBarNavPullTabPosition + '%';
		}
	} else {
		let sideBarNavPullTabPosition = (((512 - 80) / 2) / 504) * 100;
		$(pullTabWrapper)[0].style.top = sideBarNavPullTabPosition + '%';
	}
};

function sideBarNavPullTabClick() {
	clearTimeout(revert);
	$(pullTabWrapper).off('click');
	if (window.innerWidth < 635) {
		$(pullTabWrapper).on('click', pullTabWrapper.fn = function clicked(element) {
			element.stopPropagation();
			element.preventDefault();
			if ($(sideBar).hasClass('toggle')) {
				$(sideBar).removeClass('toggle');
				$(pullTabWrapper)[0].style.display = 'flex';
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '-62px';
				$(sideBar)[0].style.top = '4px';
			} else if (!$(sideBar).hasClass('toggle')) {
				$(sideBar).addClass('toggle');
				sideBarNavSwipe();
				$(pullTabWrapper)[0].style.display = 'flex';
				$(sideBar)[0].style.transition = '1s';
				$(sideBar)[0].style.left = '4px';
				clearTimeout($.data(this));
				let highestId = window.setTimeout(() => {
					for (let i = highestId; i >= 0; i--) {
						window.clearInterval(i);
					}
				}, 0);
				revert = setTimeout(function() {
					if (window.innerWidth < 635) {
						if ($(sideBar).hasClass('toggle')) {
							$(sideBar).removeClass('toggle');
							$(pullTabWrapper)[0].style.display = 'flex';
							$(sideBar)[0].style.transition = '1s';
							$(sideBar)[0].style.left = '-62px';
							$(sideBar)[0].style.top = '4px';
							head = 4;
							sideBarNavPullTabPosition();
						}
					}
				}, 5000);
			}
		});
	} else if (window.innerWidth >= 635 && !$(sideBar).hasClass('toggle')) {
		$(sideBar).addClass('toggle');
		$(pullTabWrapper)[0].style.display = 'none';
		$(sideBar)[0].style.transition = '1s';
		$(sideBar)[0].style.left = '4px';
		$(sideBar)[0].style.top = '4px';
		$(pullTabWrapper).off('click');
		$(pullTabWrapper).off('touchmove');
	} else if (window.innerWidth >= 635 && $(sideBar).hasClass('toggle')) {
		$(pullTabWrapper)[0].style.display = 'none';
		$(sideBar)[0].style.transition = '1s';
		$(sideBar)[0].style.left = '4px';
		$(sideBar)[0].style.top = '4px';
		$(pullTabWrapper).off('click');
		$(pullTabWrapper).off('touchmove');
	}
	if (window.innerWidth < 635) {
		if ($(sideBar).hasClass('toggle')) {
			$(sideBar).removeClass('toggle');
			$(pullTabWrapper)[0].style.display = 'flex';
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '-62px';
			$(sideBar)[0].style.top = '4px';
		}
	}
	sideBarNavSwipe();
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
				if ($(sideBar).hasClass('toggle')) {
					$(sideBar).removeClass('toggle');
					$(pullTabWrapper)[0].style.display = 'flex';
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
				}
			} else if (!$(sideBar).hasClass('toggle')) {
					$(sideBar).addClass('toggle');
					sideBarNavSwipe();
					$(pullTabWrapper)[0].style.display = 'flex';
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '4px';
				}
			touchStartPosX = currentPageX;
		});
		pullTabWrapper.on('touchend', pullTabWrapper.fn = function swipeEnd(element) {
			clearTimeout(revert);
			revert = setTimeout(function() {
				if (window.innerWidth < 635) {
					if ($(sideBar).hasClass('toggle')) {
						$(sideBar).removeClass('toggle');
						$(pullTabWrapper)[0].style.display = 'flex';
						$(sideBar)[0].style.transition = '1s';
						$(sideBar)[0].style.left = '-62px';
						$(sideBar)[0].style.top = '4px';
						head = 4;
						sideBarNavPullTabPosition();
					}
				}
			}, 5000);
		});
	} else if (window.innerWidth >= 635 && !$(sideBar).hasClass('toggle')) {
		$(sideBar).addClass('toggle');
		$(sideBar)[0].style.transition = '1s';
		$(pullTabWrapper)[0].style.display = 'none';
		$(sideBar)[0].style.left = '4px';
		$(sideBar)[0].style.top = '4px';
		$(pullTabWrapper).off('click');
		$(pullTabWrapper).off('touchmove');
	} else if (window.innerWidth >= 635 && $(sideBar).hasClass('toggle')) {
		$(sideBar)[0].style.transition = '1s';
		$(pullTabWrapper)[0].style.display = 'none';
		$(pullTab)[0].style.opacity
		$(sideBar)[0].style.left = '4px';
		$(sideBar)[0].style.top = '4px';
		$(pullTabWrapper).off('click');
		$(pullTabWrapper).off('touchmove');
	}
	if (window.innerWidth < 635) {
		if ($(sideBar).hasClass('toggle')) {
			$(sideBar).removeClass('toggle');
			$(pullTabWrapper)[0].style.display = 'flex';
			$(sideBar)[0].style.transition = '1s';
			$(sideBar)[0].style.left = '-62px';
			$(sideBar)[0].style.top = '4px';
		}
	}
	sideBarNavSwipe();
};

function sideBarNavSwipe() {
	sideBar.off('touchmove');
	sideBar.off('touchend');
	if (window.innerHeight < 508 && $(sideBar).hasClass('toggle')) {
		sideBar.on('touchmove', sideBar.fn = function swipe(element) {
			element.stopPropagation();
			element.preventDefault();
			const currentPageY = Math.round(element.originalEvent.touches[0].screenY);
			if (touchStartPosY === currentPageY) return;
			if (touchStartPosY - currentPageY > 0) {
				head = window.innerHeight - 508;
				$(sideBar)[0].style.transition = '.2s';
				$(sideBar)[0].style.top = head + 'px';
				// $(sideBar)[0].style.transition = '0s';
				sideBarNavPullTabPosition();
			} else {
				head = 4;
				$(sideBar)[0].style.transition = '.2s';
				$(sideBar)[0].style.top = head + 'px';
				// $(sideBar)[0].style.transition = '0s';
				sideBarNavPullTabPosition();
			}
			touchStartPosY = currentPageY;
		});
		sideBar.on('touchend', sideBar.fn = function swipeEnd(element) {
			clearTimeout(revert);
			revert = setTimeout(function() {
				if (window.innerWidth >= 635) {
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.top = '4px';
					head = 4;
					sideBarNavPullTabPosition();
				} else {
					if ($(sideBar).hasClass('toggle')) {
						$(sideBar).removeClass('toggle');
						$(pullTabWrapper)[0].style.display = 'flex';
						$(sideBar)[0].style.transition = '1s';
						$(sideBar)[0].style.left = '-62px';
						$(sideBar)[0].style.top = '4px';
						head = 4;
						sideBarNavPullTabPosition();
					}
				}
			}, 5000);
		});
	}
	else if (window.innerHeight < 508 && !$(sideBar).hasClass('toggle')) {
		sideBar.off('touchmove');
	}
};

function sideBarNavLinks() {
	sideBar.find('i').each(function() {
		if ($(this).hasClass('fa-solid fa-sun')) {
			let nav = $('.fa-solid.fa-sun');
			$(nav).on('click', function() {
				document.documentElement.setAttribute('data-theme', 'dark');
				$(this).removeClass('fa-sun selectedLight');
				$(this).addClass('fa-moon flashDark');
				$(this).addClass('flashDark');
				let nav = $('.fa-solid.fa-moon');
				setTimeout(function() {
					let navNew = document.getElementsByClassName('flashDark')[0];
					$(navNew).removeClass('flashDark');
				}, 600);
				$(this).addClass('selectedDark');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
				}
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				$(nav).off();
				sideBarNavLinks();
			});
		}
		if ($(this).hasClass('fa-solid fa-moon')) {
			let nav = $('.fa-solid.fa-moon');
			$(nav).on('click', function() {
				document.documentElement.setAttribute('data-theme', 'light');
				$(this).removeClass('fa-moon selectedDark');
				$(this).addClass('fa-sun');
				$(this).addClass('flashLight');
				let nav = $('.fa-solid.fa-sun');
				setTimeout(function() {
					let navNew = document.getElementsByClassName('flashLight')[0];
					$(navNew).removeClass('flashLight');
				}, 600);
				$(this).addClass('selectedLight');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
				}
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				$(nav).off();
				sideBarNavLinks();
			});
		}
		if ($(this).hasClass('fas fa-house-user')) {
			let nav = $('.fas.fa-house-user');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).addClass('selected');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s';
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
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
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
			});
		}
		if ($(this).hasClass('fa fa-code')) {
			let nav = $('.fa.fa-code');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).addClass('selected');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s'
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
				}
				fetch('/site/code.html')
				.then((response) => response.text())
				.then((text) => {
					if ($(document).find('canvas').length != 0) {
						// killCanvas();
						document.getElementsByTagName('canvas')[0].remove();
					}
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
				});
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
			});
		}
		if ($(this).hasClass('fa fa-linkedin')) {
			let nav = $('.fa.fa-linkedin');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						$(sideBar)[0].style.transition = '1s'
						$(sideBar)[0].style.left = '-62px';
						$(sideBar).removeClass('toggle');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				window.open("https://www.linkedin.com/in/chris-hren/");
			});
		}
		if ($(this).hasClass('fa fa-reddit-alien')) {
			let nav = $('.fa.fa-reddit-alien')[0];
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						$(sideBar)[0].style.transition = '1s'
						$(sideBar)[0].style.left = '-62px';
						$(sideBar)[0].style.top = '4px';
						$(sideBar).removeClass('toggle');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				window.open("https://www.reddit.com/user/Richard_Musk/");
			});
		}		
		if ($(this).hasClass('fa fa-github-alt')) {
			let nav = $('.fa.fa-github-alt');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						$(sideBar)[0].style.transition = '1s'
						$(sideBar)[0].style.left = '-62px';
						$(sideBar)[0].style.top = '4px';
						$(sideBar).removeClass('toggle');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				window.open("https://github.com/Maven158");
			});
		}		
		if ($(this).hasClass('fa fa-stack-overflow')) {
			let nav = $('.fa.fa-stack-overflow');
			if ($(nav).fn != '') {
				$(nav).fn = '';
			}
			$(nav).on('click', function() {
				console.log($(nav));
				window.open("https://stackoverflow.com/users/18815704/maven");
				sideBar.find('i').each(function() {
					let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
					toolTip.style.opacity = '0';
					if (window.innerWidth < 635) {
						$(sideBar)[0].style.transition = '1s'
						$(sideBar)[0].style.left = '-62px';
						$(sideBar)[0].style.top = '4px';
						$(sideBar).removeClass('toggle');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
				
			});
		}
		if ($(this).hasClass('fa fa-file-alt')) {
			let nav = $('.fa.fa-file-alt');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).addClass('selected');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s'
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
				}
				fetch('/site/resume.html')
				.then((response) => response.text())
				.then((text) => {
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
				});
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
			});
		}
		if ($(this).hasClass('.fa fa-send')) {
			let nav = $('.fa.fa-send');
			$(nav).on('click', function() {
				sideBar.find('i').each(function() {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					}
				});
				$(nav).addClass('flash');
				setTimeout(function() {
					$(nav).removeClass('flash');
				}, 600);
				$(nav).addClass('selected');
				let toolTip = $(nav)[0].getElementsByClassName('tt')[0];
				toolTip.style.opacity = '0';
				if (window.innerWidth < 635) {
					$(sideBar)[0].style.transition = '1s'
					$(sideBar)[0].style.left = '-62px';
					$(sideBar)[0].style.top = '4px';
					$(sideBar).removeClass('toggle');
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
				$(nav).mouseleave(function() {
					toolTip.style.opacity = null;
				});
			});
		}
	});
};

function topBarNav() {
	siteNav.find('a').each(function() {	
		for(let i = 0; i < $(font).length; i++) {
			if ($(this).hasClass('mainNav')) {	
				if (window.innerWidth >= 435) {	
					changeFont($(font)[i], '1.1rem', '3px');
				}
				if (window.innerWidth < 435) {	
					changeFont($(font)[i], '1.0rem', '2px');
				}
				if (window.innerWidth < 400) {	
					changeFont($(font)[i], '0.9rem', '0px');
				}
				if (window.innerWidth < 360) {	
					changeFont($(font)[i], '0.8rem', '-2px');
				}
				if (window.innerWidth < 325) {	
					changeFont($(font)[i], '0.7rem', '-4px');
				}
				if (window.innerWidth < 280) {	
					changeFont($(font)[i], '0.7rem', '-4px');
				}
			}
		}
	});
};

function topBarNavLinks() {
	siteNav.find('a').each(function() {
		if ($(this).hasClass('accolades')) {
			let nav = $('.accolades');
			$(nav).on('click', function() {
				fetch('/site/accolades.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/biography.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
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
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
					}, 600);
				})
				.then(() => {
					setTimeout(function() {
						$(nav).closest('div > ul > li')[0].children[0].style.transitionDuration = '1s !important';
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
			$(nav).on('click', function() {
				fetch('/site/future.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/core.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/hrenovator.html')
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
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
		if ($(this).hasClass('neirman')) {
			let nav = $('.neirman');
			let sideNav = $('.fa.fa-code');
			$(nav).on('click', function() {
				fetch('/site/neirman.html')
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
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/maven.html')
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
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/contract.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
			$(nav).on('click', function() {
				fetch('/site/home.html')
				.then((response) => response.text())
				.then((text) => {
					$(nav).addClass('flash');
					newDoc.innerHTML = text;
					let str = newDoc.querySelector('#mainContent').outerHTML;
					$('#mainContent')[0].outerHTML = str;
					window.scrollTo(0, 0);
					setTimeout(function() {
						$(nav).removeClass('flash');
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
	topBarNav();
	topBarNavLinks();
	sideBarNav();
	
});