
import { router } from "@/docs/router"
import { defineStyleSheet, Navbar, ScrollView, useStyleSheetContext, vfBase, vfTheme } from "@antd/viewfly/ui"
import { FC, JSXNode } from "@antd/viewfly/ui"


const HomePage: FC<{ children?: JSXNode }> = (props) => {

    const navs: Array<{ label: string, path: string }> = [
        { label: '设计', path: '' },
        { label: '研发', path: '' },
        { label: '组件', path: '/components/button' },
        { label: '博客', path: '' },
        { label: '资源', path: '' }
    ];

    const toRouter = (path: string) => {
        path && router.push(`/home${path}`);
    }

    return () => {
        return (
            <>
                <Navbar >
                    <div></div>
                    <div class={styles.navbar}>
                        {navs.map(item => (
                            <div onClick={() => toRouter(item.path)}>{item.label}</div>
                        ))}
                    </div>
                </Navbar>
                <ScrollView style={{ height: 'calc(100vh - 60px)' }}>
                    {props.children}
                </ScrollView>
            </>
        )
    }
}


export default HomePage;


const styles = defineStyleSheet('navbar-nav', () => {
    const { className, define, s } = useStyleSheetContext();

    const navbar = className();

    define(s(navbar), {
        display: 'flex',
        [s(`&>div`)]: {
            padding: '0px 25px',
            cursor: 'pointer',
            transition: vfBase.transition,
            height: '100%',
            borderBottom: '2px solid rgba(0,0,0,0)',
            [s(`&:hover`)]: {
                color: vfTheme.primaryColor,
                borderColor: vfTheme.primaryColor
            }
        }
    })

    return { navbar }
})


