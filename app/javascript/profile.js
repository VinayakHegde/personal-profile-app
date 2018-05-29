'use strict';

const PATH_TO_PROFILE_DATA = "./dist/data/profile.json";
const PATH_TO_PROFILE_PIC = "./dist/data/profile-pic.jpg";
const PATH_TO_PROFILE_LOGO_NAME_MOBILE= "./dist/data/profile-name-h.png";
const PATH_TO_PROFILE_LOGO_NAME_DESKTOP= "./dist/data/profile-name-v.png";
const PROFILE_ELEMENT = "profileEl";
const LEFT_ELEMENT = "leftEl";
const RIGHT_ELEMENT = "rightEl";
const MIME_TYPE_JSON = "application/json";
const STATUS_DONE = 4;
const STATUS_OK = "200";
const METHOD_GET = "GET";
const DOCUMENT_TITLE = "'s Profile";
const MENU_ABOUT = 'About';
const MENU_WORK = 'Work';
const MENU_SKILLS = 'Skills';
const MENU_CONTACT = 'Contact';
const PROFILE_CONTENTS = 'profile-content';
const ELEMENT_DIV = 'div';
const ELEMENT_HEADER = 'header';
const ELEMENT_BODY = 'body';
const ELEMENT_SPAN = 'span';
const ELEMENT_ANCHOR = 'a';
const ELEMENT_ICON = 'i';
const ELEMENT_IMAGE = 'img';
const ELEMENT_UL = 'ul';
const ELEMENT_LI = 'li';
const ELEMENT_STRONG = 'strong';
const CLASS_NAME_ABOUT = 'profile-about-details';
const CLASS_NAME_WORK = 'profile-work-details';
const CLASS_NAME_SKILLS = 'profile-skills-details';
const CLASS_NAME_CONTACT = 'profile-contact-details';
const CLASS_NAME_CONTACT_PERSONAL ='personal-contact-details';
const ID_CONTACT_PERSONAL = 'contactpersonal';
const ID_CONTACT_PHONE_ELEMENT = 'contactphoneelement';
const ID_CONTACT_PHONE_NUMBER = 'contactphonenumber';
const ID_CONTACT_PHONE_ICON = 'contactphoneicon';
const ID_CONTACT_EMAIL_ELEMENT = 'contactemailelement';
const ID_CONTACT_EMAIL_ADDRESS = 'contactemailaddress';
const ID_CONTACT_EMAIL_ICON = 'contactemailicon';
const ID_CONTACT_SOCIAL = 'contactsocial';
const QUERY_SELECTOR_CLASS_EXPERIENCE = '.experience';
const QUERY_SELECTOR_ID_PROFILE_CONTENT = '#profilecontentbottom';
const ID_PROFILE_CONTENT_CONTAINER = 'profilecontentcontainer';
const ID_PROFILE_CONTENT_TOP = 'profilecontenttop';
const ID_PROFILE_CONTENT_BOTTOM = 'profilecontentbottom';

const FA_ICON_PHONE = 'fa fa-mobile';
const FA_ICON_EMAIL = 'fa fa-envelope-o';

const ID_CONTACT_SOCIAL_FOR = 'socialanchorfor';
const ANCHOR_TARGET = '_blank';

