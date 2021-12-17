(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmfwWEB = {}));
})(this, (function (exports) { 'use strict';

    var types$1 = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    class ElementNode {
        id;
        props;
        element;
        children;
        static replace(element, map, depth = 0) {
            if (_.isEmpty(map)) {
                return element;
            }
            if (!_.isEmpty(element.children)) {
                _.forEach(element.children, (item, _i) => {
                    ElementNode.replace(item, map, depth + 1);
                });
            }
            _.forEach(map, (item, id) => {
                if (id === 'root' && depth === 0) {
                    _.merge(element, item);
                }
                if (element.id === id) {
                    _.merge(element, item);
                }
            });
            return element;
        }
        constructor() {
            this.id = '';
            this.children = [];
            this.props = {};
            this.element = null;
        }
        load(options) {
            this.id = options.id ? options.id : new Date().getTime().toString();
            this.props = options.props ? options.props : {};
            this.element = options.element ? options.element : null;
            const children = options.children ? options.children : [];
            this.children = children.map((item, _i) => {
                const node = new ElementNode();
                node.load(item);
                return node;
            });
        }
        toComponent(props = {}) {
            const elprops = _.merge(this.props, props, { attrs: { _id: this.id } });
            const El = this.element;
            if (typeof El === 'function') {
                return (React.createElement(El, { ...elprops }, this.children?.map((subnode, i) => subnode.toComponent({ key: i }))));
            }
            return El;
        }
    }

    var index$9 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ElementNode: ElementNode,
        ElementNodeTypes: types$1
    });

    function menuFindExt(menu, find, process, pmenu = null, index = null) {
        if (!_.isEmpty(menu.children)) {
            _.forEach(menu.children, (v, i) => {
                menuFindExt(v, find, process, menu, i);
            });
        }
        if (find(menu)) {
            process(menu, pmenu, index);
        }
    }

    function menuForeach(menu, process, pmenu = null, index = null) {
        if (!_.isEmpty(menu.children)) {
            _.forEach(menu.children, (v, i) => {
                menuForeach(v, process, menu, i);
            });
        }
        process(menu, pmenu, index);
    }

    function updateMenu(state, key, id, menu) {
        let mm = _.cloneDeep(state[key]);
        menuFindExt(mm, (m) => m.id === id, (m, pm, i) => {
            if (pm) {
                pm.children[i] = menu;
            }
            else {
                mm = menu;
            }
        });
        state[key] = mm;
    }

    function StyledComponent(component, makeStyles, options = {}) {
        return MaterialUI.styled(component)((params) => {
            const { theme } = params;
            return makeStyles(theme);
        }, options);
    }

    function HtmlTag(tagName, makeStyles, options = {}) {
        const El = StyledComponent(tagName, makeStyles, options);
        return (props) => React.createElement(El, { ...props.attrs }, props.children);
    }

    function Panel(props) {
        const El = props.styledElement ? props.styledElement : 'div';
        return React.createElement(El, { ...props.attrs }, !_.isEmpty(props.children) ? props.children : props.defaultContent);
    }

    const useStyles = MaterialUI.makeStyles((theme) => ({
        nested: {
            paddingLeft: theme.spacing(2)
        }
    }));
    function NestedListItem(props) {
        const { menu, open, nested, depth, onClick } = props;
        const classes = useStyles();
        const className = classes.nested;
        const attrs = {};
        if (typeof nested !== 'undefined') {
            attrs.className = className;
        }
        return (React.createElement("div", { ...attrs },
            React.createElement(MaterialUI.ListItem, { button: true, onClick: () => onClick(menu) },
                React.createElement(MaterialUI.ListItemText, { primary: menu.label }),
                !_.isEmpty(menu.children) && (open ? React.createElement(MaterialUI.Icon, null, "expand_less") : React.createElement(MaterialUI.Icon, null, "expand_more"))),
            !_.isEmpty(menu.children) && (React.createElement(MaterialUI.Collapse, { in: open, timeout: 'auto', unmountOnExit: true },
                React.createElement(MaterialUI.List, { component: 'div', disablePadding: true }, menu.children.map((v, _i) => (React.createElement(NestedListItem, { onClick: onClick, key: v.id, menu: v, open: v.open, nested: true, depth: depth + 1 }))))))));
    }

    function NestedList(props) {
        const { menu, updateMenu } = props;
        function handleClick(cm) {
            if (typeof cm.onClick === 'function') {
                cm.onClick(cm);
            }
            const open = !cm.open;
            const mm = _.cloneDeep(cm);
            menuForeach(mm, (m, _pmenu, _i) => {
                if (typeof m.open !== 'undefined') {
                    m.open = false;
                }
            });
            updateMenu(mm.id, { ...mm, open });
        }
        return (React.createElement(MaterialUI.List, { component: 'nav', "aria-labelledby": 'nested-list-subheader' }, menu.children.map((v, _i) => (React.createElement(NestedListItem, { onClick: handleClick, key: v.id, menu: v, open: v.open, nested: true, depth: 0 })))));
    }

    function PopoverList(props) {
        const { menu, updateMenu, classes } = props;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const { open } = menu;
        const id = open ? menu.id : undefined;
        const handleClick = (e) => {
            setAnchorEl(e.currentTarget);
            updateMenu(menu.id, { ...menu, open: !menu.open });
        };
        const handleClose = () => {
            const mm = _.cloneDeep(menu);
            menuForeach(mm, (m, _pmenu, _i) => {
                if (typeof m.open !== 'undefined') {
                    m.open = false;
                }
            });
            updateMenu(mm.id, mm);
            setAnchorEl(null);
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(MaterialUI.Button, { "aria-describedby": id, onClick: (e) => handleClick(e), classes: { label: classes.buttonLabel } },
                menu.label,
                menu.icon && React.createElement(MaterialUI.Icon, null, menu.icon),
                !_.isEmpty(menu.children) &&
                    !_.isEmpty(menu.label) &&
                    (open ? React.createElement(MaterialUI.Icon, null, "expand_less") : React.createElement(MaterialUI.Icon, null, "expand_more"))),
            !_.isEmpty(menu.children) && (React.createElement(MaterialUI.Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, classes: { paper: classes.popoverPaper } },
                React.createElement(NestedList, { menu: menu, updateMenu: updateMenu })))));
    }

    var index$8 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Panel: Panel,
        NestedList: NestedList,
        NestedListItem: NestedListItem,
        PopoverList: PopoverList
    });

    const defaultMenu$2 = {
        id: 'root',
        icon: 'more_horiz',
        label: '',
        open: false,
        children: []
    };
    const initialState$5 = {
        menu: defaultMenu$2,
        mobileMenu: _.cloneDeep(defaultMenu$2)
    };
    const slice$5 = RTK.createSlice({
        name: 'navMenu',
        initialState: initialState$5,
        reducers: {
            updateMenu: (state, action) => {
                const { id, menu } = action.payload;
                updateMenu(state, 'menu', id, menu);
            },
            updateMobileMenu: (state, action) => {
                const { id, menu } = action.payload;
                updateMenu(state, 'mobileMenu', id, menu);
            }
        }
    });

    const mNavMenuBar = {
        id: 'm-navMenuBar',
        props: {
            styledElement: StyledComponent('div', (theme) => ({
                marginLeft: theme.globals.padding,
                display: 'none',
                [theme.breakpoints.down('xs')]: {
                    display: 'flex'
                }
            })),
            defaultContent: 'm-navMenuBar'
        },
        element: Panel,
        children: [
            {
                id: 'm-navMenu',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        backgroundColor: theme.navMenu.backgroundColor
                    })),
                    defaultContent: 'm-navMenu'
                },
                element: (_props) => {
                    const useStyle = MaterialUI.makeStyles((theme) => ({
                        popoverPaper: {
                            width: theme.navbarPopoverPaper.width
                        },
                        buttonLabel: {
                            color: theme.navbar.color
                        }
                    }));
                    const classes = useStyle();
                    const menu = ReactRedux.useSelector((state) => state.navMenu.mobileMenu);
                    const dispatch = ReactRedux.useDispatch();
                    const updateMenu = (id, newMenu) => {
                        dispatch(slice$5.actions.updateMobileMenu({ id, menu: newMenu }));
                    };
                    return React.createElement(PopoverList, { menu: menu, updateMenu: updateMenu, classes: classes });
                }
            }
        ]
    };
    const navMenuBar = {
        id: 'navMenuBar',
        props: {
            styledElement: StyledComponent('div', (theme) => ({
                marginLeft: theme.globals.padding,
                [theme.breakpoints.down('xs')]: {
                    display: 'none'
                }
            })),
            defaultContent: 'm-navMenuBar'
        },
        element: Panel,
        children: [
            {
                id: 'navMenu',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        backgroundColor: theme.navMenu.backgroundColor
                    })),
                    defaultContent: 'navMenu'
                },
                element: (_props) => {
                    const useStyle = MaterialUI.makeStyles((theme) => ({
                        popoverPaper: {
                            width: theme.navbarPopoverPaper.width
                        },
                        buttonLabel: {
                            color: theme.navbar.color
                        }
                    }));
                    const classes = useStyle();
                    const menu = ReactRedux.useSelector((state) => state.navMenu.menu);
                    const dispatch = ReactRedux.useDispatch();
                    const updateMenu = (id, newMenu) => {
                        dispatch(slice$5.actions.updateMenu({ id, menu: newMenu }));
                    };
                    if (!_.isEmpty(menu.children)) {
                        return menu.children.map((v, _i) => (React.createElement(PopoverList, { key: v.id, menu: v, updateMenu: updateMenu, classes: classes })));
                    }
                    return null;
                }
            }
        ]
    };

    var index$7 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        mNavMenuBar: mNavMenuBar,
        navMenuBar: navMenuBar
    });

    var index$6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        classic: index$7
    });

    const layout$1 = {
        id: 'root',
        props: {
            styledElement: StyledComponent('div', (theme) => ({
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: theme.globals.fontFamily
            })),
            defaultContent: 'root'
        },
        element: Panel,
        children: [
            {
                id: 'header',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        display: 'flex',
                        height: theme.header.height,
                        backgroundColor: theme.header.backgroundColor,
                        color: theme.header.color
                    })),
                    defaultContent: 'header'
                },
                element: Panel,
                children: [
                    {
                        id: 'logobar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                width: `calc(${theme.logobar.width} - ${theme.globals.padding}*2)`,
                                padding: theme.globals.padding,
                                fontSize: theme.globals.fontSize,
                                display: 'flex',
                                alignItems: 'center'
                            })),
                            defaultContent: 'logobar'
                        },
                        element: Panel,
                        children: [
                            {
                                id: 'logo',
                                props: {
                                    styledElement: StyledComponent(MaterialUI.Button, (theme) => ({
                                        color: theme.header.color,
                                        fontSize: theme.logobar.fontSize,
                                        justifyContent: 'flex-start',
                                        flex: 1,
                                        '&:hover': {
                                            backgroundColor: theme.header.backgroundColor
                                        }
                                    }))
                                },
                                element: (props) => {
                                    const text = ReactRedux.useSelector((state) => state.logo.text);
                                    const El = props.styledElement ? props.styledElement : MaterialUI.Button;
                                    return (React.createElement(El, { ...props.attrs, disableRipple: true }, text));
                                }
                            }
                        ]
                    },
                    {
                        id: 'navbar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                flex: 1,
                                backgroundColor: theme.navbar.backgroundColor,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            })),
                            defaultContent: 'navbar'
                        },
                        element: Panel
                    },
                    {
                        id: 'extrabar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                backgroundColor: theme.extrabar.backgroundColor,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            })),
                            defaultContent: ''
                        },
                        element: Panel
                    }
                ]
            },
            {
                id: 'content',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        flex: 1,
                        display: 'flex',
                        [theme.breakpoints.down('xs')]: {
                            flexDirection: 'column'
                        }
                    })),
                    defaultContent: 'content'
                },
                element: Panel,
                children: [
                    {
                        id: 'workspace',
                        props: {
                            styledElement: StyledComponent('div', (_theme) => ({
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            })),
                            defaultContent: 'workspace'
                        },
                        element: Panel,
                        children: [
                            {
                                id: 'main',
                                props: {
                                    styledElement: StyledComponent('div', (_theme) => ({
                                        flex: 1,
                                        display: 'flex'
                                    })),
                                    defaultContent: 'main'
                                },
                                element: Panel
                            }
                        ]
                    }
                ]
            },
            {
                id: 'footer',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        padding: theme.globals.padding,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.footer.backgroundColor,
                        color: theme.footer.color,
                        fontSize: theme.footer.fontSize
                    })),
                    defaultContent: 'footer'
                },
                element: Panel
            }
        ]
    };

    const initialState$4 = {
        open: true
    };
    const slice$4 = RTK.createSlice({
        name: 'sidebar',
        initialState: initialState$4,
        reducers: {
            toggle: (state) => {
                state.open = !state.open;
            }
        }
    });

    const layout = {
        id: 'root',
        props: {
            styledElement: StyledComponent('div', (theme) => ({
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: theme.globals.fontFamily
            })),
            defaultContent: 'root'
        },
        element: Panel,
        children: [
            {
                id: 'header',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        display: 'flex',
                        height: theme.header.height,
                        backgroundColor: theme.header.backgroundColor,
                        color: theme.header.color
                    })),
                    defaultContent: 'header'
                },
                element: Panel,
                children: [
                    {
                        id: 'logobar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                width: `calc(${theme.logobar.width} - ${theme.globals.padding}*2)`,
                                padding: theme.globals.padding,
                                fontSize: theme.globals.fontSize,
                                display: 'flex',
                                alignItems: 'center'
                            })),
                            defaultContent: 'logobar'
                        },
                        element: Panel,
                        children: [
                            {
                                id: 'sidebarIcon',
                                props: {
                                    styledIcon: StyledComponent(MaterialUI.Icon, (theme) => ({
                                        color: theme.header.color
                                    }))
                                },
                                element: (props) => {
                                    const StyledIcon = props.styledIcon ? props.styledIcon : MaterialUI.Icon;
                                    const dispatch = ReactRedux.useDispatch();
                                    function handleClick() {
                                        dispatch(slice$4.actions.toggle());
                                    }
                                    return (React.createElement(MaterialUI.IconButton, { ...props.attrs, onClick: handleClick },
                                        React.createElement(StyledIcon, null, "menu")));
                                }
                            },
                            {
                                id: 'logo',
                                props: {
                                    styledElement: StyledComponent(MaterialUI.Button, (theme) => ({
                                        color: theme.header.color,
                                        fontSize: theme.logobar.fontSize,
                                        justifyContent: 'flex-start',
                                        flex: 1,
                                        '&:hover': {
                                            backgroundColor: theme.header.backgroundColor
                                        }
                                    }))
                                },
                                element: (props) => {
                                    const text = ReactRedux.useSelector((state) => state.logo.text);
                                    const El = props.styledElement ? props.styledElement : MaterialUI.Button;
                                    const disableRipple = true;
                                    return (React.createElement(El, { ...props.attrs, disableRipple: disableRipple }, text));
                                }
                            }
                        ]
                    },
                    {
                        id: 'navbar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                flex: 1,
                                backgroundColor: theme.navbar.backgroundColor,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            })),
                            defaultContent: 'navbar'
                        },
                        element: Panel
                    },
                    {
                        id: 'extrabar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                backgroundColor: theme.extrabar.backgroundColor,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            })),
                            defaultContent: ''
                        },
                        element: Panel
                    }
                ]
            },
            {
                id: 'content',
                props: {
                    styledElement: StyledComponent('div', (theme) => ({
                        flex: 1,
                        display: 'flex',
                        [theme.breakpoints.down('xs')]: {
                            flexDirection: 'column'
                        }
                    })),
                    defaultContent: 'content'
                },
                element: Panel,
                children: [
                    {
                        id: 'sidebar',
                        props: {
                            styledElement: StyledComponent('div', (theme) => ({
                                width: theme.sidebar.width,
                                backgroundColor: theme.sidebar.backgroundColor,
                                color: theme.sidebar.color,
                                [theme.breakpoints.down('xs')]: {
                                    width: '100%',
                                    height: `calc(100% - ${theme.header.height})`,
                                    position: 'absolute',
                                    backgroundColor: theme.header.backgroundColor
                                }
                            })),
                            defaultContent: 'sidebar'
                        },
                        element: (props) => {
                            const open = ReactRedux.useSelector((state) => state.sidebar.open);
                            return open && React.createElement(Panel, { ...props });
                        }
                    },
                    {
                        id: 'workspace',
                        props: {
                            styledElement: StyledComponent('div', (_theme) => ({
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            })),
                            defaultContent: 'workspace'
                        },
                        element: Panel,
                        children: [
                            {
                                id: 'main',
                                props: {
                                    styledElement: StyledComponent('div', (theme) => ({
                                        flex: 1,
                                        padding: theme.globals.padding
                                    })),
                                    defaultContent: 'main'
                                },
                                element: Panel
                            },
                            {
                                id: 'footer',
                                props: {
                                    styledElement: StyledComponent('div', (theme) => ({
                                        padding: theme.globals.padding,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.footer.backgroundColor,
                                        color: theme.footer.color,
                                        fontSize: theme.footer.fontSize
                                    })),
                                    defaultContent: 'footer'
                                },
                                element: Panel
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var index$5 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        basic: layout$1,
        common: layout
    });

    var index$4 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        classic: index$5
    });

    const defaultMenu$1 = {
        id: 'root',
        icon: 'settings',
        label: '',
        open: false,
        children: []
    };
    const initialState$3 = {
        menu: defaultMenu$1
    };
    const slice$3 = RTK.createSlice({
        name: 'extraMenu',
        initialState: initialState$3,
        reducers: {
            updateMenu: (state, action) => {
                const { id, menu } = action.payload;
                updateMenu(state, 'menu', id, menu);
            }
        }
    });

    const template$2 = {
        __layout: 'basic',
        logo: {
            children: [
                {
                    id: 'logoText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            marginLeft: theme.globals.padding
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.logo.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        },
        navbar: {
            children: [mNavMenuBar, navMenuBar]
        },
        extrabar: {
            children: [
                {
                    id: 'extraMenu',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            backgroundColor: theme.extrabar.backgroundColor
                        })),
                        defaultContent: 'extraMenu'
                    },
                    element: (_props) => {
                        const useStyle = MaterialUI.makeStyles((theme) => ({
                            popoverPaper: {
                                width: theme.extrabarPopoverPaper.width
                            },
                            buttonLabel: {
                                color: theme.extrabar.color
                            }
                        }));
                        const classes = useStyle();
                        const menu = ReactRedux.useSelector((state) => state.extraMenu.menu);
                        const dispatch = ReactRedux.useDispatch();
                        const updateMenu = (id, newMenu) => {
                            dispatch(slice$3.actions.updateMenu({ id, menu: newMenu }));
                        };
                        return React.createElement(PopoverList, { menu: menu, updateMenu: updateMenu, classes: classes });
                    }
                }
            ]
        },
        main: {
            children: [
                {
                    id: 'main',
                    props: {
                        styledElement: StyledComponent('div', (_theme) => ({
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        })),
                        defaultContent: 'main'
                    },
                    element: Panel,
                    children: [
                        {
                            element: (_props) => 'not found'
                        }
                    ]
                }
            ]
        },
        footer: {
            children: [
                {
                    id: 'copyrightText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            padding: theme.globals.padding,
                            fontSize: theme.copyrightText.fontSize,
                            color: theme.copyrightText.color
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.copyright.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        }
    };

    const template$1 = {
        __layout: 'basic',
        root: {},
        logo: {
            children: [
                {
                    id: 'logoText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            marginLeft: theme.globals.padding
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.logo.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        },
        navbar: {
            children: [mNavMenuBar, navMenuBar]
        },
        extrabar: {
            children: [
                {
                    id: 'extraMenu',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            backgroundColor: theme.extrabar.backgroundColor
                        })),
                        defaultContent: 'extraMenu'
                    },
                    element: (_props) => {
                        const useStyle = MaterialUI.makeStyles((theme) => ({
                            popoverPaper: {
                                width: theme.extrabarPopoverPaper.width
                            },
                            buttonLabel: {
                                color: theme.extrabar.color
                            }
                        }));
                        const classes = useStyle();
                        const menu = ReactRedux.useSelector((state) => state.extraMenu.menu);
                        const dispatch = ReactRedux.useDispatch();
                        const updateMenu = (id, newMenu) => {
                            dispatch(slice$3.actions.updateMenu({ id, menu: newMenu }));
                        };
                        return React.createElement(PopoverList, { menu: menu, updateMenu: updateMenu, classes: classes });
                    }
                }
            ]
        },
        main: {
            children: [
                {
                    id: 'main',
                    props: {
                        styledElement: StyledComponent('div', (_theme) => ({
                            flex: 1,
                            display: 'flex'
                        })),
                        defaultContent: 'main'
                    },
                    element: Panel,
                    children: [
                        {
                            element: (_props) => {
                                const useStyles = MaterialUI.makeStyles((theme) => ({
                                    cardHeaderRoot: {
                                        padding: 0
                                    },
                                    cardHeaderTitle: {
                                        textAlign: 'center',
                                        padding: `calc(${theme.globals.padding} / 2)`,
                                        backgroundColor: theme.navbar.backgroundColor,
                                        color: theme.navbar.color,
                                        [theme.breakpoints.down('xs')]: {
                                            backgroundColor: theme.workspace.backgroundColor,
                                            color: theme.workspace.color
                                        }
                                    },
                                    cardHeaderContent: {
                                        height: '100%'
                                    },
                                    cardActionsRoot: {
                                        display: 'flex',
                                        justifyContent: 'end'
                                    },
                                    gridContainer: {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        [theme.breakpoints.down('xs')]: {
                                            justifyContent: 'center',
                                            alignItems: 'start',
                                            marginTop: theme.globals.padding
                                        }
                                    },
                                    gridItem: {
                                        [theme.breakpoints.down('xs')]: {
                                            flexGrow: 1,
                                            maxWidth: '100%',
                                            flexBasis: '100%'
                                        }
                                    },
                                    cardRoot: {
                                        [theme.breakpoints.down('xs')]: {
                                            boxShadow: 'none'
                                        }
                                    }
                                }));
                                const classes = useStyles();
                                return (React.createElement(MaterialUI.Grid, { container: true, classes: { container: classes.gridContainer } },
                                    React.createElement(MaterialUI.Grid, { item: true, xs: 12, sm: 8, md: 6, lg: 4, classes: { item: classes.gridItem } },
                                        React.createElement(MaterialUI.Card, { classes: { root: classes.cardRoot } },
                                            React.createElement(MaterialUI.CardHeader, { title: 'Login', classes: {
                                                    root: classes.cardHeaderRoot,
                                                    title: classes.cardHeaderTitle,
                                                    content: classes.cardHeaderContent
                                                } }),
                                            React.createElement(MaterialUI.CardContent, null,
                                                React.createElement(MaterialUI.TextField, { id: 'standard-full-width', label: '', placeholder: 'Username', helperText: '', fullWidth: true, margin: 'normal', InputLabelProps: {
                                                        shrink: true
                                                    } }),
                                                React.createElement(MaterialUI.TextField, { id: 'standard-full-width', label: '', placeholder: 'Password', helperText: '', fullWidth: true, margin: 'normal', InputLabelProps: {
                                                        shrink: true
                                                    }, InputProps: {
                                                        type: 'password'
                                                    } })),
                                            React.createElement(MaterialUI.CardActions, { classes: { root: classes.cardActionsRoot } },
                                                React.createElement(MaterialUI.Button, { variant: 'contained', color: 'primary' }, "Submit"))))));
                            }
                        }
                    ]
                }
            ]
        },
        footer: {
            children: [
                {
                    id: 'copyrightText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            padding: theme.globals.padding,
                            fontSize: theme.copyrightText.fontSize,
                            color: theme.copyrightText.color
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.copyright.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        }
    };

    const defaultMenu = {
        id: 'root',
        label: 'root',
        open: false,
        children: []
    };
    const initialState$2 = {
        menu: defaultMenu
    };
    const slice$2 = RTK.createSlice({
        name: 'sideMenu',
        initialState: initialState$2,
        reducers: {
            updateMenu: (state, action) => {
                const { id, menu } = action.payload;
                updateMenu(state, 'menu', id, menu);
            }
        }
    });

    const template = {
        __layout: 'common',
        root: {
            element(props) {
                const dispatch = ReactRedux.useDispatch();
                React.useEffect(() => {
                    const sideMenu = {
                        id: 'root',
                        label: 'root',
                        open: false,
                        children: [
                            {
                                id: 'popover-aa',
                                label: 'aa',
                                open: false,
                                children: [
                                    {
                                        id: 'popover-aa-1',
                                        label: 'aa-1',
                                        open: false,
                                        children: [
                                            {
                                                id: 'popover-aa-1-1',
                                                label: 'aa-1-1',
                                                onClick(menu) {
                                                    return menu;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'popover-bb',
                                label: 'bb',
                                onClick(menu) {
                                    return menu;
                                }
                            }
                        ]
                    };
                    dispatch(slice$2.actions.updateMenu({ id: 'root', menu: sideMenu }));
                    const navMenu = {
                        id: 'root',
                        label: 'root',
                        open: false,
                        children: [
                            {
                                id: 'popover-cc',
                                label: 'cc',
                                open: false,
                                children: [
                                    {
                                        id: 'popover-cc-1',
                                        label: 'cc-1',
                                        open: false,
                                        children: [
                                            {
                                                id: 'popover-cc-1-1',
                                                label: 'cc-1-1',
                                                onClick(menu) {
                                                    return menu;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: 'dd',
                                id: 'popover-dd',
                                onClick(menu) {
                                    return menu;
                                }
                            }
                        ]
                    };
                    dispatch(slice$5.actions.updateMenu({ id: 'root', menu: navMenu }));
                    dispatch(slice$5.actions.updateMobileMenu({
                        id: 'root',
                        menu: { ...navMenu, label: '', icon: 'more_horiz' }
                    }));
                    const extraMenu = {
                        id: 'root',
                        label: '',
                        icon: 'settings',
                        open: false,
                        children: [
                            {
                                label: 'ee',
                                open: false,
                                id: 'popover-ee',
                                children: [
                                    {
                                        label: 'ee-1',
                                        open: false,
                                        id: 'popover-ee-1',
                                        children: [
                                            {
                                                label: 'ee-1-1',
                                                id: 'popover-ee-1-1',
                                                onClick(menu) {
                                                    return menu;
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: 'ff',
                                id: 'popover-ff',
                                onClick(menu) {
                                    return menu;
                                }
                            }
                        ]
                    };
                    dispatch(slice$3.actions.updateMenu({ id: 'root', menu: extraMenu }));
                });
                return React.createElement(Panel, { ...props });
            }
        },
        logo: {
            children: [
                {
                    id: 'logoText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            marginLeft: theme.globals.padding
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.logo.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        },
        navbar: {
            children: [mNavMenuBar, navMenuBar]
        },
        sidebar: {
            children: [
                {
                    element: (_props) => {
                        const menu = ReactRedux.useSelector((state) => state.sideMenu.menu);
                        const dispatch = ReactRedux.useDispatch();
                        const updateMenu = (id, newMenu) => {
                            dispatch(slice$2.actions.updateMenu({ id, menu: newMenu }));
                        };
                        return React.createElement(NestedList, { menu: menu, updateMenu: updateMenu });
                    }
                }
            ]
        },
        extrabar: {
            children: [
                {
                    id: 'extraMenu',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            backgroundColor: theme.extrabar.backgroundColor
                        })),
                        defaultContent: 'extraMenu'
                    },
                    element: (_props) => {
                        const useStyle = MaterialUI.makeStyles((theme) => ({
                            popoverPaper: {
                                width: theme.extrabarPopoverPaper.width
                            },
                            buttonLabel: {
                                color: theme.extrabar.color
                            }
                        }));
                        const classes = useStyle();
                        const menu = ReactRedux.useSelector((state) => state.extraMenu.menu);
                        const dispatch = ReactRedux.useDispatch();
                        const updateMenu = (id, newMenu) => {
                            dispatch(slice$3.actions.updateMenu({ id, menu: newMenu }));
                        };
                        return React.createElement(PopoverList, { menu: menu, updateMenu: updateMenu, classes: classes });
                    }
                }
            ]
        },
        main: {
            children: [
                {
                    id: 'main',
                    props: {
                        defaultContent: 'main'
                    },
                    element: Panel
                }
            ]
        },
        footer: {
            children: [
                {
                    id: 'copyrightText',
                    props: {
                        styledElement: StyledComponent('div', (theme) => ({
                            padding: theme.globals.padding,
                            fontSize: theme.copyrightText.fontSize,
                            color: theme.copyrightText.color
                        })),
                        defaultContent: (_props) => {
                            const text = ReactRedux.useSelector((state) => state.copyright.text);
                            return React.createElement(React.Fragment, { key: 1 }, text);
                        }
                    },
                    element: Panel
                }
            ]
        }
    };

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        notFound: template$2,
        login: template$1,
        manager: template
    });

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        classic: index$3
    });

    const globals = {
        padding: '0.5rem',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        primaryBackgroundColor: '#2d4a77',
        secondaryBackgroundColor: chroma('#2d4a77').brighten(0.4).hex()
    };
    const theme = _.merge(MaterialUI.createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
        },
        palette: {
            primary: {
                main: 'rgb(33, 111, 193)'
            }
        }
    }), {
        header: {
            height: '3rem',
            backgroundColor: globals.primaryBackgroundColor,
            color: '#fff'
        },
        logobar: {
            fontSize: '1.2rem',
            width: '12rem'
        },
        navbar: {
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        navbarPopoverPaper: {
            width: '12rem'
        },
        navMenu: {},
        sidebar: {
            width: '12rem',
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        extrabar: {
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        extrabarMenu: {},
        extrabarPopoverPaper: {
            width: '12rem'
        },
        workspace: {
            backgroundColor: '#fff',
            color: '#000'
        },
        footer: {
            backgroundColor: '#ececec',
            color: 'rgb(40, 40, 40)',
            fontSize: '0.8rem'
        },
        copyrightText: {
            fontSize: '0.8rem',
            color: 'rgb(68, 67, 67)'
        },
        globals
    });

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        classic: theme
    });

    const fullYear = new Date().getFullYear();
    const initialState$1 = {
        text: `All Rights Reserved By RJFW @${fullYear}`
    };
    const slice$1 = RTK.createSlice({
        name: 'copyright',
        initialState: initialState$1,
        reducers: {}
    });

    const initialState = {
        text: 'SMCMS'
    };
    const slice = RTK.createSlice({
        name: 'logo',
        initialState,
        reducers: {}
    });

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        copyright: slice$1,
        logo: slice,
        sidebar: slice$4,
        navMenu: slice$5,
        sideMenu: slice$2,
        extraMenu: slice$3
    });

    function createReducer(slice) {
        const reducer = {};
        _.forEach(slice, (v, i) => {
            reducer[i] = v.reducer;
        });
        return reducer;
    }

    function createStore(rootReducer, middleware = []) {
        return RTK.configureStore({
            reducer: rootReducer,
            middleware,
            devTools: "development" === 'development'
        });
    }

    var types = /*#__PURE__*/Object.freeze({
        __proto__: null
    });

    class Engine {
        pages;
        templates;
        layouts;
        views;
        themes;
        constructor() {
            this.pages = [];
            this.templates = {};
            this.layouts = {};
            this.views = {};
            this.themes = {};
        }
        addView(name, options, map) {
            const view = _.cloneDeep(options);
            ElementNode.replace(view, map);
            this.views[name] = view;
            return view;
        }
        addLayout(name, options, map) {
            const layout = _.cloneDeep(options);
            ElementNode.replace(layout, map);
            this.layouts[name] = layout;
            return layout;
        }
        addTemplate(name, layoutName, map) {
            const template = _.cloneDeep(this.layouts[layoutName]);
            ElementNode.replace(template, map);
            this.templates[name] = template;
            return template;
        }
        addTheme(name, options) {
            const theme = _.cloneDeep(options);
            this.themes[name] = theme;
            return theme;
        }
        addPage(options, templateName, themeName, map) {
            if (typeof this.templates[templateName] === 'undefined') {
                throw new Error(`this templateId (${templateName}) doesn't exists.`);
            }
            const template = _.cloneDeep(this.templates[templateName]);
            ElementNode.replace(template, map);
            const page = {
                title: options.title,
                path: options.path,
                page: template,
                themeName
            };
            this.pages.push(page);
            return page;
        }
        createPages(pages) {
            const children = [];
            _.forEach(pages, (page, i) => {
                const El = (props) => {
                    const node = new ElementNode();
                    node.load(page.page);
                    return node.toComponent(props);
                };
                children.push(React.createElement(ReactRouterDOM.Route, { key: i, path: page.path, element: React.createElement(El, null) }));
            });
            return React.createElement(ReactRouterDOM.Routes, null, children);
        }
        createRouter(themeName, themes) {
            return React.createElement(ReactRouterDOM.BrowserRouter, null, this.createPages(themes[themeName]));
        }
        createApp() {
            const themes = {};
            _.forEach(this.pages, (page, _i) => {
                if (typeof themes[page.themeName] === 'undefined') {
                    themes[page.themeName] = [];
                }
                themes[page.themeName].push(page);
            });
            _.forEach(themes, (pages, _i) => {
                pages.sort((a, b) => a.path.localeCompare(b.path));
            });
            const themeNames = _.keys(themes);
            const pages = themeNames.map((themeName, _i) => (React.createElement(MaterialUI.ThemeProvider, { key: themeName, theme: MaterialUI.createTheme(this.themes[themeName]) }, this.createRouter(themeName, themes))));
            return React.createElement(React.Fragment, { key: 1 }, pages);
        }
        start(options) {
            const { store } = options;
            ReactDOM.render(React.createElement(ReactRedux.Provider, { store: store }, this.createApp()), document.getElementById('app'));
        }
    }

    exports.DS = index$9;
    exports.Engine = Engine;
    exports.EngineTypes = types;
    exports.HtmlTag = HtmlTag;
    exports.StyledComponent = StyledComponent;
    exports.components = index$8;
    exports.createReducer = createReducer;
    exports.createStore = createStore;
    exports.layouts = index$4;
    exports.menuFindExt = menuFindExt;
    exports.menuForeach = menuForeach;
    exports.slices = index;
    exports.templates = index$2;
    exports.themes = index$1;
    exports.updateMenu = updateMenu;
    exports.views = index$6;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=SmfwWEB.umd.development.js.map
