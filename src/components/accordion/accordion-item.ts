import { h, defineComponent, inject } from 'vue';
import { makeTextClass } from '@/utils/class.util';

export const vhAccordionItem = defineComponent({
    name: 'vh-accordion-item',
    props: {
        class: {
            type: String,
            default: ''
        },
        itemTitle: {
            type: String,
            default: ''
        },
        itemContent: {
            type: String,
            default: ''
        },
        itemIndex: {
            type: Number,
            default: 0
        },
        itemShow: {
            type: Boolean,
            default: false
        },
        item: {}
    },
    render() {
        const { class: classProps, item }: any = this;
        let className = makeTextClass('accordion-item', '', classProps, '');
        let classNameButton = 'accordion-button';
        let classNameAccordion = 'accordion-collapse collapse';
        if (this.itemShow === true) {
            classNameAccordion = makeTextClass(classNameAccordion, '', 'show', '');
        } else {
            classNameButton = makeTextClass(classNameButton, '', 'collapsed', '');
        }
        // return the render function
        return h('div',
            {
                class: className,
            },
            [
                h('h2',
                    {
                        class: 'accordion-header'
                    },
                    h('button',
                        {
                            class: classNameButton,
                            onClick: () => {
                                this.TouchItem(this.itemIndex);
                            }
                        },
                        item[this.itemTitle] ?? ""
                    )
                ),
                h('div',
                    {
                        class: classNameAccordion
                    },
                    h('div',
                        {
                            class: 'accordion-body'
                        },
                        item[this.itemContent] ?? ""
                    )
                )
            ]
        );
    },
    setup() {
        const TouchItem: any = inject('TouchItem');
        return { TouchItem };
    }
});