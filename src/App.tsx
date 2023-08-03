import { JSXInternal } from '@viewfly/core'
import { createApp } from '@viewfly/platform-browser';
import { RouterView } from './docs/router/RouterView';


const App: JSXInternal.ComponentConstructor = () => {
    return () => <RouterView defaultPath='/home' />
}



createApp(<App />).mount(document.getElementById('app') as HTMLElement)






