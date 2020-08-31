export const getFeedAction = (data) => {
    return {
        type: 'USER_PREFERENCE_FEED',
        data: data
    }
};
export const postCommentAction = (data) => {
    return {
        type: 'USER_COMMENT_IDEA',
        data: data
    }
};

export const getRecommendationAction = (data) => {
  return {
    type : 'USER_RECOMMENDATION',
    data : data
  }
}
export const getFilteredFeedAction = (data) => {
  return {
    type : 'USER_FILTERED_FEED',
    data : data
  }
}

export const myPosts = (data) => {
  return {
    type : 'MY_POSTS',
    data : data
  }
}

export const myAdminQuestions = (data) => {
  return {
    type : 'MY_ADMIN_POSTS',
    data : data
  }
}


export const getFavoriteIdea = (data) => {
  return {
    type : 'USER_FAVORITE_IDEA',
    data : data
  }
}

export const getUnfavoriteIdea = (data) => {
  return {
    type : 'USER_UNFAVORITE_IDEA',
    data : data
  }
}

export const getPopularPostAction = (data) => {
  return {
    type : 'POPULAR_POST',
    data : data
  }
}

export const similarSentenceAlert = () => {
    return {
        type: 'SIMILAR_SENTENCE',
        data: true
    }
};
export const closeSnackBarAction = () => {
    return {
        type: 'SIMILAR_SENTENCE_OFF',
        data: false
    }
};
export const postLikeAction = (data) => {
  return {
    type : 'POST_LIKE_ACTION',
    data : data
  }
}
export const getSelectedIdea = (data) => {
  return {
    type : 'GET_SELECTED_POST_ACTION',
    data : data
  }
}
export const getSelectedFeedAction = (data) => {
  return {
    type : 'GET_SELECTED_IDEA_ACTION',
    data : data
  }
}
export const postDislikeAction = (data) => {
  return {
    type : 'POST_DISLIKE_ACTION',
    data : data
  }
}
export const getFavoratedIDAction = (data) => {
  return {
    type : 'GET_FAVORITE_IDEA_ACTION',
    data : data
  }
}
export const dismissPostAction = (data) => {
  return {
    type : 'DISMISS_POST',
    data : data
  }
}

export const muteAuthorAction = (data) => {
  return {
    type : 'MUTE_AUTHOR',
    data : data
  }
}
