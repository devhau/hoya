import { h, defineComponent, inject, ref } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import { addDays, getNumberDateInRange } from '@/utils/date.util';

export const vhGanttBody = defineComponent({
    name: 'vh-gantt-body',
    props: {
        class: {
            type: String,
            default: '',
        },
        timelineX: {
            type: Number,
            default: 0,
        },
        timelineWith: {
            type: Number,
            default: 0,
        },
        infoX: {
            type: Number,
            default: 0,
        },
        infoWith: {
            type: Number,
            default: 0,
        },
        dataColumns: {
            type: Array
        },
        source: {}
    },
    setup(props: any, { attrs }) {
        const { class: classProps, source } = props;
        let className = 'vh-gantt-body';
        className = makeClassByName(className, '', classProps, '');

        const refElTimeline: any = ref(null);
        const refElInfo: any = ref(null);
        let updateInfoX: any = inject('updateInfoX');
        let updateTimelineX: any = inject('updateTimelineX');
        let rangeTime: any = inject('rangeTime');
        let startDate: any = inject('startDate');
        let endDate: any = inject('endDate');


        const dataChild = source.map((data: any) => {
            return h('div',
                {
                    class: 'vh-gantt-row'
                },
                props.dataColumns.map((col: any) =>
                    h('div',
                        {
                            class: 'vh-gantt-cell',
                            style: {
                                width: col.width ? col.width + 'px' : ''
                            }
                        },
                        [
                            col.format && col.format(data[col.field]),
                            !col.format && data[col.field]
                        ]
                    )
                )
            )
        })
        const calcWidth = (date: Date, val: number) => {
            let val1 = Math.round(val / 24);
            if (addDays(date, val1 + 1) > endDate) {
                val = getNumberDateInRange(date, endDate) * 24;
                val1 = Math.round(val / 24);
            }
            let width = val1 * 152;
            width = width + Math.round((val - (val1 * 24)) / 4) * 26;
            return width <= 0 ? '' : width;
        }
        const dataChildRow = source.map((data: any) => {
            return h('div', {
                class: 'vh-gantt-row'
            },
                data.date && data.due && h('div',
                    {
                        class: 'vh-gantt-point',
                        style: {
                            width: calcWidth(data.date, data.due) + 'px',
                            'margin-left': data.date && ((((getNumberDateInRange(startDate, data.date) - 1) * 152)) + 'px')
                        }
                    })
            )
        })

        const lastTouch: any = ref(null);
        const childAction = () => {
            return h('div', {
                class: 'vh-gantt-info',
                ref: refElInfo,
                onwheel: (event: any) => {
                    var scrollTop = refElTimeline.value.scrollTop + (event.deltaY * 1.5);
                    refElTimeline.value.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    event.preventDefault && event.preventDefault();;
                },
                ontouchstart: (event: any) => {
                    lastTouch.value = event.touches[0]
                },
                ontouchend: () => {
                    lastTouch.value = null;
                },
                ontouchmove: (event: any) => {
                    var currentTouch = event.changedTouches[0];

                    if (lastTouch.value) {
                        refElTimeline.value.scrollTop = refElTimeline.value.scrollTop + 1.2 * (lastTouch.value.clientY - currentTouch.clientY);
                        refElInfo.value.scrollLeft = refElInfo.value.scrollLeft + 1.2 * (lastTouch.value.clientX - currentTouch.clientX);
                    }
                    lastTouch.value = currentTouch;
                    event.preventDefault && event.preventDefault();
                },
                onscroll: (e: any) => {
                    updateInfoX(e.target.scrollLeft);
                }
            }, dataChild);
        }
        const childTimeline = () => {
            return h('div',
                {
                    class: 'vh-gantt-timeline',
                    ref: refElTimeline,
                    onscroll: (e: any) => {
                        updateTimelineX(e.target.scrollLeft);
                        refElInfo.value.scrollTo({ top: e.target.scrollTop, behavior: 'smooth' });
                        refElInfo.value.scrollTop = e.target.scrollTop;
                    }
                },
                [
                    h('div',
                        {
                            class: 'vh-gantt-row vh-gantt-backgourd',
                            style: {
                                height: (refElInfo.value && refElInfo.value.scrollHeight ? (refElInfo.value.scrollHeight - 26) + 'px' : '')
                            }
                        },
                        [
                            h('div', {
                                class: 'vh-gantt-data',
                            },
                                dataChildRow
                            ),
                            ...rangeTime().map(() =>
                                h('div',
                                    {
                                        class: 'vh-gantt-cell'
                                    },
                                    h('div', {
                                        class: 'vh-gantt-column'
                                    },
                                        h('div', {
                                            class: 'vh-gantt-column-items'
                                        },
                                            [
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                }),
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                }),
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                }),
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                }),
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                }),
                                                h('div', {
                                                    class: 'vh-gantt-column-item'
                                                })
                                            ]
                                        )
                                    )
                                )
                            )
                        ]
                    )
                ]

            );
        }
        // return the render function
        return () =>
            h(
                'div',
                {
                    ...attrs,
                    class: className
                },
                [
                    childAction(),
                    h('div', { class: 'vh-gantt-line' }),
                    childTimeline(),
                ]
            );
    }
});
