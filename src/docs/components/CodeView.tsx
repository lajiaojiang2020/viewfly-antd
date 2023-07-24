
import { FC } from "@antd/viewfly/ui"
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
        <div style={{ fontSize: '16px', backgroundColor: '#fff', lineHeight: 1.5 }}>
            <pre>
                <code ref={ref}></code>
            </pre>
        </div>
    )
}

