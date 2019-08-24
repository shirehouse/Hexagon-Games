import $ from 'jquery';

let url: string;
let ws: WebSocket;

// ref: https://github.com/Pithikos/python-websocket-server

export class Main {

    public static addMsg(msg: string) {
        let element = <HTMLDivElement>document.createElement('div');
        element.innerText = msg;
        let msgs = <HTMLDivElement>$('#messages')[0];
        msgs.appendChild(element);
    }
    public static onLogin() {
        url = <string>$('#url').val();
        ws = new WebSocket(url);
        ws.addEventListener('open', () => {
            console.log('Open...');
        });
        ws.onmessage = (ev) => {
            console.log(ev);
            if (ev) {
                this.addMsg('Other: ' + ev.data);
            }
        };
    }

    public static send() {
        let val = <string>$('#input').val();
        this.addMsg('Me: ' + val);
        ws.send(val);
    }

    public static init() {
        $.when($.ready).then(() => {
            $('#connect').click(() => {
                this.onLogin();
            });
            $('#send').click(() => {
                this.send();
            });
        });
    }

}