import {BASE_URL_FEED,BASE_URL_PYTHON,BASE_URL_CART,BASE_URL_FAV,ID_USER} from './../components/constants/constants.js';
import {history} from "../util/utils";
import {getFeedAction, getRecommendationAction, getFilteredFeedAction, getFavoriteIdea, getPopularPostAction, getUnfavoriteIdea,closeSnackBarAction,similarSentenceAlert, postLikeAction,getSelectedIdea, getSelectedFeedAction,postDislikeAction,getFavoratedIDAction,myPosts,dismissPostAction,muteAuthorAction,setFavoritedFlag,postCommentAction,myAdminQuestions} from './../actions/index';
import * as UTIL from './../util/utils';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const headers = {
    'Accept': 'application/json'
};
export const getFeed = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/recommendations/home/?ID=` + data;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("recommendations received from backend",res.status);
             return res.json();
          }else {
             throw "Recommendations could not be received from backend"
          }
        }).then(result=>{
            dispatch(getFeedAction(result));
        }).catch(err => {
            console.log("Error while fetching feeds for user!!!");
            return err;
        });
    };
};

export const getFilteredFeed = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/feeds/getfilteredfeed/?ID=` + data;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("filtered feed received from backend",res.status);
             return res.json();
          }else {
             throw "Recommendations could not be received from backend"
          }
        }).then(result=>{
            dispatch(getFilteredFeedAction(result));
        }).catch(err => {
            console.log("Error while fetching filtered feeds for user!!!");
            return err;
        });
    };
};

export const fetchSelectedIdea = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/feeds/getSelectedPost/?ID=` + data;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("selected feed received from backend",res.status);
             return res.json();
          }else {
             throw "selected post could not be received from backend"
          }
        }).then(result=>{
            dispatch(getSelectedFeedAction(result));
        }).catch(err => {
            console.log("Error while fetching selected feeds for user!!!");
            return err;
        });
    };
};


export const getPopularPost = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/feeds/getPopularFeed`;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("popular posts received from backend status",res.status);
             return res.json();
          }else {
             throw "Popular Posts could not be received from backend"
          }
        }).then(result=>{
            dispatch(getPopularPostAction(result));
        }).catch(err => {
            console.log("Error while fetching popular posts for user!!!");
            return err;
        });
    };
};



export const ideaComment = function(data) {
  console.log("ideaComment : " +data.comment.value + " " + data.comment.user + " " + data.comment.comment_time);
  return (dispatch) => {
    fetch(`${BASE_URL_FEED}/feeds/postcomment`, {
          method: 'PUT',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("comment posted",res.status);
             return res.json();
          }else {
             throw "Comment could not be posted"
          }
        }).then(result=>{
              // history.push('/feed')
              // window.location.reload(true);
            dispatch(postCommentAction(result));
            // dispatch(getSelectedIdea(data));
        }).catch(err => {
            console.log("Error while posting commment on idea!!!");
            return err;
        });
    };
};

export const ideaVote = function(data) {
  console.log("In API.js" +data.likes)
  return (dispatch) => {
    fetch(`${BASE_URL_FEED}/feeds/postlikes`, {
          method: 'PUT',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Vote posted",res.status);
             NotificationManager.success( 'User successfully liked the post');
             return res.json();
          }else if(res.status === 404) {
              NotificationManager.info( 'User already liked this post.!!!');
              return res.json();
          }else if(res.status === 403) {
              NotificationManager.error( 'User earlier disliked this post, removing all votes');
              return res.json();
          }else {
             throw "Idea could not be voted"
          }
        }).then(result=>{
              // history.push('/detail')
              // window.location.reload(false);
            dispatch(postLikeAction(result));
        }).catch(err => {
            console.log("Error while voting on idea!!!");
            return err;
        });
    };
};

