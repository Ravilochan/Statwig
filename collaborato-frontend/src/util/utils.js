import { createBrowserHistory } from 'history';
import {NotificationContainer, NotificationManager} from 'react-notifications';
export const history = createBrowserHistory();

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const techArray = ['https://miro.medium.com/max/2000/0*VkYVf8i3276Q56Z2' , 'https://miro.medium.com/max/2560/1*ELcUZLT-wWFd3_womEweBA.jpeg' , 'https://miro.medium.com/max/9620/0*r_N6uH_Ha_CYTlVs' , 'https://miro.medium.com/max/3840/1*i8A5f_ofRb8gn-WLMudEEQ.jpeg' ,'https://miro.medium.com/max/2560/1*lGiiLCD5RxsVevxZi8TKkQ.jpeg', 'https://miro.medium.com/max/10368/1*WcDgNHyaRvkPq3MyocAFWg.jpeg','https://miro.medium.com/max/1440/1*7XfBARmlSEORzPD2VOCcqw.jpeg' , 'https://miro.medium.com/max/11520/1*ohRnf8u6WIttSucTzbE8Sw.jpeg' , 'https://miro.medium.com/max/8390/0*Ir8B3AxMdpIx6c-G' , 'https://miro.medium.com/max/10024/1*ir73SYHK8WGD-1IiLHZC9g.jpeg' , 'https://miro.medium.com/max/1822/1*vXezsPtSfhCK2Svtpaex0g.png'];

const scienceArray =  ['https://miro.medium.com/max/10944/1*oPqpRPeKK73dsNNRkM7_6A.jpeg' , 'https://miro.medium.com/max/2400/0*FIoVrcmNw7UlWqu9.jpg' , 'https://miro.medium.com/max/12000/0*vG8JG8Zg9-l-KPWc' , 'https://miro.medium.com/max/1400/0*bIdSiOkwdutrPhyl' , 'https://miro.medium.com/max/1400/0*ah7L1mabsTsj3CB_.png','https://miro.medium.com/max/2880/1*qT7OT2dM8q1yTqAvh_VZkA.jpeg' , 'https://miro.medium.com/max/1400/1*LKVdgOoXaphM7yh0x1ZRsw.png' , 'https://miro.medium.com/max/4800/0*Gho9nP2b43GMzLRz.jpg' , 'https://miro.medium.com/max/1042/1*OrZZfa3w3P998xipuJL2Gg.jpeg' , 'https://miro.medium.com/max/668/1*RePm-gK3ZQ842nkcXulRUA.jpeg'];

const engineeringArray = ['' , '' , '' , '' , '','' , '' , '' , '' , ''];

const medicalArray = ['https://miro.medium.com/max/4800/1*hkH1oTgDVrbeV2z5JuXDPw.jpeg' , 'https://miro.medium.com/max/8412/1*32liuZkAJb5mpqGVWpWttA.jpeg' , 'https://miro.medium.com/max/1670/1*lDLH47mrWAkMZbRh_UmESA.jpeg' , 'https://miro.medium.com/max/2304/1*VV0OwtdIeZRm7RqEU74DXg.jpeg' , 'https://miro.medium.com/max/1920/0*NndUNZePaVJjA84Q.jpg','https://miro.medium.com/max/4000/0*J-Crf5k30kQAbuog' , 'https://miro.medium.com/max/6466/0*pSOslExYHr4PMk-F.jpg' , 'https://miro.medium.com/max/3840/1*WnshPm2314PxXiSS24w15Q.jpeg' , 'https://miro.medium.com/max/3840/1*rUh0c9Wkmy3y5vR4rEK9DA.jpeg' , 'https://miro.medium.com/max/12206/1*o-QACiiGdGmqgLlWa8IWFg.jpeg'];

const environmentArray = ['https://miro.medium.com/max/3840/1*qyu1CFmpAQkrb6hMM8Xlxg.jpeg' , 'https://miro.medium.com/max/1620/1*SyXrvTfObhBOSE405ocE2A.jpeg' , 'https://miro.medium.com/max/4800/0*VZEQqeYUlF32Bj1F.jpeg' , 'https://miro.medium.com/max/3840/1*Qmj8yYzYqOwGPkdfLBIxBg.jpeg' , 'https://miro.medium.com/max/1600/0*3i2od95fV3Wrp7sH.png','https://miro.medium.com/max/3840/1*HyNnd8ozYOPem_KGocVigQ.jpeg' , 'https://miro.medium.com/max/3200/1*tgcuBZTHdgt58y5nQUINHQ.jpeg' , 'https://miro.medium.com/max/1600/0*rMnC7eq9LA4kd-zR.png' , 'https://miro.medium.com/max/8966/1*4-RMcDJc3JQZebrYHFh7EQ.jpeg' , 'https://miro.medium.com/max/10928/0*LMldz4VjLwqRSNJz'];

