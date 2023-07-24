
import { Navbar, ScrollView } from "@antd/viewfly/ui"
import { FC, JSXNode } from "@antd/viewfly/ui"


const HomePage: FC<{ children?: JSXNode }> = (props) => {
    return () => {
        return (
            <>
                <Navbar></Navbar>
                <ScrollView style={{ height: 'calc(100vh - 60px)' }}>
                    {props.children}
                </ScrollView>
            </>
        )
    }
}


export default HomePage
