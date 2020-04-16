import store from "../store/store";
const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];
let api = config.api;

class FetchService {
    constructor(store, logoutAction) {
        this.store = store;
        this.logout = logoutAction;
    }
    fetchHealthPlan = (id) => {
        return fetch(`${api}/healthPlans/${id}`, {
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
    fetchHealthPlans = (pageNo, search) => {
        let url = `${api}/providers/healthPlans?pageLimit=15`;
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
}

export default FetchService;
