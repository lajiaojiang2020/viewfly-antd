
export interface Target {
    sourceFileName: string;
    qualifiedName: string;
}

export interface TypeArgument {
    type: string;
    target: Target;
    typeArguments: TypeArgument[];
    name: string;
    package: string;
}

export interface ExtendedType {
    type: string;
    target: Target;
    typeArguments: TypeArgument[];
    name: string;
    package: string;
}

export interface ExtendedBy {
    type: string;
    target: number;
    name: string;
}

export interface Flag {
    isOptional: boolean;
}

export interface Summary {
    kind: string;
    text: string;
}

export interface Content {
    kind: string;
    text: string;
}

export interface BlockTag {
    tag: string;
    content: Content[];
}

export interface Comment {
    summary?: Summary[];
    blockTags?: BlockTag[];
}

export interface Source {
    fileName: string;
    line: number;
    character: number;
    url: string;
}

export interface Type {
    type: "intrinsic" | "union" | "literal" | "reference" | "array" | "reflection";
    name: string;
    value?: string
    types?: Type[]
    declaration?: Declaration
    target?: Target
    typeArguments?: Type[]
    elementType?: Type
}

export interface InheritedFrom {
    type: string;
    target: number;
    name: string;
}

export interface Children {
    id: number;
    name: string;
    variant: string;
    kind: number;
    flags: Flag;
    children: Children[];
    groups: Group[];
    sources: Source[];
    extendedTypes: ExtendedType[];
    extendedBy: ExtendedBy[];
    comment: Comment;
    type: Type
    isParse: boolean
}

export interface Group {
    title: string;
    children: number[];
}


export interface SymbolIdMap {
    [k: number]: Target
}

export interface Declaration {
    id: number;
    name: string;
    variant: string;
    kind: number;
    flags: Flag;
    children: Children[];
    groups: Group[];
    packageName: string;
    symbolIdMap: SymbolIdMap;
    comment: Comment;
    sources: Source[];
    type: Type;
    inheritedFrom: InheritedFrom;
    signatures: Declaration[]
    parameters: Declaration[]
}


export interface Table {
    name: string
    data: Column[]

}

export interface Column {

    name: string
    description: string
    type: string
    isOptional?: boolean
    defaultValue: string
}