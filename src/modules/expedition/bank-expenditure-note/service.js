import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'bank-expenditure-notes';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    searchAllByPosition(info) {
        let endpoint = `${serviceUri}/no-select/by-position`;
        return super.list(endpoint, info);
    }
}

export default Service;
