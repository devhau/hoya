import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import html2canvas from 'html2canvas';
export const vhToImage = defineComponent({
    name: 'vh-to-image',
    props: {
        class: {
            type: String,
            default: '',
        },
        image: {}
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-to-image';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className,
        },
            this.$slots
        );
    },
    methods: {
        summitImage(image: any) {
            this.$emit('update:image', image);
            this.$emit('onImage', image);
        },
        getImage() {
            html2canvas(this.$el).then((canvas: any) => {
                this.summitImage(canvas.toDataURL());
            });
        }
    },
    updated() {
        this.$nextTick(() => {
            this.getImage();
        });
    },
    watch: {
        "$el.innerHTML": {
            handler: function () {
                this.$nextTick(() => {
                    this.getImage();
                });
            },
            deep: true,
            immediate: true,
        },
    },
});
