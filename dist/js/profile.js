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
var PROFILE_CONTENTS = 'profile-content';
var ELEMENT_DIV = 'div';
var ELEMENT_HEADER = 'header';
var ELEMENT_BODY = 'body';
var ELEMENT_SPAN = 'span';
var ELEMENT_ANCHOR = 'a';
var ELEMENT_ICON = 'i';
var ELEMENT_IMAGE = 'img';
var ELEMENT_UL = 'ul';
var ELEMENT_LI = 'li';
var ELEMENT_STRONG = 'strong';
var CLASS_NAME_ABOUT = 'profile-about-details';
var CLASS_NAME_WORK = 'profile-work-details';
var CLASS_NAME_SKILLS = 'profile-skills-details';
var CLASS_NAME_CONTACT = 'profile-contact-details';
var CLASS_NAME_CONTACT_PERSONAL = 'personal-contact-details';
var ID_CONTACT_PERSONAL = 'contactpersonal';
var ID_CONTACT_PHONE_ELEMENT = 'contactphoneelement';
var ID_CONTACT_PHONE_NUMBER = 'contactphonenumber';
var ID_CONTACT_PHONE_ICON = 'contactphoneicon';
var ID_CONTACT_EMAIL_ELEMENT = 'contactemailelement';
var ID_CONTACT_EMAIL_ADDRESS = 'contactemailaddress';
var ID_CONTACT_EMAIL_ICON = 'contactemailicon';
var ID_CONTACT_SOCIAL = 'contactsocial';
var QUERY_SELECTOR_CLASS_EXPERIENCE = '.experience';
var QUERY_SELECTOR_ID_PROFILE_CONTENT = '#profilecontentbottom';
var ID_PROFILE_CONTENT_CONTAINER = 'profilecontentcontainer';
var ID_PROFILE_CONTENT_TOP = 'profilecontenttop';
var ID_PROFILE_CONTENT_BOTTOM = 'profilecontentbottom';

var FA_ICON_PHONE = 'icon fas fa-mobile-alt';
var FA_ICON_EMAIL = 'icon far fa-envelope';

