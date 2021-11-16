import { h, defineComponent, inject } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { vhMenu } from '@/components/menu';
const menuComponent: any = vhMenu;

export const vhFooter = defineComponent({
    name: 'vh-footer',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, $slots } = this;

        let className = 'vh-footer';
        className = makeTextClass(className, '', classProps, '');
        let child = () => {
            if ($slots.default !== undefined) {
                return $slots;
            }

            return [
                this.menuApp?.footer && h(menuComponent, { source: this.menuApp?.footer, class: 'vh-menu-float-left vh-menu-footer' })
            ];
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