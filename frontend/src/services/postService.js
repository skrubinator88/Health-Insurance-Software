import store from "../store/store";

const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];
let api = config.api;

class PostService {
    constructor(store, logoutAction) {
        this.store = store;
        this.logout = logoutAction;
    }
    generateInvoicePDF(patientId, items, opts, url) {
        return fetch(`${api}/invoices/generate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify({
                PatientId: patientId,
                items: items,
                opts,
                url: url
            })
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    }

    postInvoice(patientId, items, opts, url) {
        return fetch(`${api}/invoices/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify({
                PatientId: patientId,
                items: items,
                opts,
                url
            })
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    }
    postHealthPlan(info) {
        return fetch(`${api}/healthPlans/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify(info)
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
    postProvider(info) {
        return fetch(`${api}/providers/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(info)
        }).then(resp => resp)
    };

    loginProvider(username, password) {
        return fetch(`${api}/providers/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(resp => resp)
    };
}

export default PostService;
