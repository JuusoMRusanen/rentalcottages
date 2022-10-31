import http from "../http-common";

class CottageDataService {
  getAll() {
    return http.get("/cottages");
  }

  getAllByRegionId(id) {
    return http.get(`/cottages/region/${id}`);
  }

  getAllByCityId(id) {
    return http.get(`/cottages/city/${id}`);
  }

  get(id) {
    return http.get(`/cottages/${id}`);
  }

  create(data) {
    return http.post("/cottages", data);
  }

  update(id, data) {
    return http.put(`/cottages/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cottages/${id}`);
  }

  deleteAll() {
    return http.delete(`/cottages`);
  }
}

export default new CottageDataService();