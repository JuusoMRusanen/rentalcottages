import http from "../http-common";

class ReservationDataService {
  getAll() {
    return http.get("/reservations");
  }

  get(id) {
    return http.get(`/reservations/${id}`);
  }

  create(data) {
    return http.post("/reservations", data);
  }

  update(id, data) {
    return http.put(`/reservations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reservations/${id}`);
  }

  deleteAll() {
    return http.delete(`/reservations`);
  }
}

export default new ReservationDataService();