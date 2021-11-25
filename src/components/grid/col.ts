import { h, defineComponent } from 'vue';
import { makeClassByNum, makeClassByName } from '@/utils';

const makeClassByProps = (props: any) => {
    let className = '';
    className = makeClassByNum(className, 'col-sm', props.sm);
    className = makeClassByNum(className, 'col-md', props.md);
    className = makeClassByNum(className, 'col-lg', props.lg);
    className = makeClassByNum(className, 'col-xl', props.xl);
    className = makeClassByNum(className, 'col-xxl', props.xxl);
    //offset
    className = makeClassByNum(className, 'offset-sm', props.osm);
    className = makeClassByNum(className, 'offset-md', props.omd);
    className = makeClassByNum(className, 'offset-lg', props.olg);
    className = makeClassByNum(className, 'offset-xl', props.oxl);
    className = makeClassByNum(className, 'offset-xxl', props.oxxl);
    if (className === '') className = 'col';
    return className;
};
export const vhCol = defineComponent({
    name: 'vh-col',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        class: {
            type: String,
            default: ''
        },
        sm: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        md: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        lg: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        xl: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        xxl: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        osm: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        omd: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        olg: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        oxl: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
        oxxl: {
            type: Number,
            default: -1,
            validator: (val: number) => val >= -1 && val <= 12,
        },
    },
    setup(props, { slots, attrs }) {
        const { tag, class: classProps } = props;
        let className = makeClassByProps(props);
        className = makeClassByName(className, '', classProps, '');

        // return the render function
        return () =>
            h(
                tag,
                {
                    ...attrs,
                    class: className
                },
                slots
            );
    }
});