var ID_CONTACT_SOCIAL_FOR = 'socialanchorfor';
var ANCHOR_TARGET = '_blank';

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
			var profileEl = createNewElement(ELEMENT_DIV, PROFILE_ELEMENT),
			    leftEl = createNewElement(ELEMENT_HEADER, LEFT_ELEMENT),
			    rightEl = createNewElement(ELEMENT_DIV, RIGHT_ELEMENT);
			leftEl.className = PROFILE_CONTENTS;
			rightEl.className = PROFILE_CONTENTS;
			profileEl.appendChild(leftEl);
			profileEl.appendChild(rightEl);
			document.getElementById(ELEMENT_BODY).appendChild(profileEl);

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
			document.querySelector(QUERY_SELECTOR_CLASS_EXPERIENCE).innerText = this.data.Experience;
			aboutEl.className = CLASS_NAME_ABOUT;
		}
	}, {
		key: "loadWork",
		value: function loadWork() {
			var workEl = clearContents();
			workEl.innerText = "Under Construction..!!";
			workEl.className = CLASS_NAME_WORK;
		}
	}, {
		key: "loadSkills",
		value: function loadSkills() {
			var skillsEl = clearContents();

			if (this.data.Skills.length > 0) {
				this.data.Skills.forEach(function (skill) {
					var skillEl = createNewElement(ELEMENT_DIV, skill.Name.toLowerCase().replace(' ', '').replace('#', '').replace('.', '')),
					    skillIcon = createNewElement(ELEMENT_SPAN, 'skillicon'),
					    skillName = createNewElement(ELEMENT_SPAN, 'skillname'),
					    skillLevel = createNewElement(ELEMENT_SPAN, 'skilllevel');

					skillEl.className = 'personal-skill';
					skillIcon.className = skill.Class;
					skillName.className = 'personal-skill-name';
					skillName.innerText = skill.Name;
					skillLevel.className = 'personal-skill-level';

					skillEl.appendChild(skillIcon);
					skillEl.appendChild(skillName);
					// skillEl.appendChild(skillLevel);

					skillsEl.appendChild(skillEl);
				});
			}

			skillsEl.className = CLASS_NAME_SKILLS;
		}
	}, {
		key: "loadContact",
		value: function loadContact() {
			var contactEl = clearContents(),
			    personal = createNewElement(ELEMENT_DIV, ID_CONTACT_PERSONAL),
			    phoneEl = createNewElement(ELEMENT_DIV, ID_CONTACT_PHONE_ELEMENT),
			    phone = createNewElement(ELEMENT_SPAN, ID_CONTACT_PHONE_NUMBER),
			    phoneIcon = createNewElement(ELEMENT_ICON, ID_CONTACT_PHONE_ICON),
			    emailEl = createNewElement(ELEMENT_DIV, ID_CONTACT_EMAIL_ELEMENT),
			    email = createNewElement(ELEMENT_SPAN, ID_CONTACT_EMAIL_ADDRESS),
			    emailIcon = createNewElement(ELEMENT_ICON, ID_CONTACT_EMAIL_ICON),
			    social = createNewElement(ELEMENT_DIV, ID_CONTACT_SOCIAL);

			phoneIcon.className = FA_ICON_PHONE;
			phone.innerText = this.data.Contact.Phone.Mobile;
			phone.className = CLASS_NAME_CONTACT_PERSONAL;
			phoneEl.appendChild(phoneIcon);
			phoneEl.appendChild(phone);

			emailIcon.className = FA_ICON_EMAIL;
			email.innerText = this.data.Contact.Email;
			email.className = CLASS_NAME_CONTACT_PERSONAL;
			emailEl.appendChild(emailIcon);
			emailEl.appendChild(email);

			personal.appendChild(phoneEl);
			personal.appendChild(emailEl);

			if (this.data.Contact.Social && this.data.Contact.Social.length > 0) {
				this.data.Contact.Social.forEach(function (sObj) {
					var socialDiv = createNewElement(ELEMENT_DIV, ID_CONTACT_SOCIAL + sObj.Name),
					    socialEl = createNewElement(ELEMENT_ANCHOR, ID_CONTACT_SOCIAL_FOR + sObj.Name);
					socialEl.className = sObj.Class;
					socialEl.href = sObj.Link;
					socialEl.target = ANCHOR_TARGET;
					socialEl.title = sObj.Name;

					socialDiv.appendChild(socialEl);
					social.appendChild(socialDiv);
				});
			}

			contactEl.appendChild(personal);
			contactEl.appendChild(social);

			contactEl.className = CLASS_NAME_CONTACT;
		}
	}]);

	return Profile;
}();

function clearContents() {
	var el = document.querySelector(QUERY_SELECTOR_ID_PROFILE_CONTENT);
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}

	el.className = '';
	return el;
}

function createContentSystem(data, callback) {
	var containerEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_CONTAINER),
	    divTopEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_TOP),
	    divBottomEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_BOTTOM);

	divTopEl.appendChild(createProfilePic());
	divTopEl.appendChild(createTitle());
	containerEl.appendChild(divTopEl);
	containerEl.appendChild(divBottomEl);

	return containerEl;
}

function createMenuSystem(data, callback) {
	var items = data.Menu,
	    containerEl = createNewElement(ELEMENT_DIV, 'profilemenucontainer'),
	    ulEl = createNewElement(ELEMENT_UL, 'profilemenu');

	if (items.length > 0) {
		items.forEach(function (item) {
			var liEl = createNewElement(ELEMENT_LI, 'profilemenu' + item);
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
	var logoDesktop = createNewElement(ELEMENT_IMAGE, 'profilelogonamev'),
	    logoMobile = createNewElement(ELEMENT_IMAGE, 'profilelogonameh'),
	    logoWrapper = createNewElement(ELEMENT_STRONG, 'profilelogowrapper'),
	    logoAnchor = createNewElement(ELEMENT_ANCHOR, 'profilelogoanchor');

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
	var profilePic = createNewElement(ELEMENT_IMAGE, 'profilepic');

	profilePic.className = 'img-circle';
	profilePic.width = 100;
	profilePic.height = 100;
	profilePic.alt = 'Profile Pic';
	profilePic.src = PATH_TO_PROFILE_PIC;

	return profilePic;
}

function createTitle() {
	var stage = createNewElement(ELEMENT_DIV, 'currentjobtitle');

	stage.className = 'stage';
	for (var l = 1; l <= 20; l++) {

		var layer = createNewElement(ELEMENT_DIV, 'layer_' + l);
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