import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClone } from '@fortawesome/free-solid-svg-icons';

library.add(faClone);


class Clone extends Component {
    constructor (props){
        super(props);

        this.cloneValue = this.props.cloneValue;
        this.cssClass = this.props.cssClass;
        this.tooltip = this.props.tooltip;

        this.copyDetails = this.copyDetails.bind(this);

    }

    copyDetails(e){
        e.stopPropagation();
        let textArea = document.createElement("textarea");
        textArea.value = this.cloneValue;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }

    render() {
        return (
            <span className={this.cssClass} onClick={this.copyDetails} title={this.tooltip}>
                <FontAwesomeIcon icon="clone"/>
            </span>
        );
    }
}

export default Clone;