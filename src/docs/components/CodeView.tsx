
import { FC, ScrollView } from "@antd/viewfly/ui"
import { useRef } from "@viewfly/core";
import codejs from 'highlight.js';
import 'highlight.js/styles/github.css'


export interface CodeViewProps {
    code: string
}
export const CodeView: FC<CodeViewProps> = (props) => {
    const ref = useRef<HTMLElement>(el => {
        el.innerHTML = codejs.highlightAuto(props.code, ['typescript', 'tsx']).value
    })
    return () => (
        <ScrollView style={{ fontSize: '14px', backgroundColor: '#fff', lineHeight: 1.35 }} scrollX scrollY={false}>
            <pre style={{ width: 'max-content' }}>
                <code ref={ref}></code>
            </pre>
        </ScrollView>
    )
}

