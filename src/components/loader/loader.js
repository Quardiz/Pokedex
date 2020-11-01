import React from 'react'
import { observer } from 'mobx-react'
import './loader.css'
class Loader extends React.Component {
    render() {
        return <div id="progress-bar" style={{width: this.props.store.limit/4}}>
        <div id='progress' style={{width: this.props.store.pokecount/4, height: '1rem'}}>

        </div>
    </div>
    }
}

const ObserverLoader = observer(Loader);
export default ObserverLoader;