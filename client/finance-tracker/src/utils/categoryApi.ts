import api from "@/utils/api";

export async function fetchCategories() {
    const res = await api.get("/categories");
    return res.data;
}

export async function addCategory(category: string) {
    await api.post("/categories", { category });
}
