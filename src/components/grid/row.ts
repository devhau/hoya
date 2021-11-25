import { h, defineComponent } from 'vue';
import { makeClassByNum, makeClassByName } from '@/utils';

const makeClassByProps = (props: any) => {
    let className = 'row';
    className = makeClassByNum(className, 'row-cols', props.cols);
    className = makeClassByNum(className, 'row-cols-sm', props.smcols);
    className = makeClassByNum(className, 'row-cols-md', props.mdcols);
    className = makeClassByNum(className, 'row-cols-lg', props.lgcols);
    className = makeClassByNum(className, 'row-cols-xl', props.xlcols);
    className = makeClassByNum(className, 'row-cols-xxl', props.xxlcols);
    className = makeClassByName(className, 'justify-content', props.justify);
    className = makeClassByName(className, 'justify-content-sm', props.justifysm);
    className = makeClassByName(className, 'justify-content-md', props.justifymd);
    className = makeClassByName(className, 'justify-content-lg', props.justifylg);
    className = makeClassByName(className, 'justify-content-xl', props.justifyxl);
    className = makeClassByName(className, 'justify-content-xxl', props.justifyxxl);
    return className;
};
export const vhRow = defineComponent({
    name: 'vh-row',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        class: {
            type: String,
            default: ''
        },
        cols: {
            type: Number,
            default: -1,
        },
        smcols: {
            type: Number,
            default: -1,
        },
        mdcols: {
            type: Number,
            default: -1,
        },
        lgcols: {
            type: Number,
            default: -1,
        },
        xlcols: {
            type: Number,
            default: -1,
        },
        xxlcols: {
            type: Number,
            default: -1,
        },
        justify: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
        justifysm: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
        justifymd: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
        justifylg: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
        justifyxl: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
        justifyxxl: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'start', 'center', 'end', 'around', 'between', 'evenly'].includes(val),
        },
    },
    setup(props: any, { slots, attrs }) {
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
