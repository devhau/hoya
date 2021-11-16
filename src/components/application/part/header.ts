import { h, defineComponent, inject } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { vhMenu } from '@/components/menu';
const menuComponent: any = vhMenu;
export const vhHeader = defineComponent({
    name: 'vh-header',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, $slots } = this;
        let className = 'vh-header';
        className = makeTextClass(className, '', classProps, '');
        let child = () => {
            return [
                h('span', {
                    class: 'vh-touch-sidebar',
                    onClick: () => {
                        this.touchSidebar && this.touchSidebar();
                    }
                }, h('i', {
                    class: 'bi bi-justify',
                }))
                ,
                [
                    $slots.default && h('div', {}, $slots),
                    !$slots.default && [
                        this.menuApp?.header && h(menuComponent, { source: this.menuApp?.header?.left ?? this.menuApp?.header, class: 'vh-menu-float-left vh-menu-header vh-menu-header-left ' }),
                        h('div', { class: 'vh-flex-auto' }),
                        this.menuApp?.header?.right && h(menuComponent, { source: this.menuApp?.header?.right, class: 'vh-menu-float-left vh-menu-header vh-menu-header-right' })
                    ]
                ]
            ];
        }
        // return the render function
        return h('div', {
            class: className,
        }, child());
    },
    setup() {
        const touchSidebar: any = inject('touchSidebar');
        const menuApp: any = inject('menuApp');
        return { menuApp, touchSidebar };
    }
})