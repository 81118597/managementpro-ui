export default function  hasMenu(perms) {
  let hasTag=false;
  //获取用户的按钮权限
  let menu=JSON.parse(sessionStorage.getItem("code"))
  for(let i=0;i<menu.length;i++){
    if(menu[i]===perms){
      hasTag=true;
      break;
    }
  }
  return hasTag;

}
