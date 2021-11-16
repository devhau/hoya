import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { hotKey } from '@/utils/event.util';
export const vhButton = defineComponent({
    name: 'vh-button',
    props: {
        class: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'button'
        },
        text: {
            type: String,
            default: undefined
        },
        color: {
            type: String,
            default: 'primary'
        },
        beforeIcon: {
            type: String,
            default: undefined
        },
        afterIcon: {
            type: String,
            default: undefined
        },
        size: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'sm', 'lg'].includes(val),
        },
        keyCommand: {
            type: String,
            default: undefined
        },
    },
    setup(props: any, { slots, attrs, emit }) {
        const { class: classProps, color, tag, size, text, beforeIcon, afterIcon, keyCommand } = props;
        let className = makeTextClass('btn', 'btn', color);
        className = makeTextClass(className, 'btn', size);
        className = makeTextClass(className, '', classProps, '');
        keyCommand && hotKey(keyCommand, () => {
            emit('click');
        });
        return () => h(
            tag,
            {
                ...attrs,
                class: className,
            },
            [
                beforeIcon && h('i', { class: `icon-before ${beforeIcon}` }),
                text && h('span', {}, text),
                !text && h('span', {}, slots),
                afterIcon && h('i', { class: `icon-after ${afterIcon}` }),
            ]
        );
    }
});
