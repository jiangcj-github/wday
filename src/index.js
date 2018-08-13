import React from 'react';
import {render} from 'react-dom';
import {RUNAPP, Websocket, Storage} from './core'
import "whatwg-fetch";
import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from './config/HttpConfig'
import LoopTaskConfig from './config/LoopTaskConfig'
import StorageConfig from './config/StorageConfig'
import './class/lib/Prototype'

let str = Date.now() + '-' + Math.random().toString(36).substr(2);

const renderDom = async Component => {

    await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig, LoopTaskConfig, StorageConfig});
    WebSocketConfig.useWebSocket && Websocket.general({test: str});

    render(
        <Component />,
        document.getElementById('app')
    )
};

import ('./App').then(Component => renderDom(Component.default))




