import { ExtJsObject } from '../tools/extjs';

export default class Grouper {
    public space: ExtJsObject;
    constructor(dc: ExtJsObject, title: string, closed: boolean) {
        let group = dc.child('div');
        group.addClass('group');
        let head = group.child('p');
        head.addClass('head');
        head.css('userSelect', 'none');
        head.css('cursor', 'pointer');
        head.css('color', '#8798ad');
        head.css('padding', '6px');
        head.css('fontSize', '14px');
        head.text(title);
        const head_arrow = head.child('span');
        head_arrow.cssObj({
            float: 'right',
        });

        const toggle = () => {
            if (closed) {
                head_arrow.html('&#9660;');
                this.space.css('display', 'none');
            } else {
                head_arrow.html('&#9650;');
                this.space.css('display', 'block');
            }
        };
        head.click(() => {
            closed = !closed;
            toggle();
        });
        this.space = group.child('div');
        toggle();
    }
}
