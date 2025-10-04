import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your deployed URL
});

// Attach token to every request if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// AUTH
export const login = (formData) => API.post("/auth/login", formData);

// EMPLOYEES (HR)
export const createEmployee = (data) => API.post("/employees", data);
export const getEmployees = () => API.get("/employees");
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// REQUESTS (Employee)
export const createRequest = (data) => API.post("/requests", data);
export const getMyRequests = () => API.get("/requests/my");

// APPROVALS (HR)
export const getApprovals = () => API.get("/approvals");

// Updated: send status properly in body, matching backend controller
export const updateApproval = (id, status) =>
  API.put(`/approvals/${id}`, { status }); // status = "Approved" or "Disapproved"
