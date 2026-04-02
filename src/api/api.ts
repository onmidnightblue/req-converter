import axios from "axios";
import { gov_url } from "../constants/urls";

export const getCommitteeName = async (memberName: string): Promise<string> => {
  const { VITE_GOVERNMENT_API_KEY: gov_key } = import.meta.env || {};
  const { data } = await axios.get(gov_url, {
    params: {
      KEY: gov_key,
      Type: "json",
      pIndex: 1,
      pSize: 10,
      NAAS_NM: memberName,
    },
  });
  const result = data?.ALLNAMEMBER?.[1]?.row[0]?.CMIT_NM || "";
  return result;
};
