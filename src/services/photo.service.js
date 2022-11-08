import http from "../http-common";

class PhotoDataService {
  getAll() {
    return http.get(`/photos`);
  }

  getAllByCottageId(id) {
    return http.get(`/photos/${id}`);
  }

  get(id) {
    return http.get(`/photos/${id}`);
  }

  create(data) {
    return http.post("/photos", data.formData);
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