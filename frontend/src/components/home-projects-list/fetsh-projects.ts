import { Project } from "@/shared/types/project";
import axios from "axios";
import { parseCookies } from "nookies";

export const fetchProjects = async (
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    // or use data from store?
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const accessToken = parseCookies().accessToken;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setProjects(response.data);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    setProjects([]);
  } finally {
    setLoading(false);
  }
};
