import store from "../store/store";

const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];
let api = config.api;

class UpdateService {
    constructor(store, logoutAction) {
        this.store = store;
        this.logout = logoutAction;
    }
    updateInvoice(invoiceId, items, opts) {
        return fetch(`${api}/invoices/${invoiceId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify({
                items: items,
                opts
            })
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
    updatePatient(patientId, body) {
        return fetch(`${api}/patients/${patientId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
    updateUser(userId, body) {
        return fetch(`${api}/users/${userId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
    deleteUser(userId) {
        return fetch(`${api}/users/${userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': store.getState().auth.token
            }
        }).then(resp => {
            if(resp.status === 403) {
                this.store.dispatch(this.logout())
            }
            else return resp
        })
    };
}

export default UpdateService;