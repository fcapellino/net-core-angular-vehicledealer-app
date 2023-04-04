import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { StatisticsService } from '../../services/statistics.service';
import { ChartType, LegendItem } from '../lbd/lbd-chart/lbd-chart.component';
declare var $: any;

@Component({
    selector: 'app-view-statistics',
    templateUrl: './view-statistics.component.html',
    styleUrls: ['./view-statistics.component.css']
})
export class ViewStatisticsComponent implements OnInit {
    public makeChartType: ChartType = ChartType.Pie
    public makeChartData: any = {}
    public makeChartLegendItems: LegendItem[] = []
    public dataLoaded: Boolean = false

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _statisticsService: StatisticsService) {
    }

    async ngOnInit() {
        try {
            var self = this
            var response = await self._statisticsService.getStatistics().toPromise<any>()
            self.loadChart(response)
        }
        catch (e) { }
    }

    loadChart(response) {
        var self = this
        self.makeChartData = { labels: [], series: [] }
        var itemsList = response.resources.itemsList
        var total = _.sumBy(itemsList, x => x.count)

        itemsList.forEach((item, index) => {
            var percent = ((item.count / total) * 100).toFixed(2)
            self.makeChartData.labels.push(`${percent}%`)
            self.makeChartData.series.push(percent)

            self.makeChartLegendItems.push({
                title: `${item.name} [${percent}%]`,
                imageClass: 'fa fa-circle'
            })
        })

        self.dataLoaded = true
    }
}
