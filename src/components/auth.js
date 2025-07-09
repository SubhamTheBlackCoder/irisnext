import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_X8dTvZK9H",
  ClientId: "70sk2pmn2orrjtck89thg6ogqu",
};

export const userPool = new CognitoUserPool(poolData);

//  Get currently signed-in user
export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

// session check pai
export const checkAuth = async () => {
  return new Promise((resolve, reject) => {
    const user = getCurrentUser();
    if (!user) return reject(new Error("No user"));
    user.getSession((err, session) => {
      if (err || !session.isValid()) {
        return reject(err || new Error("Invalid session"));
      }
      resolve(session);
    });
  });
};
{/**export const logout = () => {
  const user = getCurrentUser();
  if (user) user.signOut();
  sessionStorage.clear(); // Don't touch localStorage!
  window.location.href = "/auth";
}; */}
// existing code 

export const logout = () => {
  const user = getCurrentUser();
  
  
  const splashShown = sessionStorage.getItem("splashShown");
  
  if (user) user.signOut();

  sessionStorage.clear();
  if (splashShown) {
    sessionStorage.setItem("splashShown", splashShown);
  }
  
  window.location.href = "/auth";
};

export const getIdToken = async () => {
  const session = await checkAuth();
  return session.getIdToken().getJwtToken();
};

//Utility to get user-specific key
const getUserStorageKey = () => {
  const user = getCurrentUser();
  if (!user) return null;
  const userId = user.getUsername();
  return `resume-history-${userId}`;
};

//Save new resume history
export const saveResumeHistory = (resumeEntry) => {
  const key = getUserStorageKey();
  if (!key) return;

  const existing = JSON.parse(localStorage.getItem(key)) || [];
  const newEntry = { ...resumeEntry, date: new Date().toISOString() };

  localStorage.setItem(key, JSON.stringify([...existing, newEntry]));
};

//Get resume history
export const getResumeHistory = () => {
  const key = getUserStorageKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
};

//Clear only the current user's history
export const clearResumeHistory = () => {
  const key = getUserStorageKey();
  if (key) localStorage.removeItem(key);
};

