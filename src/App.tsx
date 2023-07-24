import { JSXInternal } from '@viewfly/core'
import { createApp } from '@viewfly/platform-browser';
import { RouterView } from './docs/router/RouterView';


const App: JSXInternal.ElementClass = () => {

    return () => <RouterView defaultPath='/home' />
}

createApp(document.getElementById('app') as HTMLElement, <App />)






