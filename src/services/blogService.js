const API_URL = "http://localhost:8080/api/blogs";

const getAuthHeaders = () => {
  const sesion = JSON.parse(localStorage.getItem("sesionActiva") || "null");
  const headers = { "Content-Type": "application/json" };
  if (sesion?.token) {
    headers["Authorization"] = `Bearer ${sesion.token}`;
  }
  return headers;
};

export const blogService = {
  listarTodos: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener blogs");
    return res.json();
  },

  obtenerPorSlug: async (slug) => {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) throw new Error("Artículo no encontrado");
    return res.json();
  },

  crear: async (blog) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error("No autorizado o error al crear");
    return res.json();
  },

  actualizar: async (id, blog) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error("No autorizado o error al actualizar");
    return res.json();
  },

  eliminar: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("No autorizado o error al eliminar");
  },
};