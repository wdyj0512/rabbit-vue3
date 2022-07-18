import { Profile } from "@/types/data";
const KEY = 'mwj'
export function setProfile(profile:Profile){
    localStorage.setItem(KEY,JSON.stringify(profile))
}
export function getProfile():Profile{
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}
export function removeProile(){
    localStorage.removeItem(KEY)
}