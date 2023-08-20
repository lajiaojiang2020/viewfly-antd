
import { DownloadOutlined } from "@antd/viewfly/icon";
import { Button, Divider, FC, Radio, SizeType, Space } from "@antd/viewfly/ui"
import { useSignal } from "@viewfly/core";
/**
 * @label  按钮尺寸
 * @content 按钮有大、中、小三种尺寸。通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。
 */
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
