import './index.scss';
import { $, ExtJsObject, AR } from '../tools/extjs';

export interface userConnectionState {
    isConnected: boolean;
    connectionTimeLeft: number;
    userName: string;
    userPlan: string;
}

export default class loginPage {
    private _userLoggedIn: (a: userConnectionState) => void;
    private mask: ExtJsObject;
    public login_url = '';
    public user_parameter_name = 'email';
    public user__label = "Nom d'utilisateur";
    public password_parameter_name = 'password';
    public password__label = 'Mot de passe';

    constructor(public allowRegister = true) {
        console.log('New login form');
        this.loginForm(true);
    }

    public loginForm(load: any = undefined) {
        let mask: ExtJsObject = $(document.body)
            .child('div')
            .addClass('sl-app-login-form-mask');
        this.mask = mask;

        let loginForm = mask.child('div').addClass('sl-app-login-form');
        loginForm.child('h1').text('Me connecter');

        const uname = buildInput(loginForm, this.user__label, 'text');
        const upassword = buildInput(
            loginForm,
            this.password__label,
            'password'
        );
        loginForm.child('br');
        loginForm
            .child('div')
            .css('textAlign', 'center')
            .child('button')
            .addClass('sl-app-login-form-button')
            .text('Me connecter')
            .click(() => {
                let data: any = {};
                data[this.user_parameter_name] = uname.value();
                data[this.password_parameter_name] = upassword.value();
                AR.POST(this.login_url, data, (data_str) => {
                    const d = JSON.parse(data_str);
                    if (d.isConnected == true) this._userLoggedIn(d);
                });
            });
        loginForm.child('br');
        loginForm.child('hr');
        if (this.allowRegister) {
            let reg = loginForm
                .child('p')
                .css('textAlign', 'center')
                .text('ou ')
                .child('span')
                .css('color', '#4285f4')
                .text('créer un compte')
                .click(() => {
                    mask.remove();
                    this.registerForm();
                });
            if (load && window.location.hash == '#register') {
                reg.click();
            }
        } else {
            loginForm
                .child('p')
                .css('textAlign', 'center')
                .text("La création de compte n'est pas activée");
        }
    }

    public registerForm() {
        if (!this.allowRegister) return this.loginForm();
        let mask: ExtJsObject = $(document.body)
            .child('div')
            .addClass('sl-app-login-form-mask');
        this.mask = mask;

        let loginForm = mask.child('div').addClass('sl-app-login-form');
        loginForm.child('h1').text('Créer un compte');

        let username = buildInput(loginForm, "Nom d'utilisateur", 'text');
        let email = buildInput(loginForm, 'Email', 'email');
        let password = buildInput(loginForm, 'Mot de passe', 'password');
        let password_confirm = buildInput(
            loginForm,
            'Mot de passe (confirmer)',
            'password'
        );
        loginForm.child('br');
        loginForm
            .child('div')
            .css('textAlign', 'center')
            .child('button')
            .addClass('sl-app-login-form-button')
            .text('Créer mon compte');
        loginForm.child('br');
        loginForm.child('hr');
        loginForm
            .child('p')
            .css('textAlign', 'center')
            .text('ou ')
            .child('span')
            .css('color', '#4285f4')
            .text('me connecter')
            .click(() => {
                mask.remove();
                this.loginForm();
            });
    }

    public onLogin(_userLoggedIn: (a: any) => void) {
        this._userLoggedIn = (a: any) => {
            _userLoggedIn(a);
            this.mask.remove();
        };
        return this;
    }

    public tryLogin() {
        AR.GET(this.login_url, (data: any) => {
            const d: userConnectionState = JSON.parse(data);
            if (d.isConnected == true) {
                this._userLoggedIn(d);
            }
        });
    }
}

export function buildInput(
    parent: ExtJsObject,
    label_text: string,
    type: string,
    default_value?: string
): ExtJsObject {
    let input_types = [
        'text',
        'password',
        'number',
        'range',
        'date',
        'time',
        'email',
    ];
    let other_types = ['textarea', 'select'];

    let div = parent.child('div').addClass('field');

    let label = div
        .child('label')
        .addClass('top')
        .html(label_text);

    let input: ExtJsObject;

    if (input_types.indexOf(type) >= 0) {
        input = div.child('input').addClass('input');
        input.get(0).type = type;
    } else {
        input = div
            .child(type)
            .addClass('input')
            .addClass(type);
    }

    let i = input.get(0);

    i.onfocus = function() {
        this.parentElement.classList.add('focus');
        if (this.parentElement.classList.contains('notempty')) {
            this.parentElement.classList.remove('notempty');
        }
    };

    i.onblur = function() {
        if (type != 'date' && type != 'time') {
            this.parentElement.classList.remove('focus');
        }
        if (this.value != '') {
            this.parentElement.classList.add('notempty');
        }
    };

    if (default_value) input.value(default_value);

    i.onfocus();
    i.onblur();

    return input;
}
