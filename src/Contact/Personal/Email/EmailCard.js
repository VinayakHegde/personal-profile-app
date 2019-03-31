import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

import TargetAction from '../../../TargetAction/TargetAction';
import Clone from '../../../Clone/Clone';

library.add(faEnvelope);

class EmailCard extends Component {
    constructor (props){
        super(props);
        this.value = new this.defineValue('vinayak.nandi@gmail.com')
    }

    defineValue(raw){
        this.raw = prefix => {
            if(prefix && prefix.length){
                return prefix.concat(raw);
            }
            return raw;
        }
        this.display = raw.toUpperCase();
    }

    getCaption(){
        if(this.props.side === 'back'){
            return this.value.display;
        }

        return 'Email';
    }
    
    render() {
        return (this.getElement());
    }

    componentDidMount(){
        // TODO - show viewer tht card is flipable
        console.log('Email card did mount');
    }

    getElement(){
        if(this.props.side === 'back'){
            return (
                <div className={this.props.cssClssContent} key={this.props.side}>
                    <h2 onClick={this.props.fnClick}>{this.getCaption()}</h2>
                    <div className="actions-icon-wrapper">
                        <TargetAction targetValue={this.value.raw('mailto:')} 
                                    targetType="envelope"
                                    cssClass="actions-icon" 
                                    tooltip="Click to opem email client"/>
                        <Clone cloneValue={this.value.raw()} 
                            cssClass="actions-icon" 
                            tooltip="Copy my email to clipboard"/>
                    </div>
                </div>
            );
        }

        return (
            <div className={this.props.cssClssContent} onClick={this.props.fnClick} key={this.props.side}>
                <h2>{this.getCaption()}</h2>
                <div className="actions-icon-wrapper">
                    <span className="actions-icon"> 
                        <FontAwesomeIcon icon="envelope"/>
                    </span>
                </div>
            </div>
        );
    }
}

EmailCard.propTypes = {
    fnClick: PropTypes.func,
    side : PropTypes.string,
    cssClassContent : PropTypes.string
};

export default EmailCard;