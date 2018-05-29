'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PATH_TO_PROFILE_DATA = "./dist/data/profile.json";
var PATH_TO_PROFILE_PIC = "./dist/data/profile-pic.jpg";
var PATH_TO_PROFILE_LOGO_NAME_MOBILE = "./dist/data/profile-name-h.png";
var PATH_TO_PROFILE_LOGO_NAME_DESKTOP = "./dist/data/profile-name-v.png";
var PROFILE_ELEMENT = "profileEl";
var LEFT_ELEMENT = "leftEl";
var RIGHT_ELEMENT = "rightEl";
var MIME_TYPE_JSON = "application/json";
var STATUS_DONE = 4;
var STATUS_OK = "200";
var METHOD_GET = "GET";
var DOCUMENT_TITLE = "'s Profile";
var MENU_ABOUT = 'About';
var MENU_WORK = 'Work';
var MENU_SKILLS = 'Skills';
var MENU_CONTACT = 'Contact';

var Profile = function () {
	function Profile() {
		var _this = this;

		_classCallCheck(this, Profile);

		loadJson(PATH_TO_PROFILE_DATA, function (data) {
			// Parse JSON string into object
			_this.data = JSON.parse(data);

			if (_this.data.FirstName) {
				document.title = _this.data.FirstName + DOCUMENT_TITLE;
			}

			_this.render();
		});
	}

	_createClass(Profile, [{
		key: "render",
		value: function render() {
			var profileEl = createNewElement('div', PROFILE_ELEMENT),
			    leftEl = createNewElement('header', LEFT_ELEMENT),
			    rightEl = createNewElement('div', RIGHT_ELEMENT);
			leftEl.className = 'profile-content';
			rightEl.className = 'profile-content';
			profileEl.appendChild(leftEl);
			profileEl.appendChild(rightEl);
			document.getElementById('body').appendChild(profileEl);

			rightEl.appendChild(createContentSystem(this.data));
			leftEl.appendChild(createMenuSystem(this.data, this.loadContent.bind(this)));
			return this;
		}
	}, {
		key: "loadContent",
		value: function loadContent(contentFor) {
			switch (contentFor) {
				case MENU_ABOUT:
					this.loadAbout();
					break;
				case MENU_WORK:
					this.loadWork();
					break;
				case MENU_SKILLS:
					this.loadSkills();
					break;
				case MENU_CONTACT:
					this.loadContact();
					break;
				default:
					break;
			}
		}
	}, {
		key: "loadAbout",
		value: function loadAbout() {
			var aboutEl = clearContents();
			aboutEl.innerHTML = this.data.About;
			document.querySelector('.experience').innerText = this.data.Experience;
			aboutEl.className = "profile-about-details";
		}
	}, {
		key: "loadWork",
		value: function loadWork() {
			var workEl = clearContents();
			workEl.innerText = "Under Construction..!!";
			workEl.className = "profile-work-details";
		}
	}, {
		key: "loadSkills",
		value: function loadSkills() {
			var skillsEl = clearContents();
			skillsEl.innerText = "Under Construction..!!";
			skillsEl.className = "profile-skills-details";
		}
	}, {
		key: "loadContact",
		value: function loadContact() {
			var contactEl = clearContents(),
			    personal = createNewElement('div', 'contactpersonal'),
			    phoneEl = createNewElement('div', 'contactphoneelement'),
			    phone = createNewElement('span', 'contactphonenumber'),
			    phoneIcon = createNewElement('i', 'contactphoneicon'),
			    emailEl = createNewElement('div', 'contactemailelement'),
			    email = createNewElement('span', 'contactemailaddress'),
			    emailIcon = createNewElement('i', 'contactphoneicon'),
			    social = createNewElement('div', 'contactsocial');

			phoneIcon.className = "fa fa-mobile";
			phone.innerText = this.data.Contact.Phone.Mobile;
			phone.className = "personal-contact-details";
			phoneEl.appendChild(phoneIcon);
			phoneEl.appendChild(phone);

			emailIcon.className = "fa fa-envelope-o";
			email.innerText = this.data.Contact.Email;
			email.className = "personal-contact-details";
			emailEl.appendChild(emailIcon);
			emailEl.appendChild(email);

			personal.appendChild(phoneEl);
			personal.appendChild(emailEl);

			if (this.data.Contact.Social && this.data.Contact.Social.length > 0) {
				this.data.Contact.Social.forEach(function (sObj) {
					var socialDiv = createNewElement('div', 'contactsocial' + sObj.Name),
					    socialEl = createNewElement('a', 'socialanchorfor' + sObj.Name);
					socialEl.className = 'contact-social ' + sObj.Class;
					socialEl.href = sObj.Link;
					socialEl.target = "_blank";
					socialEl.title = sObj.Name;

					socialDiv.appendChild(socialEl);
					social.appendChild(socialDiv);
				});
			}

			contactEl.appendChild(personal);
			contactEl.appendChild(social);

			contactEl.className = "profile-contact-details";
		}
	}]);

	return Profile;
}();

