import './Personal.css';
import Phone from './Phone/Phone';
import Email from './Email/Email';

import React, { Component } from 'react';

class Personal extends Component {
    render() {
        return (
            <aside className="personal-contacts">
                <Phone/>
                <Email/>
            </aside>
        );
    }
}

export default Personal;