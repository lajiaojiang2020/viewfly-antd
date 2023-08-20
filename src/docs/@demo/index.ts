export default {"home.components.button.demo.disabled":{label:"不可用状态",content:"添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。",code:`
import { Button, FC, Space } from "@antd/viewfly/ui"

const App: FC = () => {
    return () => (
        <Space direction="vertical">
            <Space>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>
                    Primary(disabled)
                </Button>
            </Space>
            <Space>
                <Button>Default</Button>
                <Button disabled>Default(disabled)</Button>
            </Space>
            <Space>
                <Button type="dashed">Dashed</Button>
                <Button type="dashed" disabled>
                    Dashed(disabled)
                </Button>
            </Space>
            <Space>
                <Button type="text">Text</Button>
                <Button type="text" disabled>
                    Text(disabled)
                </Button>
            </Space>
            <Space>
                <Button type="link">Link</Button>
                <Button type="link" disabled>
                    Link(disabled)
                </Button>
            </Space>
            <Space>
                <Button danger type="primary" href='https://ant.design/index-cn'>
                    Href Primary
                </Button>
                <Button danger type="primary" href='https://ant.design/index-cn' disabled>
                    Href Primary(disabled)
                </Button>
            </Space>
            <Space>
                <Button danger>Danger Default</Button>
                <Button danger disabled>
                    Danger Default(disabled)
                </Button>
            </Space>
            <Space>
                <Button danger type="text">
                    Danger Text
                </Button>
                <Button danger type="text" disabled>
                    Danger Text(disabled)
                </Button>
            </Space>
            <Space>
                <Button type="link" danger>
                    Danger Link
                </Button>
                <Button type="link" danger disabled>
                    Danger Link(disabled)
                </Button>
            </Space>
            <Space className="site-button-ghost-wrapper">
                <Button ghost>Ghost</Button>
                <Button ghost disabled>
                    Ghost(disabled)
                </Button>
            </Space>
        </Space>
    )
}
export default App;
`},"home.components.button.demo.icon":{label:"图标按钮",content:"当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。",code:`
import { SearchOutlined } from "@antd/viewfly/icon";
import { Button, FC, Space, Tooltip } from "@antd/viewfly/ui"

const App: FC = () => {
    return () => (
        <Space wrap>
            <Space direction="vertical">
                <Space wrap>
                    <Tooltip title="search">
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button type="primary" shape="circle">
                        A
                    </Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button icon={<SearchOutlined />}>Search</Button>
                </Space>
                <Space wrap>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button icon={<SearchOutlined />}>Search</Button>
                    <Tooltip title="search">
                        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button type="dashed" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button icon={<SearchOutlined />} href="https://www.google.com" />
                </Space>
            </Space>
        </Space>
    )
}
export default App;
`},"home.components.button.demo.size":{label:"按钮尺寸",content:"按钮有大、中、小三种尺寸。通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。",code:`
import { DownloadOutlined } from "@antd/viewfly/icon";
import { Button, Divider, FC, Radio, SizeType, Space } from "@antd/viewfly/ui"
import { useSignal } from "@viewfly/core";

const App: FC = () => {
    const size = useSignal<SizeType>('large'); // default is 'middle'

    return () => (
        <>
            <Radio.Group value={size()} onChange={size.set}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
            <Divider orientation="left" plain>
                Preview
            </Divider>
            <Space direction="vertical">
                <Space wrap>
                    <Button type="primary" size={size()}>
                        Primary
                    </Button>
                    <Button size={size()}>Default</Button>
                    <Button type="dashed" size={size()}>
                        Dashed
                    </Button>
                </Space>
                <Button type="link" size={size()}>
                    Link
                </Button>
                <Space wrap>
                    <Button type="primary" icon={<DownloadOutlined />} size={size()} />
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size()} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size()} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size()}>
                        Download
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size={size()}>
                        Download
                    </Button>
                </Space>
            </Space>
        </>
    );
};
export default App;
`},"home.components.button.demo.type":{label:"按钮类型",content:"按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。",code:`

import { Button, FC, Space } from "@antd/viewfly/ui"

const App: FC = () => {
    return () => {
        return (
            <Space wrap>
                <Button type="primary" >Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text" >Text Button</Button>
                <Button type="link">Link Button</Button>
            </Space>
        )
    }
}
export default App;
`},"home.components.menu.demo.inline":{label:"内嵌菜单",content:"垂直菜单，子菜单内嵌在菜单区域。",code:`import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@antd/viewfly/icon';
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

export default App;`}}