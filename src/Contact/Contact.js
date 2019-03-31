import './Contact.css';
import Personal from './Personal/Personal';
import Social from './Social/Social';

import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <article className="profile-content">
                <div className="contacts-wrapper">
                    <Personal/>
                    <Social/>
                </div>
            </article>
        );
    }
}

export default Contact;