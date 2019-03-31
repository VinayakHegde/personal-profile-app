import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add([faPhone, faEnvelope]);

class TargetAction extends Component {
    constructor (props){
        super(props);

        this.targetValue = this.props.targetValue;
        this.cssClass = this.props.cssClass;
        this.tooltip = this.props.tooltip;

        this.stopPropagation = this.stopPropagation.bind(this);

    }
    
    stopPropagation(e){
        e.stopPropagation();
        // show toast msg 
    }

    render() {
        return (
            <a className={this.props.cssClass} href={this.props.targetValue} onClick={this.stopPropagation} target="_blank" rel="noopener noreferrer" title={this.props.tooltip}>
                <FontAwesomeIcon icon={this.props.targetType}/>
            </a>
        );
    }
}

TargetAction.propTypes = {
    targetType : PropTypes.string,
    targetValue : PropTypes.string,
    cssClass : PropTypes.string,
    tooltip : PropTypes.string
}

export default TargetAction;