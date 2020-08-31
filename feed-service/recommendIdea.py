import sys, getopt, time
import pandas as pd
import sklearn
import numpy as np
import nltk
import re
import time
import codecs
import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from nltk.corpus import stopwords

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)
def clean_text(text):
    stop_words = ['\x0c', '\n']
    for i in stop_words:
        text.replace(i, ' ')
    clean_text = re.sub('[^a-zA-Z]+', ' ', text)
    return clean_text.lower()
def tokenize_and_stem(text):
    tokens = nltk.word_tokenize(text)
    stemmer = nltk.stem.porter.PorterStemmer()
    return [i for i in [stemmer.stem(t) for t in tokens] if len(i) > 2]
def find_nearest_papers(row, kNNmodel, tfidf_weights, tfidf_features, papers):
    keywords = get_top_features(row, tfidf_weights, tfidf_features)
    dist,idx = kNNmodel.kneighbors(tfidf_weights[row,:])
    idx = list(idx[0])
    # npa = np.asarray(someListOfLists, dtype=np.float32)
    json_dump = json.dumps(papers.loc[idx].to_numpy(), cls=NumpyEncoder)
    return json_dump
def get_top_features(rownum, weights, features, top_k=10):
    weight_vec = weights.toarray()[rownum,:]
    top_idx = np.argsort(weight_vec)[::-1][:top_k]
    return [features[i] for i in top_idx]

def main(id):
   idea = pd.read_csv('./test-data.csv')
   idea['idea_description'] = idea['idea_description'].apply(clean_text)
   nltk.download('punkt')
   tfidf_vectorizer = TfidfVectorizer(max_df=0.5, min_df=0, max_features=200000,stop_words='english', use_idf=True, tokenizer=tokenize_and_stem)
   tfidf_weights = tfidf_vectorizer.fit_transform(idea['idea_description'])
   tfidf_features = tfidf_vectorizer.get_feature_names()
   nn_description = NearestNeighbors(n_neighbors=6, algorithm='auto')
   nn_fitted_description = nn_description.fit(tfidf_weights)
   filename = 'finalized_model.sav'
   # joblib.dump(nn_fitted_description, filename)
   # loaded_model = joblib.load(filename)
   select_indices = list(np.where(idea['_id'] == id[0])[0])
   nearest_data = find_nearest_papers(np.array(select_indices).item(), nn_fitted_description, tfidf_weights, tfidf_features, idea)
   # for i in nearest_data['idea']['idea_description']: print ("idea_description: "+i+"\n")
   print(nearest_data)
   return nearest_data

if __name__ == "__main__":
    main(sys.argv[1:])
