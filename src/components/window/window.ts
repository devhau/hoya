import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhWindow = defineComponent({
    name: 'vh-window',
    props: {
        class: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'window'
        },
        type: {
            type: String,
            default: 'primary'
        }
    },
    data() {
        return {
            isMove: false,
            offsetWindow: []
        }
    },
    render() {
        const { class: classProps, type, title }: any = this;
        let className = 'vh-window';
        className = makeClassByName(className, 'window', type);
        className = makeClassByName(className, '', classProps, '');
        let children = () => {
            return [
                h('div', {
                    class: 'vh-window-header'
                }, [
                    h('span', {
                        class: 'vh-window-header_title',
                        onmousedown: (e: any) => {
                            this.isMove = true;
                            let offsetLeft: any = this.$el.offsetLeft - e.clientX;
                            let offsetTop: any = this.$el.offsetTop - e.clientY;
                            this.offsetWindow = [offsetLeft as never, offsetTop as never];
                        }
                    }, title),
                    h('i', {
                        class: 'bi bi-dash-square',
                        onClick: () => this.$emit('min')
                    }),
                    h('i', {
                        class: 'bi bi-fullscreen',
                        onClick: () => this.$emit('fullscreen')
                    }),
                    h('i', {
                        class: 'bi bi-x-square',
                        onClick: () => this.$emit('close')
                    })
                ]),
                h('div', {
                    class: 'vh-window-body'
                }, this.$slots)

            ];
        }
        // return the render function
        return h('div',
            {
                class: className,
                onmousemove: (e: any) => {
                    if (this.isMove) {
                        let mousePosition = {
                            x: e.clientX,
                            y: e.clientY
                        };
                        this.$el.style.left = (mousePosition.x + this.offsetWindow[0]) + 'px';
                        this.$el.style.top = (mousePosition.y + this.offsetWindow[1]) + 'px';
                    }
                },
                onmouseup: () => {
                    this.isMove = false;
                },
                onmouseleave: () => {
                    this.isMove = false;
                }
            },
            h(children, {})
        );
    }
});