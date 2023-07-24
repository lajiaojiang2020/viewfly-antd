import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@antd/viewfly/icon';
import { Menu, JSXNode, Key, MenuItem, MenuProps, FC } from '@antd/viewfly/ui'


function getItem(
    title: JSXNode,
    key: Key,
    icon?: JSXNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        title,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    { type: 'divider' },

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),

    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];
/**
 * @label 内嵌菜单
 * @content 垂直菜单，子菜单内嵌在菜单区域。
 */
const App: FC = () => {
    const onClick: MenuProps['onClick'] = (e: any) => {
        console.log('click ', e);
    };

    return () => (
        <Menu
            onClick={onClick}
            style={{ width: 256 + 'px' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default App;