const literatureArray = ['https://cdn-images-1.medium.com/fit/c/560/360/1*Cbj_BcK5ePD4Mc4TK4sfvQ@2x.jpeg' , 'https://miro.medium.com/max/10944/0*BA8z5NF9kznvV-Pl' , 'https://miro.medium.com/max/8000/0*HcWs3OMsuJmQ4q5O' , 'https://miro.medium.com/max/4000/1*kBiUIuXOZrFA9taDQws9IA.jpeg' , 'https://miro.medium.com/max/3840/1*OXXFvq8kpbcJ1HVW6SVpyA.png','https://miro.medium.com/max/11562/0*4YDvv_bBJfJo3j56' , 'https://miro.medium.com/max/1750/1*qQPH-bD8-oewiCdEHDSObA.jpeg' , 'https://miro.medium.com/max/8000/0*1Ij2inhSXtVdhR4Z' , 'https://miro.medium.com/max/6048/0*UCquzMhKofgcbYAh' , 'https://miro.medium.com/max/8850/0*CysDAcmCfbba4F8R'];

const entertainmentArray = ['https://miro.medium.com/max/2560/0*TZQ22BloCYliAt_N.jpg' , 'https://miro.medium.com/max/3760/1*rBNfmE7Y-yDMakFzaT5cxA.jpeg' , 'https://miro.medium.com/max/4320/1*4z34LvJF9h-kPRkJTw7nsw@2x.png' , 'https://miro.medium.com/max/3554/1*CT3Ixh0MoGRsZYvgC4oIqA.jpeg' , 'https://miro.medium.com/max/1280/1*cLjACzfRSgxAI4TJM5VPsA.jpeg','https://miro.medium.com/max/10000/1*J0Jd0LROmrVSNikdUs_9OQ.jpeg' , 'https://miro.medium.com/max/2736/1*tOmANZp2riT4Bqiuw-ERRA.jpeg' , 'https://miro.medium.com/max/1890/1*Jner7zJRtmDe9PbryQyWEQ@2x.jpeg' , 'https://miro.medium.com/max/2576/1*VGZfsOIZCW7Pei13JrRBIQ.jpeg' , 'https://miro.medium.com/max/3542/1*dxpqWRcDF6BG72k4Sxj33w.jpeg'];

const defaultArray = ['' , '' , '' , '' , '','' , '' , '' , '' , ''];

export const saveServerToken = (data) => {
  console.log("saveServerToken",data);
  if(data.current_user){
    localStorage.setItem('currentUser',JSON.stringify(data.current_user));
  }
  if(data.server_token){
    localStorage.setItem('servertoken',data.server_token);
  }

};

export const deleteServerToken = (server_token) => {
  localStorage.removeItem('username');
  localStorage.removeItem('emailId');
  localStorage.removeItem('JWT-TOKEN');
  localStorage.removeItem('bio');
  alert( 'User successfully logout');
};

export const getHTTPHeader = function(){
  var header = {
    ...headers,
    servertoken:localStorage.servertoken?localStorage.servertoken:null
  }
  return header;
};

export const getServerTokenDetails=()=> {
  if(localStorage.servertoken) {
    return (localStorage.servertoken);
  }
  else {
    return null;
  }
}






export const getImageURL = (field,random) => {
  if(field == 'Movie') {
    return entertainmentArray[random];
  }
  else if(field == 'Literature' || field == 'Art') {
    return literatureArray[random];
  }
  else if(field == 'Technology' || field == 'Artificial Intelligence') {
    return techArray[random];
  }
  else if(field == 'Science' || field == 'Engineering') {
    return scienceArray[random];
  }
  else if(field == 'Healthcare' || field == 'Medical Science') {
    return medicalArray[random];
  }
  else if(field == 'Environment') {
    return environmentArray[random];
  }
  else {
    return defaultArray[random];
  }
};

