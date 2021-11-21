import { h, defineComponent, ref } from 'vue';
import { makeClassByName } from '@/utils/class.util';

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
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-to-html';
        className = makeClassByName(className, '', classProps, '');

        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className,
            ref: this.elChild
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
            return this.$el.innerHTML;
        }
    },
    mounted() {
        this.$nextTick(() => this.updateHtml())
    },
    watch: {
        "$el.innerHTML": {
            handler: function (_html) {
                this.summitHtml(_html);
            },
            deep: true,
            immediate: true,
        },
    },
    setup() {
        let elChild: any = ref(null);
        return { elChild };
    },
});
