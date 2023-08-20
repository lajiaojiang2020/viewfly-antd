import { useRef } from '@viewfly/core'
import { vfTheme } from '../style/base.style'


const isNull = (value: string) => {
    return value === 'rgb(255, 255, 255)' || value === 'rgba(0, 0, 0, 0)'
}
/** 点击发散动画 */
export const useClickAnimateRef = () => {
    const ref = useRef<HTMLElement>(el => {
        const handleClick = () => {
            setTimeout(() => {
                const style = getComputedStyle(el, null);
                const colors = [style.backgroundColor, style.borderColor, style.color];
                const color = colors.find(c => !isNull(c)) || vfTheme.primaryColor;
                const oldboxShadow = el.style.boxShadow || '';
                const oldTransition = el.style.transition || '';
                el.style.boxShadow = `0 0 0 0.25rem ${color}`
                el.style.transition = 'box-shadow 0.5s';
                setTimeout(() => {
                    el.style.boxShadow = oldboxShadow;
                    el.style.transition = oldTransition;
                }, 500)
            }, 150)

        }
        el.addEventListener('click', handleClick, true)
        return () => el.removeEventListener('click', handleClick)
    })
    return ref;
}