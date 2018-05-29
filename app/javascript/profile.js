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
    	let profileEl = createNewElement('div', PROFILE_ELEMENT),
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
    	document.querySelector('.experience').innerText = this.data.Experience;
		aboutEl.className = "profile-about-details";
    }
    loadWork(){
    	let workEl = clearContents();
    	workEl.innerText = "Under Construction..!!";
		workEl.className = "profile-work-details";
    }
    loadSkills(){
    	let skillsEl = clearContents();
    	skillsEl.innerText = "Under Construction..!!";
		skillsEl.className = "profile-skills-details";
    }
    loadContact(){
    	let contactEl = clearContents(),
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

		if(this.data.Contact.Social && this.data.Contact.Social.length > 0){
			this.data.Contact.Social.forEach((sObj)=>{
				let socialDiv = createNewElement('div', 'contactsocial'+sObj.Name),
					socialEl = createNewElement('a', 'socialanchorfor'+sObj.Name);
				socialEl.className = 'contact-social ' + sObj.Class;
				socialEl.href = sObj.Link;
				socialEl.target="_blank";
				socialEl.title=sObj.Name;

				socialDiv.appendChild(socialEl);
				social.appendChild(socialDiv);

			});
		}

		contactEl.appendChild(personal);
		contactEl.appendChild(social);

		contactEl.className = "profile-contact-details";
    }
}

function clearContents(){
	var el = document.getElementById('profilecontentbottom');
	while (el.firstChild) {
	    el.removeChild(el.firstChild);
	}

	el.className = '';
	return el;
}

function createContentSystem(data, callback){
	let containerEl = createNewElement('div', 'profilecontentcontainer'),
		divTopEl = createNewElement('div', 'profilecontenttop'),
		divBottomEl = createNewElement('div', 'profilecontentbottom');

	divTopEl.appendChild(createProfilePic());
	divTopEl.appendChild(createTitle());
	containerEl.appendChild(divTopEl);
	containerEl.appendChild(divBottomEl);

	return containerEl;
}

function createMenuSystem(data, callback){
	let items = data.Menu,
		containerEl = createNewElement('div', 'profilemenucontainer'),
		ulEl = createNewElement('ul', 'profilemenu');

	if(items.length > 0){
		items.forEach((item) => {
			let liEl = createNewElement('li', 'profilemenu'+item);
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
	let logoDesktop = createNewElement('img', 'profilelogonamev'),
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

function createProfilePic(){
	let profilePic = createNewElement('img', 'profilepic');

	profilePic.className = 'img-circle';
	profilePic.width = 100;
	profilePic.height = 100;
	profilePic.alt = 'Profile Pic';
	profilePic.src = PATH_TO_PROFILE_PIC;

	return profilePic;
}

function createTitle(){
	let stage = createNewElement('div', 'currentjobtitle');

	stage.className = 'stage';
	for(let l=1; l<=20 ; l++ ){

		let layer = createNewElement('div', 'layer_'+l);
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
