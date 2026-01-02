import http from "./http-common";

const createTeam = (teamData) => {
  return http.post("/api/team/create", teamData);
};

const getTeamInfo = () => {
  return http.get("/api/team/info");
};

const getTeamAll = () => {
  return http.get("/api/team/all");
};

const searchTeam = (query) => {
  return http.get("/api/team/search", { params: query });
};

const updateTeam = (id, teamData) => {
  return http.put(`/api/team/update/${id}`, teamData);
};

const deleteTeam = (id) => {
  return http.delete(`/api/team/delete/${id}`);
};

const teamService = {
  createTeam,
  getTeamInfo,
  getTeamAll,
  searchTeam,
  updateTeam,
  deleteTeam,
};

export default teamService;