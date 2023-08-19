import { useRef } from '@viewfly/core'
import { useStyleSheetContext } from '../defineStyleSheet'
import { defineAnimate, defineStyleSheet } from '../style/base.style'

const puffOut = defineAnimate({
    0: {
        opacity: 1,
        transformOrigin: '50% 50%',
        transform: 'scale(1,1)',
        filter: 'blur(0px)'
    },
    100: {
        opacity: 0,
        transformOrigin: '50% 50%',
        transform: 'scale(1.5,1.5)',
        filter: 'blur(2px)',
    }
})

const styles = defineStyleSheet('click-puff-out', () => {
    const { s, define, className } = useStyleSheetContext()
    const name = className();
    define(s(name), {
        pointerEvents: 'none',
        zIndex: 99999,
        animationName: puffOut(),
        animationFillMode: 'both',
        animationDuration: '0.5s'
    })
    return { name }
})

/** 点击发散动画 */
export const useClickAnimateRef = () => {
    const ref = useRef<HTMLElement>(el => {
        const handleClick = () => {
            const rect = el.getBoundingClientRect();
            console.log(rect)
            const node = el.cloneNode(true) as HTMLElement;
            node.style.position = 'fixed'
            node.style.width = rect.width + 'px';
            node.style.height = rect.height + 'px';
            node.style.top = rect.top + 'px';
            node.style.left = rect.left + 'px';
            node.classList.add(styles.name);
            node.classList.add('active');
            document.body.append(node);
            setTimeout(() => node.parentElement?.removeChild(node), 500)
        }
        el.addEventListener('click', handleClick, true)
        return () => el.removeEventListener('click', handleClick)
    })
    return ref;
}