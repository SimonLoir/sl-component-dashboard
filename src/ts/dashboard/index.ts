import '../../scss/index.scss';
import { $, ExtJsObject } from '../tools/extjs';
import Panel from '../components/panel';

export default class dashboard {
    private d: ExtJsObject;
    private dc: ExtJsObject;
    private left_panel: ExtJsObject;
    private left_panel_items: ExtJsObject;
    private header: ExtJsObject;
    constructor(name: string = 'Dashboard.js') {
        let d = $('body')
            .child('div')
            .addClass('sl-dashboard');

        let header = d.child('header');
        header.text(name);

        let left_panel = d.child('div').addClass('left-panel');
        let square = left_panel
            .child('div')
            .addClass('left-panel-hamburger-square');

        square.html(
            `<div class="hamburger none"><span></span><svg x="0" y="0" width="54px" height="54px" viewBox="0 0 54 54"> <circle cx="27" cy="27" r="26"></circle> </svg> </div>`
        );

        square.children('.hamburger').click(function() {
            let e: HTMLDivElement = this;
            if (e.classList.contains('clicked')) {
                $(this).removeClass('clicked');
            } else {
                $(this).addClass('clicked');
            }
        });

        let dc = d.child('div').addClass('d-content');

        this.dc = dc;
        this.d = d;
        this.header = header;
        this.left_panel = left_panel;
        this.left_panel_items = left_panel.child('div').addClass('items');
    }
    public setLeftBarItems(items: leftBarItem[]) {
        let e = this.left_panel_items;
        e.html('');
        e = e.child('div');
        e.addClass('wrapper');
        items.forEach((it, i) => {
            let item = e.child('div');
            item.addClass('item');
            if (i == 0) item.addClass('selected');
            if (it.image) item.html(it.image);
            else
                item.html(
                    `<svg viewBox="0 0 231 231" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M228.065,125.587l-51.619,-51.615l0,-50.709c0,-4.142 -3.357,-7.5 -7.5,-7.5c-4.143,0 -7.5,3.358 -7.5,7.5l0,35.709l-41.016,-41.012c-2.928,-2.929 -7.677,-2.928 -10.606,0l-107.627,107.627c-2.929,2.929 -2.929,7.678 0,10.606c2.93,2.929 7.678,2.929 10.608,0l18.72,-18.72l0,89.525c0,4.142 3.357,7.5 7.5,7.5l152.215,0c4.143,0 7.5,-3.358 7.5,-7.5l0,-89.524l18.721,18.719c1.464,1.464 3.384,2.196 5.303,2.196c1.919,0 3.839,-0.732 5.304,-2.197c2.926,-2.928 2.926,-7.676 -0.003,-10.605Zm-44.326,73.912l-137.215,0l0,-97.025l68.604,-68.604l68.611,68.606l0,97.023Z" /></svg>`
                );

            item.child('span').text(it.text);

            item.click(() => {
                window.location.href = it.redirectTo;
                $('.selected').removeClass('selected');
                item.addClass('selected');
            });
        });
    }

    public clearAllPanels() {
        this.dc.html('');
    }

    public createPanel(
        title: string,
        col: number,
        row: number,
        spanCol = 1,
        spanRow = 1
    ) {
        return new Panel(this.dc, title, col, row, spanCol, spanRow);
    }
}

export interface leftBarItem {
    image?: string;
    text: string;
    redirectTo: string;
}
