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

def get_top_features(rownum, weights, features, top_k=10):
    weight_vec = weights.toarray()[rownum,:]
    top_idx = np.argsort(weight_vec)[::-1][:top_k]
    return [features[i] for i in top_idx]

def main(id):
   idea = pd.read_csv('./test-data.csv')
   idea['idea_description'] = idea['idea_description'].apply(clean_text)
   nltk.download('punkt')
   print('Model started training')
   tfidf_vectorizer = TfidfVectorizer(max_df=0.5, min_df=0, max_features=200000,stop_words='english', use_idf=True, tokenizer=tokenize_and_stem)
   tfidf_weights = tfidf_vectorizer.fit_transform(idea['idea_description'])
   nn_description = NearestNeighbors(n_neighbors=6, algorithm='auto')
   nn_fitted_description = nn_description.fit(tfidf_weights)
   # serialize to JSON
   filename = 'finalized_model_json'
   json_file = nn_fitted_description.to_json()
   with open(filename, "w") as file:
       file.write(json_file)
   nn_fitted_description.save_weights(h5_file)

   # joblib.dump(nn_fitted_description, filename)
if __name__ == "__main__":
    main(sys.argv[1:])
