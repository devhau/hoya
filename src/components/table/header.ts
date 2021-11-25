import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';
import { vhInput } from '@/components/form/input';
import { vhButton } from '@/components/button/button';
import { checkEvent } from '@/utils';
import { isFunction } from '@vue/shared';
let vhInputComponent: any = vhInput;
let vhButtonComponent: any = vhButton;

export const vhColumnHeader = defineComponent({
    name: 'vh-column-header',
    props: {
        class: {
            type: String,
            default: ''
        },
        option: {},
        sort: {
            type: Boolean,
            default: false
        },
        filter: {
            default: undefined
        },
        isSort: {
            default: false,
        },
        isFilter: {
            default: false,
        },
    },
    data() {
        return {
            showFilter: false,
            dataTemp: undefined,
            dataMark: undefined,
        }
    },
    methods: {
        clickOutsideEvent(event: any) {
            if (this.showFilter && checkEvent(event, this.$el)) {
                this.showFilter = false;
            }
        }
    },
    mounted() {
        if (document) {
            document.addEventListener('click', this.clickOutsideEvent);
        }
    },
    unmounted() {
        if (document) {
            document.removeEventListener('click', this.clickOutsideEvent);
        }
    },
    render() {
        const { class: classProps, option, sort, isSort, isFilter, dataMark }: any = this;
        let className = 'vh-column-header';
        let condition = option?.condition ?? "like";
        className = makeClassByName(className, '', classProps, '');
        let headerTitle = () => option?.title && isFunction(option?.title) ? option?.title() : option?.title;
        let child = [
            h('span', { class: 'vh-column-header_box--title' }, [headerTitle(), dataMark && `(${dataMark})`])
        ];
        if (!(isFilter === false) && option?.isFilter !== false) {
            child = [
                ...child,
                h('i', {
                    class: `vh-column-header_box--icon i-filter ${option?.iconFilter ?? 'bi bi-filter'}`,
                    onClick: () => {

                        if (this.filter != undefined) {
                            this.dataTemp = (this.filter as any)[condition];
                        } else {
                            this.dataTemp = undefined;
                        }
                        this.showFilter = !this.showFilter;
                        this.$emit('showFilter', this.showFilter);
                    }
                })
            ];
        }
        if (!(isSort === false) && option?.isSort !== false) {
            if (sort) {
                child = [
                    ...child,
                    h('i', {
                        class: `vh-column-header_box--icon i-sort ${option?.iconSort ?? 'bi-sort-alpha-down'}`,
                        onClick: () => {
                            this.$emit('sort', !this.sort);
                        }
                    })
                ];
            } else {
                child = [
                    ...child,
                    h('i', {
                        class: `vh-column-header_box--icon i-sort ${option?.iconSort ?? 'bi-sort-alpha-up'}`,
                        onClick: () => {
                            this.$emit('sort', !this.sort);
                        }
                    })
                ];
            }
        }
        let setDataFilter = (data: any) => {
            this.dataTemp = data;
        }
        let bodyFilter: any = [
            this.$slots['bodyFilter'] && h(this.$slots['bodyFilter'], {
                setDataFilter,
                data: this.dataTemp
            }),
            !this.$slots['bodyFilter'] && h(vhInputComponent, {
                focusOnStart: true,
                modelValue: this.dataTemp,
                size: 'sm',
                onChange: (e: any) => setDataFilter(e.target.value),
                onInput: (e: any) => setDataFilter(e.target.value)
            })
        ];
        // return the render function
        return h('div',
            {
                class: className,
            },
            [
                h('div', {
                    class: 'vh-column-header_box'
                }, child),
                this.showFilter && h('div', {
                    class: 'vh-column-header_filter'
                },
                    [
                        h('div', {
                            class: 'vh-column-header_filter--body'
                        },
                            bodyFilter
                        ),
                        h('div', {
                            class: 'vh-column-header_filter--footer'
                        },
                            [
                                h(vhButtonComponent, {
                                    text: 'Cannel',
                                    size: 'sm',
                                    color: 'danger',
                                    beforeIcon: 'bi bi-filter',
                                    keyCommand: 'escape',
                                    onClick: () => {
                                        this.showFilter = false;
                                        this.dataTemp = undefined;
                                    }
                                }),
                                h(vhButtonComponent, {
                                    text: 'Filter',
                                    size: 'sm',
                                    beforeIcon: 'bi bi-filter',
                                    keyCommand: 'enter',
                                    onClick: () => {
                                        if (this.dataTemp === "") {
                                            this.dataTemp = undefined;
                                        }
                                        this.dataMark = this.dataTemp;
                                        this.$emit('filter', this.dataTemp ? { condition, [condition]: this.dataTemp } : undefined);
                                        this.showFilter = false;
                                        this.dataTemp = undefined;
                                    }
                                })
                            ]
                        )
                    ]
                )
            ]

        );
    },
});