function clearContents() {
	var el = document.getElementById('profilecontentbottom');
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}

	el.className = '';
	return el;
}

function createContentSystem(data, callback) {
	var containerEl = createNewElement('div', 'profilecontentcontainer'),
	    divTopEl = createNewElement('div', 'profilecontenttop'),
	    divBottomEl = createNewElement('div', 'profilecontentbottom');

	divTopEl.appendChild(createProfilePic());
	divTopEl.appendChild(createTitle());
	containerEl.appendChild(divTopEl);
	containerEl.appendChild(divBottomEl);

	return containerEl;
}

function createMenuSystem(data, callback) {
	var items = data.Menu,
	    containerEl = createNewElement('div', 'profilemenucontainer'),
	    ulEl = createNewElement('ul', 'profilemenu');

	if (items.length > 0) {
		items.forEach(function (item) {
			var liEl = createNewElement('li', 'profilemenu' + item);
			liEl.innerText = item;
			liEl.setAttribute('data', 'menu-name:' + item);

			liEl.addEventListener('click', function (evt) {
				Array.from(evt.target.parentElement.children).forEach(function (li) {
					li.classList.remove("active-item");
				});

				evt.target.className = "active-item";
				callback(evt.target.id.replace("profilemenu", ''));
			});

			ulEl.appendChild(liEl);
		});
		ulEl.firstChild.click();
	}

	containerEl.appendChild(ulEl);
	containerEl.appendChild(createNameLogo());

	return containerEl;
}

function createNameLogo() {
	var logoDesktop = createNewElement('img', 'profilelogonamev'),
	    logoMobile = createNewElement('img', 'profilelogonameh'),
	    logoWrapper = createNewElement('strong', 'profilelogowrapper'),
	    logoAnchor = createNewElement('a', 'profilelogoanchor');

	logoDesktop.className = 'profile-logo-name-v';
	logoDesktop.alt = 'Name Logo';
	logoDesktop.src = PATH_TO_PROFILE_LOGO_NAME_DESKTOP;

	logoMobile.className = 'profile-logo-name-h';
	logoMobile.alt = 'Name Logo';
	logoMobile.src = PATH_TO_PROFILE_LOGO_NAME_MOBILE;

	logoWrapper.appendChild(logoDesktop);
	logoWrapper.appendChild(logoMobile);

	logoAnchor.appendChild(logoWrapper);

	return logoAnchor;
}

function createProfilePic() {
	var profilePic = createNewElement('img', 'profilepic');

	profilePic.className = 'img-circle';
	profilePic.width = 100;
	profilePic.height = 100;
	profilePic.alt = 'Profile Pic';
	profilePic.src = PATH_TO_PROFILE_PIC;

	return profilePic;
}

function createTitle() {
	var stage = createNewElement('div', 'currentjobtitle');

	stage.className = 'stage';
	for (var l = 1; l <= 20; l++) {

		var layer = createNewElement('div', 'layer_' + l);
		layer.className = 'layer';

		stage.appendChild(layer);
	}

	return stage;
}

function createNewElement(name, id) {
	var element = document.createElement(name);
	element.id = id;
	return element;
}

function loadJson(pathToJsonFile, callback) {
	var xobj = new XMLHttpRequest();

	xobj.overrideMimeType(MIME_TYPE_JSON);
	xobj.open(METHOD_GET, pathToJsonFile, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == STATUS_DONE && xobj.status == STATUS_OK) {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

window.addEventListener('DOMContentLoaded', function () {
	return new Profile();
});