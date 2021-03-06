import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';
import { vhHeader } from './../part/header';
import { vhFooter } from './../part/footer';
import { vhSidebar } from './../part/sidebar';
const vhSidebarComponent = vhSidebar as any;
const vhHeaderComponent = vhHeader as any;
const vhFooterComponent = vhFooter as any;

export const vhSidebarLayout = defineComponent({
    name: 'vh-sidebar-layout',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, } = this;
        let child: any = [];
        let className = 'vh-sidebar-layout';
        className = makeClassByName(className, '', classProps, '');
        let { header: headerComponent, footer: footerComponent } = this.$slots;
        if (headerComponent !== undefined) {
            child = [...child, h(headerComponent, {})];
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
                h(vhSidebarComponent, {}),
                h('div', { class: 'vh-body' }, child)
            ]
        );
    }
})