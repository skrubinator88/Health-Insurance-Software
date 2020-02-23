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
    postPatient(info) {
        return fetch(`${api}/patients/new`, {
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
    postUser(username, password, firstName, lastName, role) {
        return fetch(`${api}/users/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                role: role
            })
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
    loginUser(username, password) {
        return fetch(`${api}/users/login`, {
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