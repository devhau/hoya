import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { getArrayRange } from '@/utils/vh.util';

export const vhPagination = defineComponent({
    name: 'vh-pagination',
    props: {
        class: {
            type: String,
            default: '',
        },
        current: {
            type: Number,
            default: 0,
        },
        start: {
            type: Number,
            default: 0,
        },
        end: {
            type: Number,
            default: 10,
        },
        last: {
            type: Number,
            default: 0,
        },
        next: {
            default: 'Next'
        },
        previous: {
            default: 'Previous'
        }
    },
    render() {
        const { class: classProps, start, end, previous, next, current, last } = this;
        let className = makeTextClass('pagination', '', classProps, '');

        // return the render function
        return h('nav', {

        },
            h('ul',
                {
                    class: className
                },
                [
                    h('li', {
                        class: current == start ? 'page-item disabled' : 'page-item'
                    }, h('a', { class: 'page-link', onclick: () => this.$emit('page', current - 1) }, previous)),
                    ...getArrayRange(start, end).map((index: any) => h('li', { class: current == index ? 'page-item active' : 'page-item' }, h('a', { class: 'page-link', onclick: () => this.$emit('page', index) }, index))),
                    ...last > end ? [
                        h('li', { class: 'page-item disabled' }, h('a', { class: 'page-link' }, '...')),
                        h('li', { class: 'page-item' }, h('a', { class: 'page-link', onclick: () => this.$emit('page', last) }, last))] : [],
                    h('li', {
                        class: current == end ? 'page-item disabled' : 'page-item'
                    }, h('a', { class: 'page-link', onclick: () => this.$emit('page', current + 1) }, next))
                ]
            )
        )
    },
    setup() {

    }
});
