import { FC, JSXNode, Key } from "@antd/viewfly/ui"
import { HTMLAttributes } from "@viewfly/platform-browser"
import { menuStyles } from "./Menu.style"
import { onPropsChanged, useSignal, JSXInternal } from "@viewfly/core"


const indent = 12

export interface MenuItem {
    /** 唯一标识符 */
    key?: Key
    /** 标题 */
    title?: JSXNode
    /** 小标题 */
    label?: JSXNode
    /** 类型 */
    type?: 'divider' | 'group' | undefined
    /** 图标 */
    icon?: JSXNode
    /** 是否禁用
     * @default false
     */
    disabled?: boolean
    /** 子节点 */
    children?: MenuItem[]
    [k: string]: any
}
class MenuState {

    public state = {
        items: useSignal<MenuItem[]>([]),
        openKeys: useSignal<Key[]>([]),

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

    public onClick: (item: MenuItem) => any = () => { }

    update = (props?: Omit<MenuState, 'update'>) => {
        const _this = this as any;
        const _props = props as any;
        if (props) {
            for (let i in _props) {
                _this.state[i]?.set(_props[i])
            }
        }
    }
}
/**
 * @api
 */
export interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'onClick'> {
    /** 子节点 */
    items: MenuItem[]
    /** 展开的Key */
    openKeys?: Key[]
    /** 点击事件 */
    onClick?: (item: MenuItem) => any
}
/** 菜单 */
export const Menu: FC<MenuProps> = (props) => {
    /** 菜单控制器 */
    const menuState = new MenuState();
    menuState.onClick = props.onClick || menuState.onClick;

    onPropsChanged<MenuProps>((p) => {
        menuState.update(p as any)
    })

    return () => {
        const { class: className, items, onClick, ...rest } = props;
        return (
            <ul {...rest} class={[menuStyles.menu, menuStyles.menuRoot, className as any]}>
                {renderItems(items, menuState, 1)}
            </ul>
        )
    }
}

interface SubMenuProps extends Omit<MenuItemProps, | 'children'> {
    class?: JSXInternal.ClassNames
    items: MenuItem[]
    menuState: MenuState
}
/** 子菜单 */
const SubMenu: FC<SubMenuProps> = (props) => {
    return () => {
        const { class: className, title, items, label, key, icon, disabled, level, menuState } = props;
        const isOpen = menuState.isOpen(key as Key)
        return (
            <MenuLi class={[menuStyles.sub, disabled && menuStyles.disabled, className as any]}>
                <div class={menuStyles.item} onClick={() => menuState.actionOnClick(key as Key)}>
                    <MenuTitle icon={icon} label={label} title={title} level={level} />
                    <div class={[menuStyles.action, (isOpen && menuStyles.isOpen) as string]} ></div>
                </div>
                <ul class={menuStyles.menu}>{renderItems(items, menuState, level + 1)}</ul>
            </MenuLi>
        )
    }
}

interface GroupMenuProps extends Omit<MenuItemProps, 'key' | 'children'> {
    class?: JSXInternal.ClassNames
    items: MenuItem[]
    menuState: MenuState
}
/** 分组 */
const GroupMenu: FC<GroupMenuProps> = (props) => {
    return () => {
        const { class: className, title, items, label, icon, disabled, level, menuState } = props;
        return (
            <MenuLi class={[menuStyles.group, disabled && menuStyles.disabled, className as any]} >
                <MenuTitle icon={icon} label={label} title={title} level={level} />
                <ul class={menuStyles.menu}>{renderItems(items, menuState, level + 1)}</ul>
            </MenuLi>
        )
    }
}

interface MenuItemProps extends Omit<MenuItem, 'children'> {
    items: MenuItem[]
    /**缩进 */
    level: number
    menuState: MenuState
}
/** 菜单项分流 */
const MenuItem: FC<MenuItemProps> = (props) => {
    return () => {
        const { title, type, items, label, icon, disabled, level, menuState } = props;
        if (type === 'divider') {
            return (
                <li class={menuStyles.divider} />
            )
        }
        if (type === 'group') {
            return <GroupMenu {...props} menuState={menuState} />
        }

        if (!items || items?.length === 0) {
            return (
                <MenuLi class={[menuStyles.item, (disabled && menuStyles.disabled) as any]} onClick={() => menuState.onClick(props)}>
                    <MenuTitle icon={icon} label={label} title={title} level={level} />
                </MenuLi>
            )
        }
        else {
            return <SubMenu {...props} menuState={menuState} />
        }
    }
}
/** 标题 */
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
/** 菜单项 */
const MenuLi: FC<HTMLAttributes<HTMLLIElement>> = (props) => {
    return () => <li {...props} >{props.children}</li>
}
/** 渲染菜单项分类 */
const renderItems = (items: MenuItem[] = [], menuState: MenuState, level = 0) => {
    return items.map(item => {
        const { children, ...rest } = item;
        return <MenuItem items={children as MenuItem[]} {...rest} level={level} menuState={menuState} />
    })
}



