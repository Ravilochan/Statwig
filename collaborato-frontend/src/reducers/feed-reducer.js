import * as UTIL from './../util/utils';

const initialState = {
        feedDetails : [],
        filteredfeedDetails : [],
        popularPost : [],
        favoriteIdea : [],
        filteredFavoriteIdea : [],
        recommendation : [],
        loading : true,
        similarSentence : false,
        myposts : [],
        myAdminDetails : [],
        selectedIdea : {},
        likeUpdate : false,
        dislikeUpdate : false
};

export default function (state = initialState, action) {
    switch (action.type) {
            case 'USER_PREFERENCE_FEED':
              console.log("User feed fetched as per preference : ",action.data);
              return Object.assign({}, state, {
              feedDetails: action.data.data,
              filteredfeedDetails : action.data.data,
              similarSentence:false
            })
            case 'USER_FILTERED_FEED':
              console.log("User feed fetched as per preference : ",action.data);
              return Object.assign({}, state, {
              filteredfeedDetails : action.data,
              similarSentence:false
            })
            case 'MY_POSTS':
            console.log("My Posts fetched : ",action.data);
              return Object.assign({}, state, {
              myposts : action.data,
            })
            break;
            case 'MY_ADMIN_POSTS':
            console.log("My Admin Posts fetched : ",action.data.posts);
              return Object.assign({}, state, {
              myAdminDetails : action.data.posts,
            })
            break;
            case 'USER_COMMENT_IDEA':
              console.log("User commented successfully on idea : ",action.data.data[0]);
              return Object.assign({}, state, {
                selectedIdea : action.data.data[0]
              })
              break;
            case 'USER_RECOMMENDATION' :
            console.log("Recommendations to user in reducer : ", action.data);
            return Object.assign({}, state, {
              recommendation : action.data.data,
              loading : false,
            })
            case 'USER_FAVORITE_IDEA' :
            console.log("Favorite idea: ", action.data);
            let idAlreadyExists = state.favoriteIdea.indexOf(action.data._id) > -1;
            console.log("idAlreadyExists :" +idAlreadyExists);
            let chosenIds = state.favoriteIdea.slice();
            if(idAlreadyExists) {
                chosenIds = chosenIds.filter(item => item._id != action.data._id);
            }
            else {
                chosenIds.push(action.data);
            }
            console.log("chosenIds : " +chosenIds);
            return Object.assign({}, state, {
              favoriteIdea : chosenIds,
              filteredFavoriteIdea : state.favoriteIdea
            })

            case 'POST_LIKE_ACTION' :
            console.log("POST_LIKE_ACTION : " +action.data);
            if(action.data == 'Successfully voted the idea') {
              let chosenIds = state.selectedIdea;
              chosenIds.likes.push(localStorage.getItem('useremail'));
              console.log("chosenIds : " ,chosenIds.likes);
              return Object.assign({}, state, {
                selectedIdea : chosenIds,
                likeUpdate : true
              })
            }
          else if(action.data == 'User already disliked this post, removing all votes') {
            var objArray = Object.assign({}, state.selectedIdea);
            if(objArray.dislikes.includes(localStorage.getItem('useremail'))) {
              console.log("objArray IN LIKE : " ,objArray.dislikes);
              const index = objArray.dislikes.indexOf(localStorage.getItem('useremail'));
              console.log("INDEX IN LIKE : " ,index);
              if (index > -1) {
                objArray.dislikes.splice(index, 1);
              }
            }
            return {
                  ...state,
                  likeUpdate : false,
                  dislikeUpdate : false,
                  selectedIdea: objArray
            }
          }
            break;

            case 'POST_DISLIKE_ACTION' :
            console.log("POST_DISLIKE_ACTION : " +action.data);
            if(action.data == 'Successfully voted the idea') {
              let chosenIds = state.selectedIdea;
              chosenIds.dislikes.push(localStorage.getItem('useremail'));
              console.log("chosenIds : " ,chosenIds.dislikes);
              return Object.assign({}, state, {
                selectedIdea : chosenIds,
                dislikeUpdate : true
              })
            }
            else if(action.data == 'User already liked this post, removing all votes') {
              var objArray = Object.assign({}, state.selectedIdea);
              if(objArray.likes.includes(localStorage.getItem('useremail'))) {
                console.log("objArray IN DISLIKE : " ,objArray.likes);
                const index = objArray.likes.indexOf(localStorage.getItem('useremail'));
                console.log("INDEX IN DISLIKE : " ,index);
                if (index > -1) {
                  objArray.likes.splice(index, 1);
                }
              }
              return {
                    ...state,
                    likeUpdate : false,
                    dislikeUpdate : false,
                    selectedIdea: objArray
              }
            }
            break;
            case 'USER_UNFAVORITE_IDEA' :
            console.log("UnFavorite idea: ", action.data);
            return {
                  ...state,
                  favoriteIdea: state.favoriteIdea.filter(item => item._id !== action.data._id)
            }

            case 'DISMISS_POST' :
            console.log("dismiss story :" , action.data);
            return {
              ...state,
              filteredfeedDetails: state.filteredfeedDetails.filter(item => item._id !== action.data)
            }
            break;

            case 'MUTE_AUTHOR' :
            console.log("dismiss story :" , action.data);
            return {
              ...state,
              filteredfeedDetails: state.filteredfeedDetails.filter(item => item.idea_owner !== action.data)
            }
            break;

            case 'POPULAR_POST' :
            console.log("Popular Post in reducer : " ,action.data);
            return Object.assign({}, state, {
              popularPost : action.data
            })
            case 'GET_SELECTED_POST_ACTION' :
            console.log("SELCTED IDEA : " , action.data);
            return Object.assign({}, state, {
              selectedIdea : action.data
            })
            case 'GET_SELECTED_IDEA_ACTION' :
            console.log("SELCTED IDEA : " , action.data);
            return {
                  ...state,
                  selectedIdea: state.selectedIdea
            }
            case 'GET_FAVORITE_IDEA_ACTION' :
              console.log("FETCHED FAVORATED IDEA : " , action.data);
              return {
                    ...state,
                    favoriteIdea : action.data,
              }
              break;
            case 'SIMILAR_SENTENCE':
            console.log("Found Similar Sentence : ",action.data);
            return Object.assign({}, state, {
            similarSentence: action.data,
          })
          case 'SIMILAR_SENTENCE_OFF':
          console.log("User commented successfully on idea : ",action.data);
          return Object.assign({}, state, {
          similarSentence: action.data,
        })
          default:
    return state;
  }
}
