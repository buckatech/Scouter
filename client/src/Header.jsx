import React, {Component} from 'react';

class Header extends Component {

    render() {

        return(
        <div className="header">
            <div className="date">
                <span>hi</span>
            </div>
            <button value="Refresh Page" className="refresh" onClick={() => {window.location.reload()}}>
            <img src={ require('./docs/refresh.png') } alt="refresh"/>
            </button>
        </div>
        )
    }
}

export default Header