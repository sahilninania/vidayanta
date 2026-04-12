export const getAuthData = () => {
  return {
    teacherId: localStorage.getItem("teacherId"),
    institutionCode: localStorage.getItem("institutionCode"),
    token: localStorage.getItem("token")
  };
};