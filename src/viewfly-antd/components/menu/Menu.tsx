import { FC, JSXNode, Key } from "@antd/viewfly/ui"
import { HTMLAttributes } from "@viewfly/platform-browser"
import { menuStyles } from "./Menu.style"
import { inject, onPropsChanged, provide, useSignal, InjectionToken, JSXInternal, onDestroy } from "@viewfly/core"


const indent = 12
/**
 * @api
 */
export interface MenuItem {
    /** 唯一标识符 */
    key?: Key
    /** 标题 */
    title?: JSXNode
    /** 小标题 */
    label?: JSXNode
    /** 类型 */
    type?: 'divider' | 'group'
    /** 图标 */
    icon?: JSXNode
    /** 是否禁用
     * @default false
     */
    disabled?: boolean
    /** 子节点 */
    children?: MenuItem[]
}
const MenuToken = new InjectionToken<MenuSate>('MenuToken')
class MenuSate {

    public state = {
        items: useSignal<MenuItem[]>([]),
        openKeys: useSignal<Key[]>([])
    }
    /** 是否展开*/
    public isOpen = (key: Key) => {
        const openKeys = this.state.openKeys();
        return openKeys.includes(key)
    }

    /**  收起菜单 */
    public actionOnClick = (key: Key) => {
        const openKeys = this.state.openKeys();
        const i = openKeys.indexOf(key)
        i === -1 ? openKeys.push(key) : openKeys.splice(i, 1);
        this.state.openKeys.set([...openKeys])
    }

    update = (props?: Omit<MenuSate, 'update'>) => {
        const _this = this as any;
        const _props = props as any;
        if (props) {
            for (let i in _props) {
                _this.state[i]?.set(_props[i])
            }
        }
    }
}
export interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
    items: MenuItem[]
    openKeys?: Key[]
}
/** 菜单 */
export const Menu: FC<MenuProps> = (props) => {
    const MenuController = new MenuSate();
    const app = provide({
        provide: MenuToken,
        useValue: MenuController
    });
    onPropsChanged<MenuProps>((p) => {
        MenuController.update(p as any)
    })
    onDestroy(() => {
        app.destroy();
    })
    return () => {
        const { class: className, items, ...rest } = props;
        return (
            <ul {...rest} class={[menuStyles.menu, menuStyles.menuRoot, className as any]}>
                {renderItems(items, 1)}
            </ul>
        )
    }
}

const useMenu = () => {
    return inject(MenuToken)
}


interface SubMenuProps extends Omit<MenuItemProps, | 'children'> {
    class?: JSXInternal.ClassNames
    items: MenuItem[]
}
const SubMenu: FC<SubMenuProps> = (props) => {
    const MenuController = useMenu();


    return () => {
        const { class: className, title, items, label, key, icon, disabled, level } = props;
        const isOpen = MenuController.isOpen(key as Key)
        return (
            <MenuLi class={[menuStyles.sub, disabled && menuStyles.disabled, className as any]}>
                <div class={menuStyles.item} onClick={() => MenuController.actionOnClick(key as Key)}>
                    <MenuTitle icon={icon} label={label} title={title} level={level} />
                    <div class={[menuStyles.action, (isOpen && menuStyles.isOpen) as string]} ></div>
                </div>
                <ul class={menuStyles.menu}>{renderItems(items, level + 1)}</ul>
            </MenuLi>
        )
    }
}

interface GroupMenuProps extends Omit<MenuItemProps, 'key' | 'children'> {
    class?: JSXInternal.ClassNames
    items: MenuItem[]
}
const GroupMenu: FC<GroupMenuProps> = (props) => {
    return () => {
        const { class: className, title, items, label, icon, disabled, level } = props;

        return (
            <MenuLi class={[menuStyles.group, disabled && menuStyles.disabled, className as any]} >
                <MenuTitle icon={icon} label={label} title={title} level={level} />
                <ul class={menuStyles.menu}>{renderItems(items, level + 1)}</ul>
            </MenuLi>
        )
    }
}

interface MenuItemProps extends Omit<MenuItem, 'children'> {
    items: MenuItem[]
    /**缩进 */
    level: number
}
const MenuItem: FC<MenuItemProps> = (props) => {
    return () => {
        const { title, type, items, label, icon, disabled, level } = props;
        if (type === 'divider') {
            return (
                <li class={menuStyles.divider} />
            )
        }
        if (type === 'group') {
            return <GroupMenu {...props} />
        }

        if (!items || items?.length === 0) {
            return (
                <MenuLi class={[menuStyles.item, (disabled && menuStyles.disabled) as any]} >
                    <MenuTitle icon={icon} label={label} title={title} level={level} />
                </MenuLi>
            )
        }
        else {
            return <SubMenu {...props} />
        }
    }
}

const MenuTitle: FC<Omit<MenuItemProps, 'disabled' | 'children' | 'key' | 'items'>> = (props) => {
    return () => {
        const { title, label, icon } = props;
        return (
            <div class={menuStyles.titleView} style={{ paddingLeft: (props.level * indent) + 'px' }}>
                {icon && <span class={menuStyles.icon}>{icon}</span>}
                <span class={menuStyles.title}>{title}</span>
                {label && <span class={menuStyles.label}>{label}</span>}
            </div>
        )
    }
}

const MenuLi: FC<HTMLAttributes<HTMLLIElement>> = (props) => {
    return () => <li {...props} >{props.children}</li>
}

const renderItems = (items: MenuItem[] = [], level = 0) => {
    return items.map(item => {
        const { children, ...rest } = item;
        return <MenuItem items={children as MenuItem[]} {...rest} level={level} />
    })
}



