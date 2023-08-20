export default {
  "/home/components/button": [
    {
      "name": "ButtonProps",
      "data": [
        {
          "name": "block",
          "description": "块级按钮",
          "isOptional": true,
          "type": "boolean",
          "defaultValue": "-"
        },
        {
          "name": "children",
          "description": "子集",
          "isOptional": true,
          "type": "any",
          "defaultValue": "-"
        },
        {
          "name": "class",
          "description": "类",
          "isOptional": true,
          "type": "string",
          "defaultValue": "-"
        },
        {
          "name": "danger",
          "description": "危险的按钮",
          "isOptional": true,
          "type": "boolean",
          "defaultValue": "-"
        },
        {
          "name": "disabled",
          "description": "是否禁用",
          "isOptional": true,
          "type": "boolean",
          "defaultValue": "false"
        },
        {
          "name": "ghost",
          "description": "幽灵",
          "isOptional": true,
          "type": "boolean",
          "defaultValue": "-"
        },
        {
          "name": "href",
          "description": "-",
          "isOptional": true,
          "type": "string",
          "defaultValue": "-"
        },
        {
          "name": "htmlType",
          "description": "-",
          "isOptional": true,
          "type": "'reset'|'submit'|'button'",
          "defaultValue": "-"
        },
        {
          "name": "icon",
          "description": "图标",
          "isOptional": true,
          "type": "any",
          "defaultValue": "-"
        },
        {
          "name": "loading",
          "description": "加载",
          "isOptional": true,
          "type": "boolean|",
          "defaultValue": "-"
        },
        {
          "name": "onClick",
          "description": "-",
          "isOptional": true,
          "type": "EventHandle<MouseEvent>",
          "defaultValue": "-"
        },
        {
          "name": "shape",
          "description": "形状",
          "isOptional": true,
          "type": "'default'|'circle'|'round'",
          "defaultValue": "-"
        },
        {
          "name": "size",
          "description": "大小",
          "isOptional": true,
          "type": "SizeType",
          "defaultValue": "middle"
        },
        {
          "name": "style",
          "description": "样式",
          "isOptional": true,
          "type": "CSSProperties",
          "defaultValue": "-"
        },
        {
          "name": "target",
          "description": "-",
          "isOptional": true,
          "type": "string",
          "defaultValue": "-"
        },
        {
          "name": "type",
          "description": "类型",
          "isOptional": true,
          "type": "'default'|'primary'|'ghost'|'dashed'|'link'|'text'",
          "defaultValue": "default"
        }
      ]
    }
  ],
  "/home/components/menu": [
    {
      "name": "MenuProps",
      "data": [
        {
          "name": "items",
          "description": "子节点",
          "isOptional": false,
          "type": "MenuItem[]",
          "defaultValue": "-"
        },
        {
          "name": "onClick",
          "description": "点击事件",
          "isOptional": true,
          "type": "(item:MenuItem)=>any",
          "defaultValue": "-"
        },
        {
          "name": "openKeys",
          "description": "展开的Key",
          "isOptional": true,
          "type": "Key[]",
          "defaultValue": "-"
        }
      ]
    },
    {
      "name": "MenuItem",
      "data": [
        {
          "name": "children",
          "description": "子节点",
          "isOptional": true,
          "type": "MenuItem[]",
          "defaultValue": "-"
        },
        {
          "name": "disabled",
          "description": "是否禁用",
          "isOptional": true,
          "type": "boolean",
          "defaultValue": "false"
        },
        {
          "name": "icon",
          "description": "图标",
          "isOptional": true,
          "type": "any",
          "defaultValue": "-"
        },
        {
          "name": "key",
          "description": "唯一标识符",
          "isOptional": true,
          "type": "Key",
          "defaultValue": "-"
        },
        {
          "name": "label",
          "description": "小标题",
          "isOptional": true,
          "type": "any",
          "defaultValue": "-"
        },
        {
          "name": "title",
          "description": "标题",
          "isOptional": true,
          "type": "any",
          "defaultValue": "-"
        },
        {
          "name": "type",
          "description": "类型",
          "isOptional": true,
          "type": "'divider'|'group'",
          "defaultValue": "-"
        }
      ]
    }
  ]
} 