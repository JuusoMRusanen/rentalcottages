import http from "../http-common";

class RegionDataService {
  getAllById(id) {
    return http.get(`/regions/${id}`);
  }

  getAll() {
    return http.get("/regions");
  }

  get(id) {
    return http.get(`/regions/${id}`);
  }

  create(data) {
    return http.post("/regions", data);
  }

  update(id, data) {
    return http.put(`/regions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/regions/${id}`);
  }

  deleteAll() {
    return http.delete(`/regions`);
  }
}

export default new RegionDataService();