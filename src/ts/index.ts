import dashboard from './dashboard';

let d = new dashboard();

d.setLeftBarItems([{}, {}]);
d.createPanel('Hello world', 1, 1, 2, 1);
d.createPanel('Hello world', 1, 2, 2, 2);
d.createPanel('Hello world', 3, 1, 2, 3);
