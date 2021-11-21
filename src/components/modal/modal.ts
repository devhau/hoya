import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhModal = defineComponent({
    name: 'vh-modal',
    props: {
        class: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'sm', 'lg', 'xl',
                'fullscreen', 'fullscreen-sm-down', 'fullscreen-md-down',
                'fullscreen-lg-down', 'fullscreen-xl-down', 'fullscreen-xxl-down'
            ].includes(val),
        },
    },
    render() {
        const { class: classProps, color, size, show, title, loading } = this;
        let className = makeClassByName('modal fade', 'modal', color);
        let className_dialog = makeClassByName('modal-dialog', 'modal', size);
        className = makeClassByName(className, '', classProps, '');
        if (show) {
            className = makeClassByName(className, '', 'show', '');
        }
        if (loading) {
            className = makeClassByName(className, '', 'vh-modal-loading', '');
        }
        let { footer: footerComponent, header: headerComponent, default: defaultComponent }: any = this.$slots;
        let loadingComponent: any = h('div',
            {
                class: 'vh-face-loading'
            },
            h('div',
                {
                    class: 'spinner-border text-primary',
                    role: 'status'
                },
                h('span',
                    {
                        class: 'visually-hidden'
                    },
                    'Loading...'
                )
            )
        );
        // return the render function
        return show && [
            h('div', {
                class: 'modal-face'
            }),
            h('div',
                {
                    ...this.$attrs,
                    class: className
                },
                [

                    h('div', {
                        class: className_dialog
                    },
                        h('div', {
                            class: 'modal-content'
                        },
                            [
                                !headerComponent && h('div', {
                                    class: 'modal-header'
                                },
                                    [
                                        h('h5', {
                                            class: 'modal-title'
                                        }, title)
                                        ,
                                        h('button', {
                                            class: 'btn-close',
                                            type: 'button',
                                            'data-bs-dismiss': 'modal',
                                            'aria-label': 'Close',
                                            onClick: () => {
                                                this.$emit('update:show', false);
                                                this.$emit('hide');
                                            }
                                        })

                                    ]
                                ),
                                headerComponent && h(headerComponent, { class: 'modal-header', app: this }),
                                h('div', {
                                    class: 'modal-body'
                                }, [loading && h(loadingComponent, {}), defaultComponent && h(defaultComponent, {})]),
                                !footerComponent && h('div', {
                                    class: 'modal-footer'
                                }),
                                footerComponent && h('div', { class: 'modal-footer' }, h(footerComponent, { app: this })),
                            ]
                        )
                    )
                ]
            )
        ];
    },
    setup() {

    }
});