export const ideaDownVote = function(data) {
  return (dispatch) => {
    fetch(`${BASE_URL_FEED}/feeds/postdislikes`, {
          method: 'PUT',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Downvote posted",res.status);
             NotificationManager.success( 'User successfully disliked the post');
             return res.json();
          }else if(res.status === 404) {
              NotificationManager.info( 'User already disliked on this post');
              return res.json();
          }else if(res.status === 403) {
              NotificationManager.info( 'User earlier liked this post, removing all votes');
              return res.json();
          }else {
             throw "Idea could not be downvoted"
          }
        }).then(result=>{
              // history.push('/detail')
              // window.location.reload(false);
            dispatch(postDislikeAction(result));
        }).catch(err => {
            console.log("Error while downvoting on idea!!!");
            return err;
        });
    };
};

export const ideaRecommendation = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/recommendations/recommendation/?ID=` + data;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("data status at frontend :",res.status);
             return res.json();
          }
        }).then(result=>{
            dispatch(getRecommendationAction(result));
        }).catch(err => {
            console.log("Error while fetching recommendation on idea!!!");
            return err;
        });
    };
};

export function reportAbuseIdea(data) {
  console.log("report abuse data : "+data);
  return fetch(`${BASE_URL_FEED}/feeds/reportabuse`, {
    method: "PUT",
    credentials:'include',
    headers: { ...headers,'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data),
  }).then(response => {
    if(response.status == 200) {
      NotificationManager.info( 'Report abuse on post');
      return response.json();
    }
    else {
      NotificationManager.warning( 'User already reported abuse on the same post');
    }
  })
  .catch(err => {
      console.log("Error while reporting abuse a posted idea!!!");
      return err;
  });
}

export const dismissIdea = function(data) {
  return (dispatch) => {
    dispatch(dismissPostAction(data));
    NotificationManager.success( 'Post dismissed successfully.. User wont be able to view this post');
    };
}

export const muteAuthor = function(data) {
  return (dispatch) => {
    dispatch(muteAuthorAction(data));
    NotificationManager.success( 'All the idea posted by this author is dismissed successfully.!!!');
    };
}


export const ideaFavorite = function(data) {
  return (dispatch) => {
    dispatch(getFavoriteIdea(data));
    };
};

export const ideaUnfavorite = function(data) {
  return (dispatch) => {
    dispatch(getUnfavoriteIdea(data));
    };
};

export const ideaSelect = function(data) {
  return (dispatch) => {
    history.push('/detail')
    dispatch(getSelectedIdea(data));
    };
}
export const postIdea = function(data) {
  console.log("Posting Idea")
  console.log(JSON.stringify(data))
  return (dispatch) => {
    fetch(`${BASE_URL_PYTHON}/ideas/postidea`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Idea posted",res.status);
             return res.json();
          }
          else if(res.status == 403){
            dispatch(similarSentenceAlert())
            throw "Idea could not be posted"
          }
          else {
             throw "Idea could not be posted"
          }
        }).then(result=>{
              history.push('/feed')
              window.location.reload(false);
            // dispatch(postCommentAction(result));
        }).catch(err => {
            console.log("Error while posting an idea!!!");
            dispatch(similarSentenceAlert())
            return err;
        });
    };
};

export const getMyPosts = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FEED}/feeds/idea/?ID=` + data;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("filtered feed received from backend",res.status);
             return res.json();
          }else {
             throw "Recommendations could not be received from backend"
          }
        }).then(result=>{
            dispatch(myPosts(result));
        }).catch(err => {
            console.log("Error while fetching filtered feeds for user!!!");
            return err;
        });
    };
};

export const getAdminQuestions = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_PYTHON}/ideas/postidea` ;
    fetch(url, {
          method: 'GET',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
        }).then(res => {
           if(res.status === 200){
             console.log("filtered feed received from backend",res.status);
             return res.json();
          }else {
             throw "Recommendations could not be received from backend"
          }
        }).then(result=>{
            dispatch(myAdminQuestions(result));
        }).catch(err => {
            console.log("Error while fetching filtered feeds for user!!!");
            return err;
        });
    };
};



export const closeSnackBar = function(){
  return (dispatch) => {
    dispatch(closeSnackBarAction())
  }
}

export function addProducts(cart) {
  console.log("CART : "+cart);
  return fetch(`${BASE_URL_CART}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());
}

