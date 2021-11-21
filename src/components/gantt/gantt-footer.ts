import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhGanttFooter = defineComponent({
    name: 'vh-gantt-footer',
    props: {
        class: {
            type: String,
            default: '',
        },
        timelineX: {
            type: Number,
            default: 0,
        },
        timelineWith: {
            type: Number,
            default: 0,
        },
        infoX: {
            type: Number,
            default: 0,
        },
        infoWith: {
            type: Number,
            default: 0,
        },
        dataColumns: {
            type: Array
        },
    },
    setup(props: any, { slots, attrs }) {
        const { class: classProps, } = props;
        let className = 'vh-gantt-footer';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return () =>
            h(
                'div',
                {
                    ...attrs,
                    class: className
                }, slots
            );
    }
});
