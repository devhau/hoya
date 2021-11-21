import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

import { vhAccordionItem } from './accordion-item';
const AccordionItem = vhAccordionItem as any;
export const vhAccordion = defineComponent({
    name: 'vh-accordion',
    props: {
        class: {
            type: String,
            default: ''
        },
        itemTitle: {
            type: String,
            default: 'title'
        },
        itemContent: {
            type: String,
            default: 'content'
        },
        flush: {
            type: Boolean,
            default: true,
        },
        source: {
            type: Array
        }
    },
    data() {
        return {
            itemIndex: [],
        }
    },
    provide() {
        const TouchItem = (index: number) => {
            if (this.source != undefined) {
                this.$emit('TouchItem', this.source[index], index);
            } else {
                this.$emit('TouchItem', index);
            }
            if (this.checkItem(index)) {
                this.itemIndex.splice(this.itemIndex.indexOf(index as never), 1);
            } else {
                if (this.flush === true) {
                    this.itemIndex = [index as never];
                } else {

                    const _temp: any = [...this.itemIndex, index];
                    this.itemIndex = _temp;
                }
            }
        };
        return { TouchItem };
    },
    methods: {
        checkItem(index: any) {
            return this.itemIndex.indexOf(index as never) > -1;
        }
    },
    render() {
        const { class: classProps, source, itemTitle, itemContent }: any = this;
        let className = 'vh-accordion accordion';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div',
            {
                class: className,
            },
            [
                source && source.map((data: any, index: any) => h(AccordionItem, { item: data, itemTitle, itemContent, itemIndex: index, itemShow: this.checkItem(index) })),
                this.$slots.default && this.$slots
            ]
        );
    }
});