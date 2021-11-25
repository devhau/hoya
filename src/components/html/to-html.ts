import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';

export const vhToHtml = defineComponent({
    name: 'vh-to-html',
    props: {
        class: {
            type: String,
            default: '',
        },
        html: {
            type: String,
            default: ''
        },
        isRemoveDataVue: {
            type: Boolean,
            default: true
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-to-html';
        className = makeClassByName(className, '', classProps, '');

        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        },
            this.$slots
        );
    },
    methods: {
        summitHtml(html: string) {
            this.$emit('update:html', html);
            this.$emit('onHtml', html);
        },
        updateHtml() {
            this.summitHtml(this.getHtml());
        },
        getHtml() {
            if (this.isRemoveDataVue) {
                return this.$el.innerHTML.replace(/data-v-(.*?)=['"](.*?)['"]/gi, "");
            } else {
                return this.$el.innerHTML;
            }
        }
    },
    mounted() {
        this.$nextTick(() => this.updateHtml())
    },
    watch: {
        "$el.innerHTML": {
            handler: function (_html) {
                this.$nextTick(() => this.updateHtml())
            },
            deep: true,
            immediate: true,
        },
    },
});
