import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils';
import { vhMenu } from '@/components/menu';
const menuComponent: any = vhMenu;

export const vhSidebar = defineComponent({
    name: 'vh-sidebar',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, $slots } = this;

        let className = 'vh-sidebar';
        className = makeClassByName(className, '', classProps, '');
        let child = () => {
            if ($slots.default !== undefined) {
                return $slots;
            }
            return [
                h('div', {
                    class: 'vh-logo'
                },
                    [
                        this.menuApp?.app?.logo?.app && h('div', { class: 'vh-logo-app' }, this.menuApp?.app?.logo?.app),
                        this.menuApp?.app?.logo?.mini && h('div', { class: 'vh-logo-mini' }, this.menuApp?.app?.logo?.mini)
                    ]
                ),
                h('div', {
                    class: 'vh-sidebar-main'
                },
                    this.menuApp?.sidebar && h(menuComponent, { source: this.menuApp?.sidebar, class: 'vh-menu-sidebar', showSub: true }),
                ),
                h('div', {
                    class: 'vh-version'
                },
                    [
                        this.menuApp?.app?.version?.app && h('div', { class: 'vh-version-app' }, this.menuApp?.app?.version?.app),
                        this.menuApp?.app?.version?.mini && h('div', { class: 'vh-version-mini' }, this.menuApp?.app?.version?.mini)
                    ]
                )
            ]
        }
        // return the render function
        return h('div', {
            class: className,
        }, child());
    },
    setup() {
        const menuApp: any = inject('menuApp');
        return { menuApp };
    }
})