import axios from "axios";
import apiModel from "../model/apiModel";
import store from "../../../store/index";

axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://localhost:3000/";

export class ApiService {
  constructor() {
    this.apiModel = apiModel.apiModel;
    this.requestType = apiModel.requestType;
  }

  get(Url) {
    return axios
      .get(`${Url}`)
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {
        this.serverResponse(err);
      });
  }
  post(Url, data) {
    return axios
      .post(Url, data)
      .then((res) => {
        return this.dataStats(res);
      })
      .catch((err) => {
        this.serverResponse(err);
      });
  }

  delete(id, Url) {
    const fakeRes = { status: 204 };
    return axios
      .delete(`${Url}/` + id)
      .then(() => {
        return this.dataStats(fakeRes);
      })
      .catch((err) => {
        this.serverResponse(err);
      });
  }

  dataStats(data) {
    this.apiModel = data.data;
    const responseAdd = { type: this.requestType.add, res: this.apiModel };
    const responseDelete = "You have deleted the item successfully";

    switch (data.status) {
      case 200:
        return this.apiModel ? this.apiModel : true;
      case 201:
        store.commit("setApiMessage", responseAdd);
        store.commit("UPDATE_DIALOG", true);
        setTimeout(() => store.commit("UPDATE_DIALOG", false), 2000);
        return this.apiModel ? this.apiModel : true;
      case 204:
        store.commit("setApiMessage", responseDelete);
        store.commit("UPDATE_DIALOG", true);
        setTimeout(() => store.commit("UPDATE_DIALOG", false), 2000);
        return this.apiModel ? this.apiModel : true;
      case 404:
        return false;
      default:
        return false;
    }
  }

  serverResponse(err) {
    const responseReturn = { type: this.requestType.error, message: err };
    if (err) {
      store.commit("setApiMessage", responseReturn);
      store.commit("UPDATE_DIALOG", true);
    }
  }
}
