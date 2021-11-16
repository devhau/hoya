import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { vhHeader } from './../part/header';
import { vhFooter } from './../part/footer';
const vhHeaderComponent = vhHeader as any;
const vhFooterComponent = vhFooter as any;
export const vhNoSidebarLayout = defineComponent({
    name: 'vh-no-sidebar-layout',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, } = this;
        let child: any = [];

        let className = 'vh-no-sidebar-layout';
        className = makeTextClass(className, '', classProps, '');
        let { header: headerComponent, footer: footerComponent } = this.$slots;
        if (headerComponent !== undefined) {
            child = [...child, headerComponent];
        } else {
            child = [...child, h(vhHeaderComponent, {})];
        }

        child = [...child, h('div', { class: 'vh-content' }, this.$slots)];

        if (footerComponent !== undefined) {
            child = [...child, footerComponent];
        } else {
            child = [...child, h(vhFooterComponent, {})];
        }
        // return the render function
        return h('div', {
            class: className,
        },
            [
                h('div', { class: 'vh-body' }, child)
            ]
        );
    }
})