export function getProducts() {
  return axios
    .get(`${BASE_URL_CART}/api/cart/${ID_USER}`)
    .then((response) => response.data);
}
export function clearFromCart(ID_USER) {
  return axios
    .get(`${BASE_URL_CART}/api/clearcart/${ID_USER}`)
    .then((response) => response.data);
}

export function removeCartProduct(cart) {
  return fetch(`${BASE_URL_CART}/api/uncart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());
}

export function pay(data) {
  return fetch("http://localhost:7001/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.data);
}

export function removeIdeaFromFeed(data) {
  return fetch(`${BASE_URL_FEED}/feeds/editidea`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function getFavorites() {
  const id = '5eca3c89cafd7f1fdf4b7216';
  const name = localStorage.getItem('useremail')
  let url = `${BASE_URL_FAV}/api/favorites?id=` + id + `&name=` +name;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function removeFavorite(data) {
  return fetch(`${BASE_URL_FAV}/api/unfav`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(response => {
    NotificationManager.info( 'Idea Successfully Unfavorited');
    response.json();
  })
}


export function addFavorite(data) {
  return fetch(`${BASE_URL_FAV}/api/fav`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then( response => {
    NotificationManager.info( 'Idea Successfully Favorited');
    response.json();
  })
}


export const getUserFavorites = function(data) {
  return (dispatch) => {
    let url = `${BASE_URL_FAV}/api/favorites/${localStorage.getItem('useremail')}`;
    fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
           if(res.status === 200){
             console.log("favorite received from backend",res.status);
             return res.json();
          }else {
             throw "Favorites could not be received from backend"
          }
        }).then(result=>{
            dispatch(getFavoratedIDAction(result));
            // dispatch(setFavoritedFlag(data));
        }).catch(err => {
            console.log("Error while fetching filtered feeds for user!!!");
            return err;
        });
    };
};


export const getFavoritesList = function(result) {
  console.log("getFavoritesList API: " +result)
  return (dispatch) => {
    dispatch(getFavoratedIDAction(result))
  }
};
export const markAsSold = function(data) {
  data = {
    "_id" : data
  }
  console.log("Marked as sold API",JSON.stringify(data))
  return fetch(`${BASE_URL_FEED}/feeds/markNegotiated`, {
          method: 'PUT',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Idea marked as sold",res.status);
             //history.push('/dashboard')
             return res.json();
          }else {
             throw "Idea could not be sold"
          }
        })
        .then(result=>{
              history.push('/dashboard')
              window.location.reload(true);
        }).catch(err => {
            console.log("Idea could not be sold!!!");
            return err;
        });

};

export const ideaNotDuplicate = function(data) {
  console.log("Marked as not duplicate",JSON.stringify(data))
  return fetch(`${BASE_URL_FEED}/ideas/postidea`, {
          method: 'POST',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Idea marked as not duplicate",res.status);
             deleteIdea(data)
             return res.json();
          }else {
             throw "Idea could not be sold"
          }
        })
        .then(result=>{
              history.push('/admin')
              window.location.reload(true);
        }).catch(err => {
            console.log("Idea could not be sold!!!");
            return err;
        });

};

export const deleteIdea = function(data) {

  console.log("Delete id",data.id)
  return fetch(`${BASE_URL_PYTHON}/ideas/postidea?id=`+data.id, {
          method: 'DELETE',
          credentials:'include',
          headers: { ...headers,'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(res => {
           if(res.status === 200){
             console.log("Idea deleted",res.status);
             return res.json();
          }else {
             throw "Idea could not be deleted"
          }
        })
        .then(result=>{
              history.push('/admin')
              window.location.reload(true);
        }).catch(err => {
            console.log("Idea could not be deleted!!!");
            return err;
        });

};

