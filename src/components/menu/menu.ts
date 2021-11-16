import { h, inject, defineComponent, provide } from 'vue';
import { isFunction, makeTextClass, } from '@/utils/class.util';
import { vhMenuLabel } from './menu-label';
import { vhMenuLink } from './menu-link';
const MenuLabel: any = vhMenuLabel;
const MenuLink: any = vhMenuLink;
import { System } from '@/constants';
const getMenuShow = (menu: any, app: any) => {
    if (isFunction(menu))
        return menu;
    if (menu) {
        return menu.map((item: any) => {
            if (item.sub) {
                item.sub = getMenuShow(item.sub, app);
                if (item.sub === undefined || !isFunction(item.sub) && item.sub.length === 0) {
                    return undefined;
                }
            }
            if (isFunction(item.show) && !item.show()) {
                return undefined;
            }
            if (item.show !== undefined && item.show !== true) {
                return undefined;
            }
            if (app.$can && item.can && !app.$can(item.can)) {
                return undefined;
            }
            return item;
        }).filter((item: any) => item != undefined);
    }

    return undefined;
}
export const vhMenuItem: any = defineComponent({
    name: 'vh-menu-item',
    props: {
        class: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'li'
        },
        router: {
            default: undefined,
        },
        link: {
            default: '',
        },
        icon: {
            type: [String, Function],
            default: ''
        },
        title: {
            type: [String, Function],
            default: ''
        },
        level: {
            type: Number,
            default: 0
        },
        sub: {
            default: undefined
        }
    },
    data() {
        return {
            active: false,
        }
    },
    render() {
        const { class: classProps, tag, sub, router, icon, title, level, link }: any = this;
        let className = makeTextClass('vh-menu-item', '', classProps, '');
        const children = () => {
            if (this.$slots.default !== undefined) {
                return this.$slots;
            }
            if (isFunction(sub)) {
                const rsSub = sub();
                if (rsSub && Array.isArray(rsSub) && rsSub.length) {
                    return h(vhMenuSub, {
                        icon, title, sub: rsSub, level
                    });
                }
                let classNameSub = makeTextClass('vh-menu-sub', '', 'vh-menu-component', '');
                return [
                    h(MenuLabel, {
                        icon, title,
                    }),
                    h('div', {
                        class: classNameSub,
                        level
                    }, h('div', { class: 'vh-menu-component-body' }, rsSub))
                ];
            }
            if (sub !== undefined && sub.length > 0) {
                return h(vhMenuSub, {
                    icon, title, sub, level
                });
            } else {
                return h(MenuLink, {
                    router, icon, title, link
                });
            }
        };
        // return the render function;
        return h(tag,
            {
                ...this.$attrs,
                class: className,
            },
            children()
        );
    },
    setup() {


    }
});
export const vhMenu: any = defineComponent({
    name: 'vh-menu',
    props: {
        class: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'ul'
        },
        level: {
            type: Number,
            default: 0
        },
        showSub: {
            type: Boolean,
            default: false
        },
        source: {
            type: Array,
            default: []
        }
    },
    setup(props, { attrs, slots }) {
        const { class: classProps, tag, source: sourceTemp, showSub }: any = props;
        let source = sourceTemp;
        //global
        const vh_global: any = inject(System.provide);
        const module = vh_global ? vh_global.$module : undefined;
        if (props.level === 0) {
            provide('showSub', showSub);
            source = getMenuShow(sourceTemp, vh_global);
        }
        let className = makeTextClass('vh-menu', '', classProps, '');
        let level: number = props.level;
        if (level > 0) {
            className = makeTextClass(className, 'vh-menu-level', level);
        }
        level = level + 1;
        let children = () => {
            if (source && source.length > 0) {
                return source.map((item: any, index: any) => {
                    let moduleItem = undefined;
                    if (item.module && item.module !== '' && module && (moduleItem = module[item.module]) != undefined) {
                        if (moduleItem.router !== undefined) {
                            return h(vhMenuItem, {
                                title: moduleItem.title,
                                icon: moduleItem.icon,
                                class: moduleItem.className,
                                router: moduleItem.router,
                                sub: item.sub,
                                idx: index,
                                level
                            });
                        }
                        if (moduleItem.link !== undefined) {
                            return h(vhMenuItem, {
                                title: moduleItem.title,
                                icon: moduleItem.icon,
                                link: moduleItem.link,
                                class: moduleItem.className,
                                sub: item.sub,
                                idx: index,
                                level
                            });
                        }
                    }
                    return h(vhMenuItem, {
                        title: item.title,
                        icon: item.icon,
                        class: item.className,
                        router: item.router,
                        link: item.link,
                        sub: item.sub,
                        idx: index,
                        level
                    })
                });
            }
            if (slots.default === undefined) {
                return h('div', { class: className });
            }
            return slots;
        }
        // return the render function
        return () => h(tag,
            {
                ...attrs,
                class: className
            },
            children()
        );
    },
});

export const vhMenuSub: any = defineComponent({
    name: 'vh-menu-sub',
    props: {
        class: {
            type: String,
            default: '',
        },
        icon: {
            type: [String, Function],
            default: ''
        },
        title: {
            type: [String, Function],
            default: ''
        },
        level: {
            type: Number,
            default: 0
        },
        sub: {
            default: undefined
        }
    },
    data() {
        return {
            active: false,
        }
    },
    methods: {
        doActive() {
            this.active = true;
        },
        checkActive(name: any) {
            let sub: any = this.sub;
            if (sub && sub.filter((item: any) => item.name == name).length > 0) {
                return true;
            }
            return true;
        }
    },
    render() {
        const { class: classProps, sub, icon, title, level }: any = this;
        let className = makeTextClass('vh-menu-sub', '', classProps, '');
        // return the render function
        if (this.active) {
            className = makeTextClass(className, '', 'active', '');
        }
        return [
            h(MenuLabel, {
                icon, title,
                onclick: () => this.active = !this.active
            }),
            h(vhMenu, {
                source: sub,
                class: className,
                level
            })
        ];

    }
});
