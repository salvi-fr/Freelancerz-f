import { themeGet } from "@styled-system/theme-get";
import { differenceInMinutes } from "date-fns";
import { ceil } from "lodash";
import firebaseStorage from "@lib/firebaseCloudStorage";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { RootState } from '../redux/reducers'
import axios from '@lib/http/client'
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const getTheme = (query: string, fallback?: string) =>
  themeGet(query, fallback);

  export const isValidToken = async (accessToken: string) => {
    if (!accessToken) {
      return false
    }
    const decodedToken = await jwtDecode<JwtPayload>(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
  }
  
  export const setSession = async (accessToken: string | null) => {
    if (accessToken ) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      await localStorage.setItem('accessToken', accessToken)
    } else {
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common.Authorization
    }
  }

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

export const getDateDifference = (date) => {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";

  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;

  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;

  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
};

export const uploadImage = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "grocery-app");
  data.append("cloud_name", "grocery-app");
  const res = await fetch("https://api.cloudinary.com/v1_1/grocery-app/image/upload", {
    method: "post",
    body: data,
  });
  const fileRes = await res.json();
  return fileRes.secure_url;
}
export const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "grocery-app");
  data.append("cloud_name", "grocery-app");
  const res = await fetch("https://api.cloudinary.com/v1_1/grocery-app/raw/upload", {
    method: "post",
    body: data,
  });
  const fileRes = await res.json();
  return fileRes.secure_url;
}
export const uploadVideo = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "grocery-app");
  data.append("cloud_name", "grocery-app");
  const res = await fetch("https://api.cloudinary.com/v1_1/grocery-app/video/upload", {
    method: "post",
    body: data,
  });
  const fileRes = await res.json();
  return fileRes.secure_url;
}

export const uploadImageFirebase = async (file,folderName) => {
  const storageRef = firebaseStorage.ref();
  const uploadTask = firebaseStorage.ref(`${folderName}/images/${file.name}`).put(file);
  return await (await uploadTask).ref.getDownloadURL();
}

export const uploadFileFirebase = async (file,folderName) => {
  const uploadTask = await firebaseStorage.ref(`${folderName}/files/${file.name}`).put(file);

    return await (await uploadTask).ref.getDownloadURL();

}