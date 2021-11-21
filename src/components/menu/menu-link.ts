import { h, resolveComponent, defineComponent, inject } from 'vue';
import { isFunction, makeClassByName } from '@/utils/class.util';
export const vhMenuLink: any = defineComponent({
    name: 'vh-menu-link',
    props: {
        class: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'router-link'
        },
        router: {
            default: undefined,
        },
        link: {
            default: undefined,
        },
        icon: {
            type: [String, Function],
            default: ''
        },
        title: {
            type: [String, Function],
            default: ''
        },
    },
    data() {
        return { isActive: false };
    },
    watch: {
        '$route.name': {
            handler: function (routerNew) {
                if (this.showSub) {
                    if (routerNew && routerNew == (this.router as any)?.name) {
                        this.$nextTick(() => {
                            if (this.$parent?.$parent?.$el?.className?.indexOf(' active ') == -1) {
                                this.isActive = true;
                                (this.$parent?.$parent?.$el).className = (this.$parent?.$parent?.$el).className + ' active ';
                            }
                        });
                    } else if (this.$parent?.$parent?.$el?.className?.indexOf(' active ') >= 0 && this.isActive === true) {
                        (this.$parent?.$parent?.$el).className = (this.$parent?.$parent?.$el).className.replace(' active ', '');
                        this.isActive = false;
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    render() {
        const { class: classProps, tag, icon, title, link }: any = this;
        let router: string | any | undefined = this.router;
        let className = makeClassByName('vh-menu-link', '', classProps, '');
        let titleText = title;
        if (isFunction(title)) {
            titleText = title();
        }
        let contentTitle = () => {
            if (icon) {
                let iconClass = icon;
                if (isFunction(icon)) {
                    iconClass = icon();
                }
                return [
                    h('i', {
                        class: iconClass,
                    }),
                    h('label', {}, titleText)
                ];
            }
            return [
                h('label', {}, titleText)
            ];
        }
        if (link !== undefined && link !== '') {
            if (isFunction(link)) {
                return h(
                    'a',
                    {
                        ...this.$attrs,
                        class: className,
                        onClick: (e: any) => {
                            (link as any)(e);
                            e.preventDefault && e.preventDefault();
                            e.stopPropagation && e.stopPropagation();
                        }
                    }, contentTitle()
                );
            }
            return h(
                'a',
                {
                    ...this.$attrs,
                    class: className,
                    href: link,
                }, contentTitle()
            );
        }
        if (router === undefined || router === '') {
            return h(
                'a',
                {
                    ...this.$attrs,
                    class: className,
                    href: '#',
                }, contentTitle()

            );
        }

        const RouterLink: any = resolveComponent(tag);
        // return the render function
        return h(RouterLink,
            {
                ...this.$attrs,
                class: className,
                to: router,

            },
            {
                default() {
                    return contentTitle();
                }
            }
        );
    },
    setup() {
        const showSub: any = inject('showSub');
        return { showSub };
    }
});
