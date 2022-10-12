import http from "../http-common";

class PhotoDataService {
  getAll() {
    return http.get(`/photos`);
  }

  /* getAll(cottageIDs) {
    return http.get(`/photos/url?${cottageIDs}`);
  } */

  get(id) {
    return http.get(`/photos/${id}`);
  }

  create(data) {
    return http.post("/photos", data);
  }

  update(id, data) {
    return http.put(`/photos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/photos/${id}`);
  }

  deleteAll() {
    return http.delete(`/photos`);
  }
}

export default new PhotoDataService();