import { h, defineComponent, ref, onUpdated, onMounted, inject } from 'vue';
import { makeClassByName } from '@/utils';
import { formatDate } from '@/utils';
export const vhGanttHeader = defineComponent({
    name: 'vh-gantt-header',
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
    },
    setup(props: any, { attrs }) {
        const { class: classProps } = props;
        let className = 'vh-gantt-header';
        className = makeClassByName(className, '', classProps, '');
        const refElTimeline: any = ref(null);
        const refElInfo: any = ref(null);
        const timelineWith: any = ref(props.timelineWith);
        //let updateTimelineWidth: any = inject('updateTimelineWidth');
        //  let updateInfoWidth: any = inject('updateInfoWidth');
        let rangeTime: any = inject('rangeTime');

        const updateTimeLine = () => {
            refElTimeline.value.scrollLeft = props.timelineX;
            refElInfo.value.scrollLeft = props.infoX;
            if (timelineWith.value <= 0)
                timelineWith.value = refElTimeline.value.scrollWidth;
        }
        onUpdated(() => updateTimeLine());
        onMounted(() => updateTimeLine());
        const childAction = () => {
            return h('div', {
                class: 'vh-gantt-info',
                ref: refElInfo
            }, h('div',
                {
                    class: 'vh-gantt-row',
                },
                props.dataColumns.map((item: any) => h('div',
                    {
                        class: 'vh-gantt-cell',
                        style: {
                            width: item.width ? item.width + 'px' : ''
                        }
                    }, item.title)
                )
            ));
        }
        const childTimeline = () => {
            return h('div',
                {
                    class: 'vh-gantt-timeline',
                    ref: refElTimeline,

                },
                h('div',
                    {
                        class: 'vh-gantt-row',
                        style: {
                            width: (timelineWith.value ? (timelineWith.value + 20) + 'px' : '')
                        }
                    },
                    rangeTime().map((item: any) =>
                        h('div',
                            {
                                class: 'vh-gantt-cell'
                            },
                            h('div', {
                                class: 'vh-gantt-column'
                            },
                                [
                                    h('div', {
                                        class: 'vh-gantt-column-header'
                                    }, formatDate(item)),
                                    h('div', {
                                        class: 'vh-gantt-column-items'
                                    },
                                        [
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '0'),
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '4'),
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '8'),
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '12'),
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '16'),
                                            h('div', {
                                                class: 'vh-gantt-column-item'
                                            }, '20')
                                        ]
                                    )
                                ]
                            )
                        )
                    )
                )
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
