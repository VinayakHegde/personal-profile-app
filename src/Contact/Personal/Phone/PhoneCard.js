import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import TargetAction from '../../../TargetAction/TargetAction';
import Clone from '../../../Clone/Clone';

library.add(faMobileAlt);

class PhoneCard extends Component {
    constructor (props){
        super(props);
        this.value = new this.defineValue('+447508207800', '+44 (0) 750-820-7800')
    }

    defineValue(raw, display){
        this.raw = prefix => {
            if(prefix && prefix.length){
                return prefix.concat(raw);
            }
            return raw;
        }
        this.display = display;
    }

    getCaption(){
        if(this.props.side === 'back'){
            return this.value.display;
        }

        return 'Phone';
    }

    render() {
        return (this.getElement());
    }

    componentDidMount(){
        // TODO - show viewer tht card is flipable
        console.log('Phone card did mount');
    }

    getElement(){
        if(this.props.side === 'back'){
            return (
                <div className={this.props.cssClssContent} key={this.props.side}>
                    <h2 onClick={this.props.fnClick}>{this.getCaption()}</h2>
                    <div className="actions-icon-wrapper">
                        <TargetAction targetValue={this.value.raw('tel:')} 
                                    targetType="phone"
                                    cssClass="actions-icon" 
                                    tooltip="Click to ring me"/>
                        <Clone cloneValue={this.value.raw()} 
                            cssClass="actions-icon" 
                            tooltip="Copy my number to clipboard"/>
                    </div>
                </div>
            );
        }

        return (
            <div className={this.props.cssClssContent} onClick={this.props.fnClick} key={this.props.side}>
                <h2>{this.getCaption()}</h2>
                <div className="actions-icon-wrapper">
                    <span className="actions-icon"> 
                        <FontAwesomeIcon icon="mobile-alt"/>
                    </span>
                </div>
            </div>
        );
    }
}
PhoneCard.propTypes = {
    fnClick: PropTypes.func,
    side : PropTypes.string,
    cssClassContent : PropTypes.string
};
export default PhoneCard;