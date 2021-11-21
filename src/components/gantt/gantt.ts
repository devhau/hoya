import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import { vhGanttBody } from './gantt-body';
import { vhGanttHeader } from './gantt-header';
import { vhGanttFooter } from './gantt-footer';
import { addDays, getArrayDateInRange } from '@/utils/date.util';
const GanttBody: any = vhGanttBody;
const GanttFooter: any = vhGanttFooter;
const GanttHeader: any = vhGanttHeader;

export const vhGantt = defineComponent({
    name: 'vh-gantt',
    props: {
        class: {
            type: String,
            default: '',
        },
        startDate: {
            type: Date,
            default: new Date()
        },
        endDate: {
            type: Date,
            default: addDays(new Date(), 6)
        },
        coloumns: {
            type: Array
        },
        source: {
            type: Array
        }
    },
    provide() {
        const updateTimelineX = (val: any) => this.timelineX = val;
        const updateTimelineWidth = (val: any) => { if (this.timelineWidth < val) this.timelineWidth = val; };
        const updateInfoX = (val: any) => this.infoX = val;
        const updateInfoWidth = (val: any) => { if (this.infoWidth < val) this.infoWidth = val; };
        const rangeTime = () => getArrayDateInRange(this.startDate, this.endDate);

        return {
            updateTimelineX, updateTimelineWidth, updateInfoX, updateInfoWidth,
            startDate: this.startDate, endDate: this.endDate, rangeTime
        };
    },
    data() {
        return {
            timelineX: 0,
            timelineWidth: 0,
            infoX: 0,
            infoWidth: 0,
        };
    },
    render() {

        const { class: classProps } = this;

        let className = 'vh-gantt';
        className = makeClassByName(className, '', classProps, '');
        return h('div',
            {
                ...this.$attrs,
                class: className
            },
            [
                h(GanttHeader, {
                    timelineX: this.timelineX,
                    timelineWidth: this.timelineWidth,
                    infoX: this.infoX,
                    infoWidth: this.infoWidth,
                    dataColumns: this.coloumns
                }),
                h(GanttBody, {
                    timelineX: this.timelineX,
                    timelineWidth: this.timelineWidth,
                    infoX: this.infoX,
                    infoWidth: this.infoWidth,
                    source: this.source,
                    dataColumns: this.coloumns
                }),
                h(GanttFooter, {
                    timelineX: this.timelineX,
                    timelineWidth: this.timelineWidth,
                    infoX: this.infoX,
                    infoWidth: this.infoWidth,
                    dataColumns: this.coloumns
                })
            ]
        );
    },
    setup() {

    }
});