export const getMonth=(date)=> {
  if(date == 1) {
    return "Jan";
  }
  else if(date == 2) {
    return "Feb";
  }
  else if(date == 3) {
    return "March";
  }
  else if(date == 4) {
    return "April";
  }
  else if(date == 5) {
    return "May";
  }
  else if(date == 6) {
    return "June";
  }
  else if(date == 7) {
    return "July";
  }
  else if(date == 8) {
    return "Aug";
  }
  else if(date == 9) {
    return "Sept";
  }
  else if(date == 10) {
    return "Oct";
  }
  else if(date == 11) {
    return "Nov";
  }
  else {
    return "Dec";
  }
}

export const retrievePropertyImages = (name)=>{
  return techArray[name];
}

export const responseLight = 'M24.28 25.5l.32-.29c2.11-1.94 3.4-4.61 3.4-7.56C28 11.83 22.92 7 16.5 7S5 11.83 5 17.65s5.08 10.66 11.5 10.66c1.22 0 2.4-.18 3.5-.5l.5-.15.41.33a8.86 8.86 0 0 0 4.68 2.1 7.34 7.34 0 0 1-1.3-4.15v-.43zm1 .45c0 1.5.46 2.62 1.69 4.44.22.32.01.75-.38.75a9.69 9.69 0 0 1-6.31-2.37c-1.2.35-2.46.54-3.78.54C9.6 29.3 4 24.09 4 17.65 4 11.22 9.6 6 16.5 6S29 11.22 29 17.65c0 3.25-1.42 6.18-3.72 8.3z';

export const likeLight = "M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z";

export const likeSolid = 'M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z';

export const dislikeLight = 'M24 11.936c0-1-.986-6.373-1.486-8.25-.714-2.689-2.471-3.686-5.009-3.686-2.283 0-4.079.617-5.336 1.158-2.05.883-3.791 1.519-6.169 1.746v-.904h-6v12h6v-.73c2.454.585 4.852 2.066 6.4 7.402.483 1.66.972 3.328 2.833 3.328 3.448 0 3.005-5.531 2.196-8.814 1.106-.466 2.767-.692 3.977-.744 1.426-.06 2.594-.858 2.594-2.506zm-20 .064h-2v-8h2v8zm15.755-1.302l1.394.167c1.075.129 1.105 1.525.051 1.584-2.749.154-5.06 1.013-6.12 1.556.43 1.748.92 3.463.92 5.534 0 2.505-.781 3.666-1.679.574-1.993-6.859-5.057-8.364-8.321-9.113v-6c2.521-.072 4.72-1.041 6.959-2.005 1.731-.745 4.849-1.495 6.416-.614 1.295.836 1.114 1.734.292 1.661l-.771-.032c-.815-.094-.92 1.068-.109 1.141 0 0 1.321.062 1.745.115.976.123 1.028 1.607-.04 1.551-.457-.024-1.143-.041-1.143-.041-.797-.031-.875 1.078-.141 1.172 0 0 .714.005 1.761.099s1.078 1.609-.004 1.563c-.868-.037-1.069-.027-1.069-.027-.75.005-.875 1.028-.141 1.115z';

export const dislikeSolid = 'M19.396 3.292c-.811.062-.734.812.031.953 1.268.234 1.826.914 1.826 1.543 0 .529-.396 1.022-1.098 1.181-.837.189-.664.757.031.812 1.133.09 1.688.764 1.688 1.41 0 .565-.424 1.108-1.26 1.22-.857.115-.578.734.031.922.521.16 1.354.5 1.354 1.51 0 .672-.5 1.562-2.271 1.49-1.228-.05-3.666.198-4.979.885.907 3.657.689 8.782-1.687 8.782-1.594 0-1.896-1.807-2.375-3.469-1.718-5.969-5.156-7.062-8.687-7.603v-9.928c6.688 0 8.5-3 13.505-3 3.198 0 4.852 1.735 4.852 2.666-.001.334-.273.572-.961.626z';

