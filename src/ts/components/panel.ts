import { ExtJsObject, AR } from '../tools/extjs';
//import * as Chart from 'chart.js';

export default class Panel {
    public panel: ExtJsObject;
    constructor(
        dc: ExtJsObject,
        title: string,
        col: number,
        row: number,
        spanCol = 1,
        spanRow = 1
    ) {
        let panel = dc.child('div');
        panel.addClass('panel');
        panel.css('gridColumnStart', col.toString());
        panel.css('gridRowStart', row.toString());
        panel.css('gridColumnEnd', (col + spanCol).toString());
        panel.css('gridRowEnd', (row + spanRow).toString());
        panel
            .child('div')
            .addClass('header')
            .text(title);
        this.panel = panel.child('div').addClass('content');
    }

    public createTable(data: tableData) {
        const table = this.panel.child('table');
        const cat = data.categories;
        const d = data.data;
        const thead = table.child('thead').child('tr');
        cat.forEach((c) => {
            thead.child('th').text(c.name);
        });
        const tbody = table.child('tbody');
        d.forEach((row) => {
            const tr = tbody.child('tr');
            row.forEach((col, i) => {
                const td = tr.child('td');
                const c = cat[i];

                if (c.type == 'url') {
                    const a: ExtJsObject = td.child('a').attr('href', col);
                    a.text(c.text);
                    a.addClass('btn');
                    if (c.openExtenal) a.attr('target', '_blank');
                } else if (c.type == 'date') {
                    const d = new Date(col);
                    td.text(d.toString());
                } else if (c.type == 'raw') {
                    td.text(col);
                }
            });
        });
    }

    public loadTableFromURL(url: string) {
        AR.GET(url, (data) => {
            const d: tableData = JSON.parse(data);
            if (d.error) return alert(d.message);
            this.createTable(d);
        });
    }

    public createChart(width = '100%', height = '100%') {
        /*const c = this.panel
            .child('canvas')
            .css('width', width)
            .css('height', height);
        const canvas: HTMLCanvasElement = c.get(0);
        const ctx = canvas.getContext('2d');
        console.log(canvas);
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });*/
    }
}

export interface tableData {
    error?: boolean;
    message?: string;
    categories: {
        name: string;
        type: 'raw' | 'url' | 'date';
        text?: string;
        format?: string;
        openExtenal?: boolean;
    }[];
    data: string[][];
}