class Profile {
    constructor () {
    	loadJson(PATH_TO_PROFILE_DATA, (data) => {
		  	// Parse JSON string into object
		    this.data = JSON.parse(data);

		    if(this.data.FirstName){
			    document.title = this.data.FirstName + DOCUMENT_TITLE;
		    }

		    this.render();
		 });
    }
    render() {
    	let profileEl = createNewElement(ELEMENT_DIV, PROFILE_ELEMENT),
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
    loadContent(contentFor){
		switch(contentFor){
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
			default: break;
		}
    }

    loadAbout(){
    	let aboutEl = clearContents();
    	aboutEl.innerHTML = this.data.About;
    	document.querySelector(QUERY_SELECTOR_CLASS_EXPERIENCE).innerText = this.data.Experience;
		aboutEl.className = CLASS_NAME_ABOUT;
    }
    loadWork(){
    	let workEl = clearContents();
    	workEl.innerText = "Under Construction..!!";
		workEl.className = CLASS_NAME_WORK;
    }
    loadSkills(){
    	let skillsEl = clearContents();
    	skillsEl.innerText = "Under Construction..!!";
		skillsEl.className = CLASS_NAME_SKILLS;
    }
    loadContact(){
    	let contactEl = clearContents(),
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

		if(this.data.Contact.Social && this.data.Contact.Social.length > 0){
			this.data.Contact.Social.forEach((sObj)=>{
				let socialDiv = createNewElement(ELEMENT_DIV, ID_CONTACT_SOCIAL+sObj.Name),
					socialEl = createNewElement(ELEMENT_ANCHOR, ID_CONTACT_SOCIAL_FOR+sObj.Name);
				socialEl.className = sObj.Class;
				socialEl.href = sObj.Link;
				socialEl.target=ANCHOR_TARGET;
				socialEl.title=sObj.Name;

				socialDiv.appendChild(socialEl);
				social.appendChild(socialDiv);

			});
		}

		contactEl.appendChild(personal);
		contactEl.appendChild(social);

		contactEl.className = CLASS_NAME_CONTACT;
    }
}

function clearContents(){
	var el = document.querySelector(QUERY_SELECTOR_ID_PROFILE_CONTENT);
	while (el.firstChild) {
	    el.removeChild(el.firstChild);
	}

	el.className = '';
	return el;
}

function createContentSystem(data, callback){
	let containerEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_CONTAINER),
		divTopEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_TOP),
		divBottomEl = createNewElement(ELEMENT_DIV, ID_PROFILE_CONTENT_BOTTOM);

	divTopEl.appendChild(createProfilePic());
	divTopEl.appendChild(createTitle());
	containerEl.appendChild(divTopEl);
	containerEl.appendChild(divBottomEl);

	return containerEl;
}

function createMenuSystem(data, callback){
	let items = data.Menu,
		containerEl = createNewElement(ELEMENT_DIV, 'profilemenucontainer'),
		ulEl = createNewElement(ELEMENT_UL, 'profilemenu');

	if(items.length > 0){
		items.forEach((item) => {
			let liEl = createNewElement(ELEMENT_LI, 'profilemenu'+item);
			liEl.innerText = item;
			liEl.setAttribute('data', 'menu-name:' + item);

			liEl.addEventListener('click', (evt) =>{
				Array.from(evt.target.parentElement.children).forEach((li)=>{
					li.classList.remove("active-item");
				});

				evt.target.className = "active-item";
				callback(evt.target.id.replace("profilemenu",''));
			});

			ulEl.appendChild(liEl);
		});
		ulEl.firstChild.click();
	}

	containerEl.appendChild(ulEl);
	containerEl.appendChild(createNameLogo());

	return containerEl;
}

function createNameLogo(){
	let logoDesktop = createNewElement(ELEMENT_IMAGE, 'profilelogonamev'),
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

function createProfilePic(){
	let profilePic = createNewElement(ELEMENT_IMAGE, 'profilepic');

	profilePic.className = 'img-circle';
	profilePic.width = 100;
	profilePic.height = 100;
	profilePic.alt = 'Profile Pic';
	profilePic.src = PATH_TO_PROFILE_PIC;

	return profilePic;
}

function createTitle(){
	let stage = createNewElement(ELEMENT_DIV, 'currentjobtitle');

	stage.className = 'stage';
	for(let l=1; l<=20 ; l++ ){

		let layer = createNewElement(ELEMENT_DIV, 'layer_'+l);
		layer.className = 'layer';

		stage.appendChild(layer);
	}

	return stage;

}

function createNewElement(name, id){
	let element = document.createElement(name);
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

window.addEventListener('DOMContentLoaded', () => new Profile());
