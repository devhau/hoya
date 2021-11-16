import { h, defineComponent } from 'vue';
import { isFunction, makeTextClass, } from '@/utils/class.util';

export const vhMenuLabel: any = defineComponent({
    name: 'vh-menu-label',
    props: {
        class: {
            type: [String, Function],
            default: '',
        },
        tag: {
            default: 'p'
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
    setup(props, { attrs }) {
        const { class: classProps, tag, icon, title }: any = props;
        let className = makeTextClass('vh-menu-label', '', classProps, '');
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
                return [h('i', {
                    class: iconClass,
                }), h('label', {}, titleText)];
            }
            return [h('label', {}, titleText)];
        }
        // return the render function
        return () =>
            h(
                tag,
                {
                    ...attrs,
                    class: className,
                }, contentTitle()
            );
    }
});