export const clapSolid = "M29.58 17.1l-3.85-6.78c-.37-.54-.88-.9-1.44-.99a1.5 1.5 0 0 0-1.16.28c-.42.33-.65.74-.7 1.2v.01l3.63 6.37c2.46 4.5 1.67 8.8-2.33 12.8-.27.27-.54.5-.81.73a7.55 7.55 0 0 0 4.45-2.26c4.16-4.17 3.87-8.6 2.21-11.36zm-4.83.82l-3.58-6.3c-.3-.44-.73-.74-1.19-.81a1.1 1.1 0 0 0-.89.2c-.64.51-.75 1.2-.33 2.1l1.83 3.86a.6.6 0 0 1-.2.75.6.6 0 0 1-.77-.07l-9.44-9.44c-.51-.5-1.4-.5-1.9 0a1.33 1.33 0 0 0-.4.95c0 .36.14.7.4.95l5.6 5.61a.6.6 0 1 1-.84.85l-5.6-5.6-.01-.01-1.58-1.59a1.35 1.35 0 0 0-1.9 0 1.35 1.35 0 0 0 0 1.9l1.58 1.59 5.6 5.6a.6.6 0 0 1-.84.86L4.68 13.7c-.51-.51-1.4-.51-1.9 0a1.33 1.33 0 0 0-.4.95c0 .36.14.7.4.95l2.36 2.36 3.52 3.52a.6.6 0 0 1-.84.85l-3.53-3.52a1.34 1.34 0 0 0-.95-.4 1.34 1.34 0 0 0-.95 2.3l6.78 6.78c3.72 3.71 9.33 5.6 13.5 1.43 3.52-3.52 4.2-7.13 2.08-11.01zM11.82 7.72c.06-.32.21-.63.46-.89a1.74 1.74 0 0 1 2.4 0l3.23 3.24a2.87 2.87 0 0 0-.76 2.99l-5.33-5.33zM13.29.48l-1.92.88 2.37 2.84zM21.72 1.36L19.79.5l-.44 3.7zM16.5 3.3L15.48 0h2.04z"


export const clapLight = 'M28.86 17.34l-3.64-6.4c-.3-.43-.71-.73-1.16-.8a1.12 1.12 0 0 0-.9.21c-.62.5-.73 1.18-.32 2.06l1.22 2.6 1.4 2.45c2.23 4.09 1.51 8-2.15 11.66a9.6 9.6 0 0 1-.8.71 6.53 6.53 0 0 0 4.3-2.1c3.82-3.82 3.57-7.87 2.05-10.39zm-6.25 11.08c3.35-3.35 4-6.78 1.98-10.47L21.2 12c-.3-.43-.71-.72-1.16-.8a1.12 1.12 0 0 0-.9.22c-.62.49-.74 1.18-.32 2.06l1.72 3.63a.5.5 0 0 1-.81.57l-8.91-8.9a1.33 1.33 0 0 0-1.89 1.88l5.3 5.3a.5.5 0 0 1-.71.7l-5.3-5.3-1.49-1.49c-.5-.5-1.38-.5-1.88 0a1.34 1.34 0 0 0 0 1.89l1.49 1.5 5.3 5.28a.5.5 0 0 1-.36.86.5.5 0 0 1-.36-.15l-5.29-5.29a1.34 1.34 0 0 0-1.88 0 1.34 1.34 0 0 0 0 1.89l2.23 2.23L9.3 21.4a.5.5 0 0 1-.36.85.5.5 0 0 1-.35-.14l-3.32-3.33a1.33 1.33 0 0 0-1.89 0 1.32 1.32 0 0 0-.39.95c0 .35.14.69.4.94l6.39 6.4c3.53 3.53 8.86 5.3 12.82 1.35zM12.73 9.26l5.68 5.68-.49-1.04c-.52-1.1-.43-2.13.22-2.89l-3.3-3.3a1.34 1.34 0 0 0-1.88 0 1.33 1.33 0 0 0-.4.94c0 .22.07.42.17.61zm14.79 19.18a7.46 7.46 0 0 1-6.41 2.31 7.92 7.92 0 0 1-3.67.9c-3.05 0-6.12-1.63-8.36-3.88l-6.4-6.4A2.31 2.31 0 0 1 2 19.72a2.33 2.33 0 0 1 1.92-2.3l-.87-.87a2.34 2.34 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.64l-.14-.14a2.34 2.34 0 0 1 0-3.3 2.39 2.39 0 0 1 3.3 0l.14.14a2.33 2.33 0 0 1 3.95-1.24l.09.09c.09-.42.29-.83.62-1.16a2.34 2.34 0 0 1 3.3 0l3.38 3.39a2.17 2.17 0 0 1 1.27-.17c.54.08 1.03.35 1.45.76.1-.55.41-1.03.9-1.42a2.12 2.12 0 0 1 1.67-.4 2.8 2.8 0 0 1 1.85 1.25l3.65 6.43c1.7 2.83 2.03 7.37-2.2 11.6zM13.22.48l-1.92.89 2.37 2.83-.45-3.72zm8.48.88L19.78.5l-.44 3.7 2.36-2.84zM16.5 3.3L15.48 0h2.04L16.5 3.3z';
