import '../scss/index.scss';
import dashboard from './dashboard';

let d = new dashboard();

d.setLeftBarItems([{}, {}]);

const firstPanel = d.createPanel('Hello world', 1, 1, 2, 1);
const secondPanel = d.createPanel('Hello world', 1, 2, 2, 2);
const thirdPanel = d.createPanel('Hello world', 3, 1, 2, 3);
const fourthPanel = d.createPanel('Hello world', 5, 1, 2, 3);
const fifthPanel = d.createPanel('Hello world', 1, 4, 6, 1);

firstPanel.panel.text('HELLO WORLD');

secondPanel.createChart();
thirdPanel.createChart();
