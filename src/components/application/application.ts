import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import { Layout } from './layout';


export const vhApplication = defineComponent({
    name: 'vh-application',
    props: {
        class: {
            type: String,
            default: ''
        },
        hideSidebar: {
            type: Boolean,
            default: false
        },
        layout: {
            type: String,
            default: 'Sidebar'
        },
        miniSidebar: {
            type: Boolean,
            default: false
        },
        menu: null,
    },
    provide() {
        let app = this;
        const touchSidebar = () => {
            this._miniSidebar = !this._miniSidebar;
        };
        const menuApp = this.menu;
        return { app, touchSidebar, menuApp };
    },
    data() {
        return {
            _miniSidebar: false,
        };
    },
    mounted() {
        this._miniSidebar = this.miniSidebar;
    },
    watch: {
        miniSidebar(valNew: any) {
            this._miniSidebar = valNew;
        },
    },
    render() {
        const { class: classProps, layout: layoutName }: any = this;
        let className = 'vh-main';
        className = makeClassByName(className, '', classProps, '');
        if (this._miniSidebar === true) {
            className = makeClassByName(className, '', 'vh-mini', '');
        }
        if (this.hideSidebar === true) {
            className = makeClassByName(className, '', 'vh-hide-sidebar', '');
        }
        // return the render function
        let lay: any = Layout[`${layoutName}`] ?? Layout.None;
        return h('div', {
            class: 'vh-application',
        },
            h(lay, {
                class: className
            }, this.$slots)
        );
    }
});
