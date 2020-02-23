import store from "../store/store";
const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];
let api = config.api;

class FetchService {
    constructor(store, logoutAction) {
        this.store = store;
        this.logout = logoutAction;
    }
    fetchPatient = (id) => {
        return fetch(`${api}/patients/${id}`, {
            method: "GET",
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
    }
    fetchPatients = (pageNo, search) => {
        let url = `${api}/patients/?pageLimit=15`;
        let page = pageNo ? pageNo : 1;
        url = url + '&pageNo=' + page;
        if(search) url = url + '&search=' + search;
        return fetch(url, {
            method: "GET",
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
    }
    fetchInvoices = (id, pageNo) => {
        let url = `${api}/patients/${id}/invoices?pageLimit=15`;
        let page = pageNo ? pageNo : 1;
        url = url + '&pageNo=' + page;
        return fetch(url, {
            method: "GET",
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
    }
    fetchDocuments = (id, pageNo) => {
        let url = `${api}/patients/${id}/documents?pageLimit=15`;
        let page = pageNo ? pageNo : 1;
        url = url + '&pageNo=' + page;
        return fetch(url, {
            method: "GET",
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
    }
    fetchInvoice = (id) => {
        return fetch(`${api}/invoices/${id}`, {
            method: "GET",
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
    }
    fetchDocument = (id) => {
        return fetch(`${api}/documents/${id}`, {
            method: "GET",
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
    }
    fetchUsers = (pageNo) => {
        let url = `${api}/users/?pageLimit=15`;
        let page = pageNo ? pageNo : 1;
        url = url + '&pageNo=' + page;
        return fetch(url, {
            method: "GET",
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
    static fetchUser(userId, token) {
        let url = `${api}/users/${userId}`;
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then(async resp => [resp.status, await resp.json()])
    };
}

export default FetchService;