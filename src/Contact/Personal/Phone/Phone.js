import React, { Component } from 'react';

import FlipCard from '../../../FlipCard/FlipCard';
import PhoneCard from './PhoneCard';

class Phone extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
    }

    showBack(e) {
        e.preventDefault();
        this.setState({ isFlipped: true });
    }

    showFront(e) {
        e.preventDefault();
        this.setState({ isFlipped: false });
    }

    render() {
        return (
            <div className="phone-wrapper">
                <FlipCard isFlipped={this.state.isFlipped} >
                    <PhoneCard cssClassContent="flip-card-content"
                               fnClick={this.showBack.bind(this)}
                               side="front"/>
                    <PhoneCard cssClassContent="flip-card-content"
                               fnClick={this.showFront.bind(this)}
                               side="back"/>
                </FlipCard>
            </div>
        );
    }
}

export default Phone;